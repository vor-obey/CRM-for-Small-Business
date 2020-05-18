import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class InstagramService extends CRUDService {
    constructor() {
        super(USER_URLS.INSTAGRAM);
    }

    validate = () => {
        return this.APIService.apiGet('/instagram/validate')
    };

    login = (creds) => {
        return this.APIService.apiPost('/instagram/login', {body: creds});
    };

    sendSecurityCode = (body) => {
        return this.APIService.apiPost('/instagram/sendSecurityCode', {body});
    };

    getThreads = () => {
        return this.APIService.apiGet('/instagram/threads');
    };
}

export default new InstagramService();