import {User} from './user';
import {Clinic} from './clinic';

export class OperationRequest {
  id: string;
  doctor: User;
  patient: User;
  clinic: Clinic;
  duration: number;
  date: Date;
  price: number;
  discount: number;
  doctorRated: boolean;
  clinicRated: boolean;
  // this is helping field for knowing which is exact rating
  doctorRating: number;
  clinicRating: number;
}
