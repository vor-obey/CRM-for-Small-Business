import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class AbstractProductService extends CRUDService {
    constructor() {
        super(USER_URLS.ABSTRACT_PRODUCTS);
    }
}

export default new AbstractProductService();