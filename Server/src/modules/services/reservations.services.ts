import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { ReservationDto } from "../dtos/reservation/reservation.dto";
import { ReservationQueryOptionsDto } from "../dtos/reservation/reservationOptions.dto";
import * as uuid from "uuid";
import { ReservationsRepository } from "../repositories/reservations.repository";
import { UsersServices } from "./users.services";
import { UserDto } from "../dtos/user.dto";
import { UserType } from "../enums/userType.enum";
import { FacilitiesServices } from "./facilities.services";
import { ReservationAvailabilityQueryOptionsDto } from "../dtos/reservation/reservationAvailabilityOptions.dto";
import { ReservationStatus } from "../enums/reservationStatus.enum";

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

    const facility = await FacilitiesServices.getById(reservation.facilityId, { getAssets: false });
    if (!facility.isActive) {
      throw new ApiError(404, InternalCode.INVALID_PERMISION);
    }

    const responsibleUser = await UsersServices.getById(reservation.responsibleUserId);
    if (!responsibleUser.isActive) {
      throw new ApiError(404, InternalCode.INVALID_PERMISION);
    }
    reservation.reservationStatus = ReservationStatus.APPROVED;

    if (reservation.requestingUserId) {
      reservation.reservationStatus = ReservationStatus.REQUESTED;

      const requestingUser = await UsersServices.getById(reservation.responsibleUserId);
      if (!requestingUser.isActive) {
        throw new ApiError(404, InternalCode.INVALID_PERMISION);
      }
    }
    await ReservationsServices.isValid(reservation);

    reservation.reservationId = uuid.v4();
    await ReservationsRepository.create(reservation);
    return reservation.reservationId;
  }

  public static async update(reservationUpdated: ReservationDto): Promise<void> {

    const reservation = await this.getById(reservationUpdated.reservationId!);

    reservation.update(reservationUpdated);
    await ReservationsServices.isValid(reservation);

    await ReservationsRepository.update(reservation);
  }

  public static async delete(id: string, userId: string): Promise<void> {

    const reservation = await this.getById(id);
    const dateNow = new Date().getTime();
    const responsibleUser = await UsersServices.getById(reservation.responsibleUserId);
    const admUser = await UsersServices.getById(userId);

    // Verifica se o usuario esta ativo
    if (admUser.isActive == false) {
      throw new ApiError(404, InternalCode.USER_DISABLED);
    }

    if (reservation.checkinDate <= dateNow) {
      throw new ApiError(404, InternalCode.INVALID_PERMISION, null, "Reserva iniciada ou concluida")
    }
    if (admUser.userType == UserType.ADMINISTRATOR || admUser.userType == UserType.SECRETARY || admUser.userId == reservation.responsibleUserId) {

      await ReservationsRepository.delete(id);

      if (userId != responsibleUser.userId) {
        this.sendEmail(responsibleUser, admUser)
      }

    }
    else {
      throw new ApiError(404, InternalCode.INVALID_PERMISION);
    }

  }

  public static async isAvailable(options: ReservationAvailabilityQueryOptionsDto): Promise<boolean> {

    const optionsX: ReservationQueryOptionsDto = {
      ...options,
      checkinDate: new Date(options.checkinDate).setHours(0, 0, 0, 0),
      checkoutDate: new Date(options.checkoutDate).setHours(23, 59, 59, 0),
      facilityIds: (options.facilityId) ? [options.facilityId] : []
    }
    let reservations: ReservationDto[] = await ReservationsServices.getAll(optionsX)
      .then((reservations) => { return reservations })
      .catch((err) => { return [] });


    for await (const reservation of reservations) {
      if (
        options.checkinDate < reservation.checkoutDate &&
        options.checkoutDate >= reservation.checkoutDate &&
        options.reservationId != reservation.reservationId
      ) {
        return false;
      }
    }
    return true;
  }

  private static async isValid(reservation: ReservationDto): Promise<boolean> {

    if (reservation.checkinDate < new Date().getTime()) {
      throw new ApiError(404, InternalCode.INVALID_REQUEST, "Reservas no passado não são permitidas.");
    }
    if (reservation.checkoutDate < reservation.checkinDate) {
      throw new ApiError(404, InternalCode.INVALID_REQUEST, "Saída deve ser após a entrada.");
    }

    if (((new Date(reservation.checkinDate)).getDate() !== (new Date(reservation.checkoutDate)).getDate()) ||
      ((new Date(reservation.checkinDate)).getMonth() !== (new Date(reservation.checkoutDate)).getMonth()) ||
      ((new Date(reservation.checkinDate)).getFullYear() !== (new Date(reservation.checkoutDate)).getFullYear())) {
      throw new ApiError(404, InternalCode.INVALID_REQUEST, "Não é permitido entrada e saída em dias distintos.");
    }

    let options: ReservationAvailabilityQueryOptionsDto = {
      requestingUserId: reservation.requestingUserId || undefined,
      responsibleUserId: (reservation.requestingUserId) ? undefined : reservation.responsibleUserId,
      checkinDate: reservation.checkinDate,
      checkoutDate: reservation.checkoutDate,
      reservationId: reservation.reservationId || undefined
    }

    if (!await ReservationsServices.isAvailable(options)) {
      throw new ApiError(404, InternalCode.INVALID_REQUEST, "Usuário já contém reserva que conflita com este dia e horário.");
    };

    options = {
      requestingUserId: undefined,
      responsibleUserId: undefined,
      checkinDate: reservation.checkinDate,
      checkoutDate: reservation.checkoutDate,
      facilityId: reservation.facilityId,
      reservationId: reservation.reservationId || undefined
    }
    if (!await ReservationsServices.isAvailable(options)) {
      throw new ApiError(404, InternalCode.INVALID_REQUEST, "Espaço indisponível.");
    };
    return true;
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
}