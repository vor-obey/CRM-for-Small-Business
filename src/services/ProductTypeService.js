import CRUDService from './CRUDService';
import {API_URLS} from '../constants/api_urls';

class ProductTypeService extends CRUDService {
    constructor() {
        super(API_URLS.PRODUCT_TYPES)
    }
}

export default new ProductTypeService();
