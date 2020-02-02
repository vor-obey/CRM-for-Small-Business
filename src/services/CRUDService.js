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

    deleteUser = async (id, params) => {
        return await this.APIService.apiDelete(addParamsToUrl(`${this.pathname}/${id}`, params));
    };

    patchUser = async (body) => {
        return await this.APIService.apiPatch(USER_URLS.USERS, { body });
    };

    list = async (params) => {
        return await this.APIService.apiGet(addParamsToUrl(this.pathname, params));
    };

    create = async (body) => {
        return await this.APIService.apiPost(USER_URLS.USERS, { body });
    };

    customerList = async (params) => {
        return await this.APIService.apiGet(addParamsToUrl(`${this.pathname}`, params));
    };

    createCustomer = async (body) => {
        return await this.APIService.apiPost(USER_URLS.CUSTOMERS, { body });
    };

    deleteCustomer = async (id, params) => {
        return await this.APIService.apiDelete(addParamsToUrl(`${USER_URLS.CUSTOMERS}/${id}`, params));
    };

    patchCustomer = async (body) => {
        return await this.APIService.apiPatch(`${USER_URLS.CUSTOMERS}`, { body });
    };
}
