/**
 * 时间
 */

export default class Time {
    DATE = new Date();

    now() {
        return this.DATE.getTime();
    }
}
