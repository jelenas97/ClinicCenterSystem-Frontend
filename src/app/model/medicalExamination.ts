import {Clinic} from './clinic';
import {User} from './user';
import {TypeOfMedicalExam} from './typeOfMedicalExam';
import {Room} from './room';

export class MedicalExamination {
  id: string;
  date: string;
  duration: number;
  discount: number;
  price: number;
  doctor: User;
  patient: User;
  clinic: Clinic;
  type: TypeOfMedicalExam;
  medicalExaminationRoom: Room;
}
