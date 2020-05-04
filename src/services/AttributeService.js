import CRUDService from './CRUDService';
import {USER_URLS} from '../constants/urls';

class AttributeService extends CRUDService {
    constructor() {
        super(USER_URLS.ATTRIBUTES);
    }
}

export default new AttributeService();