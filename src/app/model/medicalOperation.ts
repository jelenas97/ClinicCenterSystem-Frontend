import {User} from './user';
import {Clinic} from './clinic';

export class MedicalOperation {
  id: string;
  doctor: User;
  patient: User;
  clinic: Clinic;
  duration: number;
  date: Date;
}
