export enum InternalCode {
    INTERNAL_ERROR = 'INTERNAL_ERROR',
  
    INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
    USER_DISABLED = 'USER_DISABLED',
  
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    EMAIL_ALREADY_EXISTS_AUTH = 'EMAIL_ALREADY_EXISTS_AUTH',
  
    REGISTER_ALREADY_EXISTS = 'REGISTER_ALREADY_EXISTS',
    REGISTER_NOT_FOUND = 'REGISTER_NOT_FOUND',
    NOT_IMPLEMENTED = 'NOT_IMPLEMENTED'
  }
  
  export const ErrorMessage: Record<InternalCode, string> = {
    [InternalCode.INTERNAL_ERROR]: 'Erro interno, solicite suporte técnico.',
    
    [InternalCode.INVALID_LOGIN_CREDENTIALS]: 'Email ou senha invalida.',
    [InternalCode.USER_DISABLED]: 'Usuário desativado.',
    [InternalCode.USER_NOT_FOUND]: 'Usuário(s) não encontrado(s).',
    [InternalCode.EMAIL_ALREADY_EXISTS_AUTH]: 'Este Email já está cadastrado.',
    [InternalCode.REGISTER_ALREADY_EXISTS]: 'Registro com este identificador já existe na base.', 
    [InternalCode.REGISTER_NOT_FOUND]: 'Registro com este identificador não encontrado.',
    [InternalCode.NOT_IMPLEMENTED]: 'Código ainda não implementado.',
  };