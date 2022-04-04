export interface Account {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface AccountState {
  accounts: Account[];
}
