import {User} from './user';
import {Diagnosis} from './diagnosis';

export class MedicalReport {
  id: string;
  report: string;
  therapy: string;
  doctorId: string;
  diagnosisId: string;
  medicamentId: string;
  doctor: User;
  patientId: string;
}
