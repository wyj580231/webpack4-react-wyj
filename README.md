# webpack4-react-wyj
react集成webpack4和antd(按需加载,支持配置主题)
## 一直使用蚂蚁金服的dva和umi框架,加深对webpack和使用和理解.开始在网上找了很多例子,都有bug,遂自己实现,使用webpack4和最新支持的一些特性配置.路由支持按需加载或按模块加载,支持热更新,ui框架是 antd,支持按需加载组件,兼容ie9.
使用 webpack4，区分开发环境和生产环境，打包性能优化。建议使用yarn安装依赖
## 文件目录
<pre><code>
├── node_modules:                   模块文件夹
|   └── ...             
├── dist:                           打包生成目录
├── public:                         开发服务运行时的文件根目录(dll也生成在此文件夹)
├── src:                            开发目录
|   ├── components:                 公共组件
|   ├── routes:                     项目view
|   |   ├── 404:                    404页面
|   |   ├── Loading:                react-loadable按需加载的loading页面
|   ├── assets:                     静态文件
|   ├── utils:                      工具文件包
|   |   ├── request:                封装的request请求(支持请求自动加入等待状态)
|   └── index.js:                   入口文件
|   └── App.js:                     路由文件
|   └── global.js:                  全局js
├── index.ejs                       模板文件
├── postcss.config.js               postcss配置文件
├── .babelrc                        babel配置文件
├── .eslintrc.json                  eslint
├── .gitignore                      git忽略文件
├── package.json                    项目依赖 npm
├── README.MD                       项目信息
├── webpack.config.js               webpack配置文件
└── webpack.dll.config.js           dll分离公共库
</code></pre>

## 已经支持的功能
<ul>
<li>编译速度快（使用 happypack 插件实现多线程执行任务）</li>
<li>增加 dll 加快打包速度,区分生产和开发环境dll,更详细的报错信息</li>
<li>按需加载(使用react-loadable实现)</li>
<li>集成antd并使用babel-plugin-import实现按需加载(支持在webpack里配置less变量主题)</li>
<li>js和css自动添加hash(根据文件内容生成)</li>
<li>支持sass</li>
<li>css moduls写法</li>
<li>配置开发环境代理请求,解决开发环境跨域问题(生产环境可配置nignx代理)</li>
<li>eslint支持 使用umi的eslint配置 yarn run lint使用</li>
<li>加入react-redux 的实例todolist</li>
<li>支持装饰器写法(固定babel-eslint版本在8.2.6,向后不支持直接在export default上面写装饰器)</li>
</ul>
## 后续加入
<ul>
<li>单元测试</li>
<li>redux-saga实例</li>
</ul>
## 启动方法
<ul>
<li>yarn(推荐)或者npm i 安装依赖</li>
<li>npm run dll 公共包第一次生成，后续都不需要重新生成，加快打包速度</li>
<li>npm start启动项目</li>
<li>npm run build 打包项目</li>
</ul>
