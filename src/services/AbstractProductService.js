import CRUDService from './CRUDService';
import {API_URLS} from '../constants/api_urls';

class AbstractProductService extends CRUDService {
    constructor() {
        super(API_URLS.ABSTRACT_PRODUCTS);
    }
}

export default new AbstractProductService();
