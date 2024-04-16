
/**
 * Enum for available roles for the user
 */
export enum UserRole {
    guest,
    standard,
    admin
}

/**
 * Object containing user data
 */
export class User {
    id: number | undefined;
    username: string | undefined;
    email: string | undefined;
    birthDate: string | undefined;
    role: string | undefined;

    constructor(
        id: number = 0,
        username: string,
        email: string | undefined,
        birthDate: string = new Date().toDateString(),
        role: string = UserRole.guest.toString()) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.birthDate = birthDate;
            this.role = role;
    }
}