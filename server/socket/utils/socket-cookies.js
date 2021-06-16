const cookie = require('cookie');
/**
 * Socket cookie parser
 * @param {object} socket ! socket.io object
 * @returns 
 */
const Cookies = (socket) => {
    const _cookies = cookie.parse(socket.request.headers.cookie || '');

    const all = () => _cookies;

    const get = key => _cookies[key]

    return {
        all,
        get,
    }
}

module.exports = Cookies;