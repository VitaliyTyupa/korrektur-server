export enum Role {
    Teacher = 'teacher',
    Student = 'student',
}

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role[];
}
