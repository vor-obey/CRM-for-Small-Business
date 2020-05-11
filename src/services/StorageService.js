export default class StorageService {
    static KEYS = {
        ACCESS_TOKEN: 'acc',
        REFRESH_TOKEN: 'rfr'
    };

    static getItem(key) {
        return localStorage.getItem(key);
    }

    static setItem(key, value) {
        return localStorage.setItem(key, value);
    }

    static removeItem(key) {
        return localStorage.removeItem(key);
    }

    static removeJWTToken() {
        this.removeItem(StorageService.KEYS.ACCESS_TOKEN);
    }

    static getJWTToken() {
        return this.getItem(StorageService.KEYS.ACCESS_TOKEN);
    }

    static setJWTToken(value) {
        this.setItem(StorageService.KEYS.ACCESS_TOKEN, value)
    }
}
