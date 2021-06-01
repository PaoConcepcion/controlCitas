export type Roles = 'employee' | 'admin';

export interface User {
  email: string;
  password: string;
}

export interface UserResponse extends User {
  message: string;
  token: string;
  id_empleado: number;
  rol: Roles;
  nombre: string;
}
