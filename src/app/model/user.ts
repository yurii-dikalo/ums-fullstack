export interface User {
  id: number;
  name: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string[];
  status: string;
  createdAt: Date;
}
