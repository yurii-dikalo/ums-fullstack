export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string[];
  status: string;
  createdAt: Date;
}
