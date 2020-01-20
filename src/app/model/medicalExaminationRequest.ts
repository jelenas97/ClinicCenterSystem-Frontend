import {User} from './user';
import {Clinic} from './clinic';
import {TypeOfMedicalExam} from './typeOfMedicalExam';

export class MedicalExaminationRequest {
  id: string;
  doctor: User;
  patient: User;
  clinic: Clinic;
  type: TypeOfMedicalExam;
  duration: number;
  price: number;
  discount: number;
  date: string;
}
