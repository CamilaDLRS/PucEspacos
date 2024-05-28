import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { UserDto } from "../dtos/user.dto";
import { UsersRepository } from "../repositories/users.repository";
import { Utils } from '../../shared/utils/utils';
import *  as uuid from 'uuid';
import { UserType } from "../enums/userType.enum";
import { ReservationsServices } from "./reservations.services";
import { ReservationQueryOptionsDto } from "../dtos/reservation/reservationOptions.dto";

export class UsersServices {

  public static async getAll(): Promise<UserDto[]> {
    const users: UserDto[] = await UsersRepository.getAll();

    if (users.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    for await (const user of users) {
      user.schoolName = await UsersRepository.getUserSchoolName(user);      
    }
    
    return users;
  }

  public static async getById(id: string): Promise<UserDto> {
    const user = await UsersRepository.getById(id);

    if (!user) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return user;
  }

  public static async getByEmail(email: string): Promise<UserDto> {
    const user = await UsersRepository.getByEmail(email!);

    if (!user) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return user;
  }

  public static async signIn(email: string, password: string): Promise<UserDto> {
    const user = await UsersRepository.signIn(email, password);

    if (!user) {
      throw new ApiError(401, InternalCode.INVALID_LOGIN_CREDENTIALS);
    }
    if (!user.isActive) {
      throw new ApiError(401, InternalCode.INVALID_LOGIN_NOT_ACTIVE);
    }

    return user;
  }

  public static async create(user: UserDto): Promise<string> {
    
    const emailExists = await this.getByEmail(user.email!)
      .then(() => true)
      .catch(() => false);
    if (emailExists) {
      throw new ApiError(409, InternalCode.EMAIL_ALREADY_EXISTS_AUTH);
    }

    user.userId = uuid.v4();
    user.isActive = true;

    if (Utils.validateEmailDomain(user.email!, ["pucpr.edu.br"])) {
      user.userType = UserType.STUDENT;
    }
    else if (Utils.validateEmailDomain(user.email!, ["pucpr.br"])) {
      user.userType = UserType.TEACHER;
    }
    else {
      throw new ApiError(400, InternalCode.INVALID_EMAIL_DOMAIN);
    }
    await UsersRepository.create(user);

    return user.userId;
  }

  public static async update(userEdited: UserDto, requestingUserId: string): Promise<void> {
    
    const user = await this.getById(userEdited.userId!);
    user.update(userEdited);

    if (String(userEdited.isActive) === '0') {

      const optons: ReservationQueryOptionsDto = {
        responsibleUserId: userEdited.userId,
        checkinDate: new Date().getTime()
      }
      const userReservations = await ReservationsServices.getAll(optons)
      .then((reservations) => reservations)
      .catch(() => []);

      for await (const reservation of userReservations) {
        await ReservationsServices.delete(reservation.reservationId, requestingUserId, true);
      }
      const admUser = await this.getById(requestingUserId);
      this.sendDeactivationEmail(user, admUser);
    }

    await UsersRepository.update(user);
  }

  private static sendDeactivationEmail(userDeactivated: UserDto, admUser: UserDto) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "pucespacos.noreply@gmail.com",
            pass: "hztxqqgwilnulzlx",
        },
    });

    const message = {
        from: 'Puc Espaços <suport@pucespacos.no-reply.br>',
        to: userDeactivated.email,
        subject: 'Desativação de perfil no Sistema PUC Espaços',
        text: `Prezado(a),\n\n Informamos que, conforme decisão do usuário ${admUser.userName}, seu acesso ao sistema Pucpr Espaços foi desativado.\n\nAlém disso, todas as suas reservas de espaços que não foram concluídas ou iniciadas foram excluídas do sistema.\n\n Se você tiver alguma dúvida ou precisar de mais informações, por favor, entre em contato com o suporte do Pucpr Espaços.\n\nAtenciosamente,\n${admUser.userName}\n${admUser.email}\nSuporte do Sistema PUC Espaços`,
    };

    const sendEmail = async () => {
      try {
        await transporter.sendMail(message);
      }
      catch (e: any) {
        throw new ApiError(404, InternalCode.INTERNAL_ERROR);
      }
    };
    sendEmail();
  }
}