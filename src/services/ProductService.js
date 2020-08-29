import CRUDService from './CRUDService';
import {API_URLS} from '../constants/api_urls';

class ProductService extends CRUDService {
    constructor() {
        super(API_URLS.PRODUCTS);
    }
}

export default new ProductService();
