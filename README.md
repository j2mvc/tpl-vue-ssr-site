# VueSSR网站模板

# 安装
```
git clone http://github.com/j2mvc/tpl-vue-ssr
npm install
```

# 安装依赖
```
npm install axios
npm install element-ui
npm install md5
npm install js-cookie
npm install http-proxy-middleware
npm install axios-mock-adapter --save-dev
```


# 问题
1、查看源码总是看不到axios返回的数据，报connect ECONNREFUSED 127.0.0.1:80错误，这是很神口奇的BUG。
解决办法是将端口改为和地址一样的80
2、Unexpected token: keyword «const» [app.dfc479002f5550fdcbb9.js
 ```
 {
    test: /\.js$/,
    loader: 'babel-loader',
    //exclude: /node_modules/,    //只要把这个注释掉就可以了。就会先进行es5转换，然后在打包压缩
 }
```

# 结语
想做更灵活的路由控制，在页渲染之前判断浏览器类型，却发现无法获取navigator对象，这很坑啊。
无奈，试试nextjs吧。
该项目暂停开发。
