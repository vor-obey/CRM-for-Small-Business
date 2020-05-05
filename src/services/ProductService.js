import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class ProductService extends CRUDService {
    constructor() {
        super(USER_URLS.PRODUCTS);
    }
}

export default new ProductService();