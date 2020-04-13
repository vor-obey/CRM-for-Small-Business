import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class InstagramService extends CRUDService {
    constructor() {
        super(USER_URLS.INSTAGRAM);
    }

    init = () => {
        return this.APIService.apiPost('/Instagram/check')
    };

    getThreads = () => {
        return this.APIService.apiGet('/Instagram/threads')
    };

    refreshThread = (id) => {
      return this.APIService.apiGet(`/Instagram/threads/refresh?threadId=${id}`)
    };
}

export default new InstagramService();