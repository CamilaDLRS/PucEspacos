import * as yup from 'yup';
import { Utils } from '../../shared/utils/utils';
import YupPassword from 'yup-password';

YupPassword(yup);

export const createUserSchema = yup.object({
  body: yup.object({
    userName: yup
      .string()
      .required("Campo nome é obrigatório."),
    // password: yup
    // .string()
    // .required("Campo senha é obrigatório.")
    // .min(8, "Precisa ter pelo menos 8 caracteres")
    // .minLowercase(1, "Precisa ter pelo menos letra Minúscula")
    // .minUppercase(1, "Precisa ter pelo menos letra Maiúscula")
    // .minNumbers(1, "Precisa ter pelo menos 1 número")
    // .minSymbols(1, "Precisa ter pelo menos 1 caracter especial"),
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