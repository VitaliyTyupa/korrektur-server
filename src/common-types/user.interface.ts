export enum Role {
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export class User {
  id: number;
  name: string;

  email: string;
  password: string;
  roles: Role[];
}

export interface UserPayload {
  sub: string;
  username: string;
  roles: Role[];
}
