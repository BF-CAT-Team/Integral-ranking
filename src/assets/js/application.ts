import {storage} from "./index";

export default class Application {
    constructor(data: Object) {
        data.computed = {
            isLogin: this.isLogin,
            allUser: this.allUser,
            currentUser: this.currentUser,
            ...data.computed,
        }

        return data;
    }

    allUser() {
        const userData = storage.get('user');
        if (userData.code != 0) return [];
        return userData.data.value || [];
    }

    currentUser() {
        const userData = storage.get('user');
        if (userData.code != 0) return {};
        return userData.data.value[0] || {};
    }

    isLogin() {
        return this.allUser.length >= 0;
    }
}
