import {User} from './user';

export class MedicalExaminationRequest {
  id: string;
  doctor: User;
  patient: User;
  duration: number;
  price: number;
  discount: number;
  date: string;
}
