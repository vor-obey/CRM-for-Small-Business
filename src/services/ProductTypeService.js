import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class ProductTypeService extends CRUDService {
    constructor() {
        super(USER_URLS.PRODUCT_TYPES)
    }
}

export default new ProductTypeService();