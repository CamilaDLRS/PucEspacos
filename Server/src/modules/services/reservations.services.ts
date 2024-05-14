import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { ReservationDto } from "../dtos/reservation/reservation.dto";
import { ReservationQueryOptionsDto } from "../dtos/reservation/reservationOptions.dto";
import * as uuid from "uuid";
import { ReservationsRepository } from "../repositories/reservations.repository";
// import { UsersServices } from "./users.services";
// import reservationsRouter from "../../shared/infra/routes/reservations.routes";
import { ReservationStatus } from "../enums/reservationStatus.enum";
import { UsersServices } from "./users.services";

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

  public static async delete(id: string): Promise<void> {
    const reservation = await this.getById(id);
    console.log(reservation);
    //TO DO
    //adicionar verificação de regras de negócio
    await ReservationsRepository.delete(id);
  }

  public static async deleteNotStarted(id: string): Promise<void> {

    const reservation = await this.getById(id);
    console.log(reservation);

    if (reservation.reservationStatus == ReservationStatus.ACTIVE) {
      await ReservationsRepository.delete(id);
      // console.log("ajksdflkajsdlkfjlaksdjdflkasjldfkj");
      const responsibleUser = await UsersServices.getById(reservation.responsibleUserId);
      const nodemailer = require('nodemailer');
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'leosilva1698@gmail.com',
          pass: 'hxqbcdfcnmdzyjmd',
        },
      });
      console.log(responsibleUser.email);
      var message = {
        from: 'leosilva1698@gmail.com',
        to: responsibleUser.email,
        subject: 'Cancelamento de Reserva no Sistema PUC Espaços',
        text: 'Prezado(a),\n\n Espero que esteja bem. Gostaríamos de informar que a sua reserva de espaço no Sistema PUC Espaços foi cancelada. Compreendemos que isso pode ser inconveniente e estamos aqui para auxiliá-lo(a) em qualquer dúvida ou problema que possa surgir.\n\nEntendemos que podem haver diversos motivos para o cancelamento de uma reserva, incluindo:\n\n Conflitos de agenda: Algum evento da instituição pode ter sido programado para o mesmo horário e local, resultando na necessidade de cancelamento da sua reserva.\n\nManutenção ou problemas técnicos: Em alguns casos, pode ser necessário cancelar reservas devido a manutenção ou problemas técnicos no espaço reservado.\n\nPedimos desculpas por qualquer inconveniente causado por este cancelamento.\n\nAtenciosamente,\n[email de quem excluiu]\nSuporte do Sistema PUC Espaços',

      };

      const sendEmail = async () => {
        try {
          await transporter.sendMail(message);
          console.log('ok');
          process.exit();
        }
        catch (e: any) {
          console.log('nao enviado');
        }
      };
      sendEmail();

    }
    else {
      throw new ApiError(404, InternalCode.INVALID_REQUEST);
    }
  }

  //TO DO
  //criar métodos privados de verificação de reserva
}