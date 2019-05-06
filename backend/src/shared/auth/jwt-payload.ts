import { UserRole } from "src/user/models/user-role.enum";

export interface Jwtpayload {
    username: string;
    role: UserRole;
    iat?: Date;
}
