import HTTPService from "./HTTPService";
import {USER_URLS} from "../constants/urls";
import { addParamsToUrl } from "../utils/helpers";

export default class CRUDService {
    APIService = new HTTPService();

    constructor(pathname) {
        this.pathname = pathname;
    }

    findOneById = async (id, params) => {
        return await this.APIService.apiGet(addParamsToUrl(`${this.pathname}/${id}`, params));
    };

    list = async (params) => {
        return await this.APIService.apiGet(addParamsToUrl(this.pathname, params));
    };

    create = async (body) => {
        return await this.APIService.apiPost(USER_URLS.USERS, { body });
    };
}
