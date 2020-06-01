import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class InstagramService extends CRUDService {
    constructor() {
        super(USER_URLS.INSTAGRAM);
    }

    login = (creds) => {
        return this.APIService.apiPost('/instagram/login', {body: creds});
    };

    sendSecurityCode = (body) => {
        return this.APIService.apiPost('/instagram/sendSecurityCode', {body});
    };

    verify2FA = (body) => {
      return this.APIService.apiPost('/instagram/verify2FA', {body});
    };

    getThreads = () => {
        return this.APIService.apiGet('/instagram/threads');
    };

    getThreadById = (threadId, prev_cursor) => {
        return this.APIService.apiGet(`/instagram/threads/${threadId}/cursor/${prev_cursor}`);
    };

    getProfile = () => {
        return this.APIService.apiGet('/instagram/profile');
    };

    check = () => {
        return this.APIService.apiGet('/instagram/check');
    };
}

export default new InstagramService();