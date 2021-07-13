import { UserResponse } from './../shared/models/user.interface';

export class RoleValidator {
    isEmployee(user: UserResponse): boolean {
        return user.rol === 'employee';
    }
    isAdmin(user: UserResponse): boolean {
        return user.rol === 'admin';
    }
}
