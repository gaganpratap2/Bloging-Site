import config from "../config/config.js";
import { Client, Account ,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
        this.account = new Account(this.client);
    }


    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if(userAccount) {
                //call another meathod
                return this.login({email, password});
            }else{
                return userAccount; 
            }

        }catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
            return session;
        }catch (error) {
            console.error("Error logging in:", error);
        }
    }
    
    async getCurrentUser(){
        try{
            await this.account.get();
        }catch (error) {
            console.error("Error getting current user:", error);
    }

    return null;
}
    async logout() {
        try {
            await this.account.deleteSessions('current');
        } catch (error) {
            console.error("Error logging out:", error);
        }

    }
}

const authService = new AuthService();

export default authService;