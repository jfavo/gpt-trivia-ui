import { User } from "../models/user";

export class OatService {
    static _instance: OatService;

    constructor() {
        if (OatService._instance) {
            return OatService._instance;
        }

        OatService._instance = this;
    }

    async loginUser(username: string, password: string): Promise<User> {
        
    }

    async createUser(
        username: string,
        email: string,
        birthDate: Date,
        password: string
    ): Promise<User> {
        
    }
}