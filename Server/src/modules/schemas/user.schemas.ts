import * as yup from 'yup';
import { Utils } from '../../shared/utils/utils';
import YupPassword from 'yup-password';

YupPassword(yup);

export const createUserSchema = yup.object({
  body: yup.object({
    userName: yup
      .string()
      .required("Campo nome é obrigatório."),
    password: yup
      .string()
      .required("Campo SENHA é obrigatório.")
      .test({
        message: 'A senha deve conter no mínimo: \n8 caracteres\n1 letra maiúscula\n1 letra minúscula\n1 número\n1 caractere especial',
        test: (value) => {
          try {
            yup.string()
              .min(8)
              .minLowercase(1)
              .minUppercase(1)
              .minNumbers(1)
              .minSymbols(1)
              .validateSync(value);
            return true;
          } catch (error) {
            return false;
          }
        }
      }),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
      .required("Campo CONFIRMAÇÃO DE SENHA é obrigatório."),
    email: yup
      .string()
      .test({
        message: "Domínio de email inválido.",
        test: (value) => 
        Utils.validateEmailDomain(value!, (process.env.USER_ALLOWED_DOMAINS || "pucpr.edu.br|pucpr.com.br").split("|"))
      })
      .required("Email é obrigatório.")
      .email("Email inválido."),
    isActive: yup
      .boolean()
      .required("Status do usuário é obrigatório."),
    schoolId: yup
      .string()
      .nullable(),
    userType: yup
      .string()
      .required("Tipo do usuário é obrigatório.")
  })
});

export const updateUserSchema = yup.object({
  body: yup.object({  
    isActive: yup
      .boolean()
      .required("Status do usuário é obrigatório."),
    schoolId: yup
      .string()
      .nullable(),
    userType: yup
      .string()
      .required("Tipo do usuário é obrigatório.")
  })
});