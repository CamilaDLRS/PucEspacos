
import * as yup from 'yup';

export const getReservationSchema = yup.object({
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
      .number()
      .nullable(),
    checkoutDate: yup
      .number()
      .nullable(),
    facilityIds: yup
      .array().of(yup.string())
  })
});

export const createReservationSchema = yup.object({
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
      .number()
      .required("Entrada é obrigatória."),
    checkoutDate: yup
      .number()
      .required("Saída é obrigatória.")
      .test(
        'is-greater',
        'Saída deve ser após a entrada.',
        function (value) {
          const { checkinDate } = this.parent;
          return value > checkinDate;
        }
      )
  })
});

export const updateReservationSchema = yup.object({
  body: yup.object().shape({
    reservationPurpose: yup
      .string()
      .required("Propósito da reserva é obrigatório."),
    checkinDate: yup
      .number()
      .required("Entrada é obrigatória."),
    checkoutDate: yup
      .number()
      .required("Saída é obrigatória.")
  })
});

export const deleteReservationSchema = yup.object({
  query: yup.object().shape({
    userId: yup
      .string()
      .required("Obrigatorio a identificação de usuario."),
  })
});
