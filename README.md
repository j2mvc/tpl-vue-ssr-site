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
1、查看源码总是看不到axios返回的数据，报connect ECONNREFUSED 127.0.0.1:80错误，
解决办法是将端口改为和地址一样的80
2、Unexpected token: keyword «const» [app.dfc479002f5550fdcbb9.js
 ```
 {
    test: /\.js$/,
    loader: 'babel-loader',
    //exclude: /node_modules/,    //只要把这个注释掉就可以了。就会先进行es5转换，然后在打包压缩
 }
```
