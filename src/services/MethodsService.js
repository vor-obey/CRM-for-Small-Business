import CRUDService from "./CRUDService";
import {USER_URLS} from "../constants/urls";

class MethodsService extends CRUDService {
   constructor() {
      super(USER_URLS.METHODS)
   }
}

export default new MethodsService();
