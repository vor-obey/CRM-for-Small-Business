import HTTPService from "./HTTPService";
import { addParamsToUrl } from "../utils/helpers";

export default class CRUDService {
    APIService = new HTTPService();

    constructor(pathname) {
        this.pathname = pathname;
    }

    findOneById = async (id, params) => {
        return await this.APIService.apiGet(addParamsToUrl(`${this.pathname}/${id}`, params));
    };

    delete = async (id, params) => {
        return await this.APIService.apiDelete(addParamsToUrl(`${this.pathname}/${id}`, params));
    };

    update = async (body) => {
        return await this.APIService.apiPatch(this.pathname, { body });
    };

    list = async (params) => {
        return await this.APIService.apiGet(addParamsToUrl(this.pathname, params));
    };

    create = async (body) => {
        return await this.APIService.apiPost(this.pathname, { body });
    };

};