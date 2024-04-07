export interface IdbServices {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  execute(sql: string): Promise<any>;

  executeWithParams(sql: string, bindParams: any, options?: any): Promise<any>;
}
