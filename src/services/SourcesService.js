import CRUDService from "./CRUDService";
import {API_URLS} from "../constants/api_urls";

class SourcesService extends CRUDService {
   constructor() {
      super(API_URLS.SOURCES)
   }
}

export default new SourcesService();
