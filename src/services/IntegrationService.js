import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class IntegrationService extends CRUDService {
    constructor() {
        super(USER_URLS.INTEGRATION);
    }
}

export default new IntegrationService();