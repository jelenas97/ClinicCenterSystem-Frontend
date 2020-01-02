import {User} from './user';

export class Vacation {
  id: number;
  leaveDate: Date;
  returnDate: Date;
  reason: string;
  userId: number;
  userRole: string;
  flag: string;
  user: User;
}
