import {BASE_URL} from "../constants/urls";
import StorageService from "./StorageService";

//Singleton
export default class HTTPService {
    static _instance;

    constructor () {
        if(HTTPService._instance) {
            return HTTPService._instance;
        }

        HTTPService._instance = this;
        return this;
    }

    async fetch(method, url, body) {
        let fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (typeof body !== 'undefined') {
            fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(BASE_URL + url, fetchOptions);
        return response.json()
    }

    async authFetch(method, url, options = {}, raw = false) {
        const token = StorageService.getJWTToken();
        const { body, ...fetchOptions } = options;

        if (typeof body !== 'undefined') {
            fetchOptions.body = JSON.stringify(options.body);
        }

        const authOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            ...fetchOptions,
        };

        const response = await fetch(BASE_URL + url, authOptions);

        if (raw) {
            return response;
        }

        if (response.status === 401) {
            //TODO refactor redirect;
            throw new Error('Not Authenticated!');
        }

        return response.json().catch(() => response);
    }

    apiGet = (...args) => this.authFetch('GET', ...args);
    apiPut = (...args) => this.authFetch('PUT', ...args);
    apiPost = (...args) => this.authFetch('POST', ...args);
    apiPatch = (...args) => this.authFetch('PATCH', ...args);
    apiDelete = (...args) => this.authFetch('DELETE', ...args);
}
