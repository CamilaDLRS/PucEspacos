export enum InternalCode {
  INTERNAL_ERROR = 'INTERNAL_ERROR',

  INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
  INVALID_LOGIN_NOT_ACTIVE = 'INVALID_LOGIN_NOT_ACTIVE',
  USER_DISABLED = 'USER_DISABLED',

  EMAIL_ALREADY_EXISTS_AUTH = 'EMAIL_ALREADY_EXISTS_AUTH',

  REGISTER_ALREADY_EXISTS = 'REGISTER_ALREADY_EXISTS',
  REGISTER_NOT_FOUND = 'REGISTER_NOT_FOUND',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',

  INVALID_REQUEST = 'INVALID_REQUEST',
  INVALID_EMAIL_DOMAIN = "INVALID_EMAIL_DOMAIN"
}

export const ErrorMessage: Record<InternalCode, string> = {
  [InternalCode.INTERNAL_ERROR]: 'Erro interno, solicite suporte técnico.',
  [InternalCode.INVALID_LOGIN_CREDENTIALS]: 'Email ou senha invalida.',
  [InternalCode.INVALID_LOGIN_NOT_ACTIVE]: 'Usuário desativado.',
  [InternalCode.USER_DISABLED]: 'Usuário desativado.',

  [InternalCode.INVALID_EMAIL_DOMAIN]: 'Email com domínio inválido.',
  [InternalCode.EMAIL_ALREADY_EXISTS_AUTH]: 'Este Email já está cadastrado.',
  [InternalCode.REGISTER_ALREADY_EXISTS]: 'Registro com este identificador já existe na base.',

  [InternalCode.REGISTER_NOT_FOUND]: 'Registro não encontrado.',
  [InternalCode.NOT_IMPLEMENTED]: 'Código ainda não implementado.',
  [InternalCode.INVALID_REQUEST]: 'Requisição inválida, verifique os paramêtros e corpo.'
};