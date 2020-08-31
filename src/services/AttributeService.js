import CRUDService from './CRUDService';
import {API_URLS} from '../constants/api_urls';

class AttributeService extends CRUDService {
    constructor() {
        super(API_URLS.ATTRIBUTES);
    }
}

export default new AttributeService();
