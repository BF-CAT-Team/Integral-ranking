import Storage from './storage';
import Http from './http';
import Lang from "./lang";

const storage = new Storage();
const http = new Http();
const lang = new Lang();

export {
    storage, http, lang
}
