import * as yup from 'yup';
import { Utils } from '../../shared/utils/utils';
import YupPassword from 'yup-password';

YupPassword(yup);

export const createUserSchema = yup.object({
  body: yup.object({
    userName: yup
      .string()
      .required("Campo nome é obrigatório."),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
      .required("Campo confirmação de senha é obrigatório."),
    email: yup
      .string()
      .test({
        message: "Domínio de email inválido.",
        test: (value) => 
        Utils.validateEmailDomain(value!, ("pucpr.edu.br|pucpr.br").split("|"))
      })
      .required("Email é obrigatório.")
      .email("Email inválido.")
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


export const signInUserSchema = yup.object({
  query: yup.object({  
    email: yup
      .string()
      .email()
      .required("Email é obrigatório."),
    password: yup
      .string()
      .required("Senha é obrigatório.")
  })
});