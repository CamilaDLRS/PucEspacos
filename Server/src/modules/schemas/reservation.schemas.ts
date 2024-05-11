import * as yup from 'yup';

export const getReservationSchema =  yup.object({
  body: yup.object().shape({
    responsibleUserId: yup
      .string()
      .nullable(),
    reservationStatus: yup
      .string()
      .nullable(),
    buildingId: yup
      .string()
      .nullable(),
    checkinDate: yup
      .date()
      .nullable(),
    checkoutDate: yup
      .date()
      .nullable(),
    facilityIds: yup
      .array().of(yup.string())
  })
});

export const createReservationSchema =  yup.object({
  body: yup.object().shape({
    responsibleUserId: yup
    .string()
    .required("Identificação do usuário responsável é obrigatória."),
    requestingUserId: yup
      .string()
      .nullable(),
    facilityId: yup
      .string()
      .required("Identificação do espaço é obrigatória."),
    reservationPurpose: yup
      .string()
      .required("Propósito da reserva é obrigatório."),
    checkinDate: yup
      .date()
      .required("Checkin é obrigatório."),
    checkoutDate: yup
      .date()
      .required("Checkout é obrigatório.")
  })
});

export const updateReservationSchema =  yup.object({
  body: yup.object().shape({
    reservationPurpose: yup
      .string()
      .required("Propósito da reserva é obrigatório."),
    checkinDate: yup
      .date()
      .required("Checkin é obrigatório."),
    checkoutDate: yup
      .date()
      .required("Checkout é obrigatório.")
  })
});
