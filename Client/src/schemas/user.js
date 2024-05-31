import * as yup from 'yup';
import YupPassword from 'yup-password';
/* import { validateCnpj } from '../utils' */

YupPassword(yup);

export const createUserSchema = yup.object().shape({
    userName: yup
      .string()
      .required("Campo nome é obrigatório."),
 /*   cnpj: yup
      .string()
      .test({
        message: "Campo CNPJ inválido",
        test: (value) => validateCnpj(value)
      })
      .required("Campo CPNJ é obrigatório."), */
    password: yup
      .string()
      .required("Campo senha é obrigatório.")
      .min(8, "Precisa ter pelo menos 8 caracteres")
      .minLowercase(1, "Precisa ter pelo menos letra Minúscula")
      .minUppercase(1, "Precisa ter pelo menos letra Maiúscula")
      .minNumbers(1, "Precisa ter pelo menos 1 número")
      .minSymbols(1, "Precisa ter pelo menos 1 caracter especial"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
      .required("Campo confirmação de senha é obrigatório."),
    email: yup
      .string()
      .required("Email é obrigatório.")
      .test({
        message: "Insira um email válido com domínio pucpr.edu.br ou pucpr.br.",
        test: (value) => { 
            const [, domain] = value.split('@');
            return ["pucpr.edu.br", "pucpr.br"].includes(domain);
          }
        
      })
      .email("Email inválido.")
});

export const updateUserSchema = yup.object().shape({
    isActive: yup
      .boolean()
      .required("Status do usuário é obrigatório."),
    schoolId: yup
      .string()
      .nullable(),
    userType: yup
      .string()
      .required("Tipo do usuário é obrigatório.")
});


export const signInUserSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido.")
      .required("Email é obrigatório."),
    password: yup
      .string()
      .required("Senha é obrigatório.")
});