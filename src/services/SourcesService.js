import CRUDService from "./CRUDService";
import {USER_URLS} from "../constants/urls";

class SourcesService extends CRUDService {
   constructor() {
      super(USER_URLS.SOURCES)
   }
}

export default new SourcesService();
