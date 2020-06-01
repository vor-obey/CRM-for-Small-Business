import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class IntegrationService extends CRUDService {
    constructor() {
        super(USER_URLS.INTEGRATION);
    }

    cancel = () => {
        return this.APIService.apiGet('/integration/cancel');
    };
}

export default new IntegrationService();