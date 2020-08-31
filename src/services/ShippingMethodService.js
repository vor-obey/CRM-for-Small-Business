import CRUDService from './CRUDService';
import {API_URLS} from '../constants/api_urls';

class ShippingMethodService extends CRUDService {
    constructor() {
        super(API_URLS.METHODS);
    }
}

export default new ShippingMethodService();
