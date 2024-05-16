import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { ReservationDto } from "../dtos/reservation/reservation.dto";
import { ReservationQueryOptionsDto } from "../dtos/reservation/reservationOptions.dto";
import * as uuid from "uuid";
import { ReservationsRepository } from "../repositories/reservations.repository";
// import { UsersServices } from "./users.services";
// import reservationsRouter from "../../shared/infra/routes/reservations.routes";
// import { ReservationStatus } from "../enums/reservationStatus.enum";
import { UsersServices } from "./users.services";
import { UserDto } from "../dtos/user.dto";
// import { date } from "yup";
import { UserType } from "../enums/userType.enum";

export class ReservationsServices {
  public static async getAll(options: ReservationQueryOptionsDto): Promise<ReservationDto[]> {
    const reservations: ReservationDto[] = await ReservationsRepository.getAll(options);

    if (reservations.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return reservations;
  }

  public static async getById(id: string): Promise<ReservationDto> {
    const reservation = await ReservationsRepository.getById(id);

    if (!reservation) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return reservation;
  }

  public static async create(reservation: ReservationDto): Promise<string> {
    //TO DO
    //verificar id do facility
    //verificar id dos usuários se estes estão ativos
    //verificar datas
    //adicionar verificação de regras de negócio
    reservation.reservationId = uuid.v4();
    await ReservationsRepository.create(reservation);
    return reservation.reservationId;
  }

  public static async update(reservationUpdated: ReservationDto): Promise<void> {

    const reservation = await this.getById(reservationUpdated.reservationId!);
    //TO DO
    //adicionar verificação de regras de negócio
    reservation.update(reservationUpdated);

    await ReservationsRepository.update(reservation);
  }


  private static sendEmail(responsibleUser: UserDto, admUser: UserDto) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "pucespacos.noreply@gmail.com",
        pass: "hztxqqgwilnulzlx",
      },
    });

    var message = {
      from: 'Puc Espaços <suport@pucespacos.no-reply.br>',
      to: responsibleUser.email,
      subject: 'Cancelamento de Reserva no Sistema PUC Espaços',
      text: `Prezado(a),\n\n Espero que esteja bem. Gostaríamos de informar que a sua reserva de espaço no Sistema PUC Espaços foi cancelada. Compreendemos que isso pode ser inconveniente e estamos aqui para auxiliá-lo(a) em qualquer dúvida ou problema que possa surgir.\n\nEntendemos que podem haver diversos motivos para o cancelamento de uma reserva, incluindo:\n\n Conflitos de agenda: Algum evento da instituição pode ter sido programado para o mesmo horário e local, resultando na necessidade de cancelamento da sua reserva.\n\nManutenção ou problemas técnicos: Em alguns casos, pode ser necessário cancelar reservas devido a manutenção ou problemas técnicos no espaço reservado.\n\nPedimos desculpas por qualquer inconveniente causado por este cancelamento.\n\nAtenciosamente,\n` + admUser.userName + `\n` + admUser.email + `\nSuporte do Sistema PUC Espaços`,

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

  public static async delete(id: string, userId: string): Promise<void> {

    const reservation = await this.getById(id);
    const dateNow = new Date(); // Data e hora
    // const dateNow = new Date().getTime(); // Timestamp
    const responsibleUser = await UsersServices.getById(reservation.responsibleUserId);
    const admUser = await UsersServices.getById(userId);

    // Verifica se o usuario esta ativo
    if (admUser.isActive == false) {
      throw new ApiError(404, InternalCode.USER_DISABLED);
    }


    if (reservation.checkinDate >= dateNow && (admUser.userType == UserType.ADMINISTRATOR || admUser.userType == UserType.SECRETARY || admUser.userId == reservation.responsibleUserId)) {

      await ReservationsRepository.delete(id);

      if (userId != responsibleUser.userId) {
        this.sendEmail(responsibleUser, admUser)
      }

    }
    else {
      throw new ApiError(404, InternalCode.INVALID_PERMISION);
    }

  }

  //TO DO
  //criar métodos privados de verificação de reserva
}