export interface Status {
  id: string;
  descricao: string;
}

export interface Bank {
  id: number;
  codigo: string;
  descricao: string;
  status: Status;
}
