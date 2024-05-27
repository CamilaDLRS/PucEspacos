import * as yup from 'yup';

export const updateFacilitySchema = yup.object({
  body: yup.object({
    facilityName: yup
      .string()
      .required("Campo nome é obrigatório."),
    capacity: yup
      .number()
      .nullable()
      .integer("Capacidade deve ser um número inteiro."),
    note: yup
      .string(),
    isActive: yup
      .boolean()
      .required("Status do espaço é obrigatório."),
    facilityTypeId: yup
      .string()
      .required("Tipo do espaço é obrigatório."),
    assets: yup.array().of(
      yup.object().shape({
        assetId: yup
          .string()
          .required('O ID do ativo é obrigatório'),
        quantity: yup
          .number()
          .integer('A quantidade do ativo deve ser um inteiro.')
          .required('A quantidade do ativo é obrigatória.')
          .min(1, 'A quantidade do ativo deve ser maior que 0.'),
      })
    ).test({
      message: 'Não deve haver repetições de ativos.',
      test: function (assets) {
        const assetIds = new Set<string>();

        if (assets) {
          for (const asset of assets) {
            if (assetIds.has(asset.assetId)) {
              return false; // Encontrou uma repetição
            }
            assetIds.add(asset.assetId);
          }
        }
        return true; // Não há repetições
      },
    }),
  })
});

export const createFacilitySchema =  yup.object({
  body: yup.object().shape({
    buildingId: yup
    .string()
    .required("Identificação do bloco é obrigatória."),
    facilityName: yup
      .string()
      .required("Campo nome é obrigatório."),
    capacity: yup
      .number()
      .nullable()
      .integer("Capacidade deve ser um número inteiro."),
    note: yup
      .string(),
    isActive: yup
      .boolean()
      .required("Status do espaço é obrigatório."),
    facilityTypeId: yup
      .string()
      .required("Tipo do espaço é obrigatório."),
    assets: yup.array().of(
      yup.object().shape({
        assetId: yup
          .string()
          .required('O ID do ativo é obrigatório'),
        quantity: yup
          .number()
          .integer('A quantidade do ativo deve ser um inteiro.')
          .required('A quantidade do ativo é obrigatória.')
          .min(1, 'A quantidade do ativo deve ser maior que 0.'),
      })
    ).test({
      message: 'Não deve haver repetições de ativos.',
      test: function (assets) {
        const assetIds = new Set<string>();

        if (assets) {
          for (const asset of assets) {
            if (assetIds.has(asset.assetId)) {
              return false; // Encontrou uma repetição
            }
            assetIds.add(asset.assetId);
          }
        }
        return true; // Não há repetições
      },
    }),
  })
});

export const updateStatusFacilitySchema = yup.object({
  body: yup.object({
    isActive: yup
      .boolean()
      .required("Status é obrigatório.")
  })
});

export const getAvalableFacilitiesSchema =  yup.object({
  body: yup.object().shape({
    minimumCapacity: yup
      .number()
      .integer()
      .positive("Capacidade deve ser um número positivo.")
      .nullable(),
    buildingId: yup
      .string()
      .required("Bloco é obrigatório."),
    checkinDate: yup
      .number()
      .required("Início é obrigatório."),
    checkoutDate: yup
      .number()
      .required("Saída é obrigatório."),
    facilityTypeId: yup
      .string()
      .required("Tipo do espaço é obrigatório.")
  })
});