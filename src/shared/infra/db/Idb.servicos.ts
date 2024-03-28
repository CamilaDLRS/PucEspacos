export interface IdbServicos {
  conectar(): Promise<void>;

  desconectar(): Promise<void>;

  executar(sql: string): Promise<any>;

  executarComParams(sql: string, parametros: any, opcoes: any): Promise<any>;
}