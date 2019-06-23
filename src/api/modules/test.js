
export default {
    getInfo(type) {
        let info = undefined;
        if (type == 'info') {
            info = {
                id: new Date().getTime(),
                'html': '<h1>这是内容，需要通过浏览器查看网站源代码方法能看到。</h1>'
            }
        }
        if (info != undefined) {
            return Promise.resolve(info);
        } else {
            return Promise.reject();
        }
    }
}

