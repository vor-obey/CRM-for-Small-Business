import { USER_URLS } from "../constants/urls";
import CRUDService from "./CRUDService";

class UserService extends CRUDService {
    constructor(){
        super(USER_URLS.USERS)
    }

    async login(email, password) {
        try {
            return await this.APIService.fetch('POST', '/auth/login', {
                email,
                password,
            });
        } catch (e) {
            return e;
        }
    };

    async sendPasswordResetEmail(email) {
        try {
            return await this.APIService.apiPost(`/auth/forgot_password/${email}`)
        } catch (e) {
            return e;
        }
    }

    async sendNewPassword(body) {
        try {
            return await this.APIService.fetch('POST', `/auth/restore_password`, body)
        } catch (e) {
            return e;
        }
    }

    async getCurrentUser() {
        try {
            return await this.APIService.apiGet('/users/me');
        } catch (e) {
            return e;
        }
    };

    async deleteUser(id) {
        try {
            return await this.APIService.apiDelete('/users');
        } catch (e) {
            return e;
        }
    };

    async getRoles() {
        try {
            return await this.APIService.apiGet('/roles');
        } catch (e) {
            return e;
        }
    }
}

export default new UserService();
