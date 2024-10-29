import {PagoMovilesInterface} from './PagoMoviles.interface';
import {ROLES} from './Roles.enum';

export interface UsersInterface {
  name: string;
  email: string;
  username: string;
  password: string;
  lastName: string;
  role: ROLES;
  verified: boolean;
  cedula: string;
  saldo: number;
  pagoMoviles: PagoMovilesInterface[];
}
