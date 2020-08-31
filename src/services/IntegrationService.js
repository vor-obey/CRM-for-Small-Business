import CRUDService from './CRUDService';
import {API_URLS} from '../constants/api_urls';

class IntegrationService extends CRUDService {
    constructor() {
        super(API_URLS.INTEGRATION);
    }

    cancel = () => {
        return this.APIService.apiGet('/integration/cancel');
    };
}

export default new IntegrationService();
