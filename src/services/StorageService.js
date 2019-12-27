
export default class StorageService {
    static KEYS = {
        ACCESS_TOKEN : 'jwt',
        REFRESH_TOKEN : 'rfr'
    };

    static getItem(key) {
        return localStorage.getItem(key);
    }

    static setItem(key, value) {
        return localStorage.setItem(key, value);
    }

    static getJWTToken() {
        this.getItem(StorageService.KEYS.ACCESS_TOKEN);
    }

    static setJWTToken(value) {
        this.setItem(StorageService.KEYS.ACCESS_TOKEN, value)
    }
}
