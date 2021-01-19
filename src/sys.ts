import Axios from 'axios';

const http = Axios.create({});

export async function sysort(url: string) {
    if(__webpack_require__.c[url]) return __webpack_require__(url);
    const pkg = await http.get(url, {}).then(({ data }) => data);
    (__webpack_modules__ as any)[url] = function (module: any, __webpack_exports__: any, __webpack_require__: any) {
        const exports = eval(pkg);
        __webpack_require__.c[url] = {
            children: [], exports, i: url, l: true, parents: [],
        }
        return exports;
    };
    await (__webpack_modules__ as any)[url].call(module.exports, module, module.exports, __webpack_require__);
    return await __webpack_require__(url);
}
