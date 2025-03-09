export enum Role {
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role[];
}

export interface UserPayload {
  sub: string;
  username: string;
  role: Role[];
}
