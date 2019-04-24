# scaffold
a scaffold consist of gulp,webpack,sass,postcss,art-template

## 功能
- 完善POJO类对ajax传回对象的对应转换，能自动转为数组，字符串
- 添加自动扫描添加事件函数
- 对于添加了select-option,select-label的标签，能快速生成下拉列表
- 对于添加了show,close属性的标签，能快速打开关闭弹窗
- 修复IE6下常见ajax问题,增加了不支持函数操作的判断
- 改善dom操作类的操作细节
- 使用sizzle作为选择器修复IE6的选择器bug
- 使用Reset.css代替Bootstrap.reboot
- 默认不加载jQuery
- 统一加载ie8fix.js，因为高级版IE仍然不支持部分ES5,ES6操作且IE10,11不支持条件注释
- 改用yarn

## 说明
此项目用于天高前端框架的开发，用于将HTML,CSS,JavaScript实现模块化。
同时支持CSS使用SCSS,HTML使用art-template,JS使用ES6

## 特点
### JavaScript
1. 使用类似Spring容器的工厂方法，将与dom有关的操作全部交由Spring类完成(还在实现中，目前仅完成创建对象)
2. ajax类，用Fetch定义，并统一操作的接口，简化操作
3. array操作类，由es6的array方法的IE8可用的polyfill
4. database操作类(未完成)，使用统一化的接口对前端数据库进行操作，已对数据进行缓存
5. dom类，统一化dom的操作方法，集中解决dom操作的兼容性问题，包括事件的兼容
6. image_preview类，统一化的图像预览方案，绑定input与img。实现直至IE8的本地预览
7. test_input类，常用的正则表达式操作与校验函数。
### ajax
- 修改Fech转回XHR,能正确设置同步异步
- ajax传入函数使用POJO类，类似formdata能快速进行参数的打包与发送
- content-type类以提供更快的匹配所需的header说明
- 不主动创建Request保证了iOS浏览器的成功提交
- 修改参数判断,可以传入无参数或非POJO类型
- POJO类对ajax传回对象的对应转换，能自动转为数组，字符串
### POJO
- 无规则对象类似json
- 用于发送及接受请求时的中间函数
- 可以转为表单和json所用的参数形式

### Webpack
使用了Webpack-dev-server中的HMR，让资源全部在内存中运行，提高开发编译效率。
### 错误提示
- 使用window.onerror拦截所有异常并输出,防止低版本ie或手机浏览器无法查看错误信息
- 可以使用传入不同函数以实现美观的错误提示。
### 持久化
- 使用sessionStorage进行信息存储
- session级别
### 文件结构
- public文件夹存放通用的文件
- config包括ie8兼容用的entry文件,第三方或通用函数的entry
- 所有图片放置与images内，并且可使用"public/images/\*"或"img/\*"路径加载图片
- 常用函数分类并放置于scripts内，部分函数以可直接加载例如"dom","selector"
### 公共模块
- public文件夹下加载网站级公用的js,css文件
- 全局jQuery
- Bootstrap
### Postcss
- 压缩css
- 合并媒体查询器
- 常见兼容性修复
### 标记自动添加事件
- 发挥了HTML标记的特点快速添加事件
- 对于添加了select-option,select-label的标签，能快速生成下拉列表
- 对于添加了show,close属性的标签，能快速打开关闭弹窗

## 如何使用
1. 解压并cd到该文件夹之内
2. - npm run dev 进入开发模式,进入private文件夹内编码，访问localhost/文件夹名查看效果。(由于使用80端口,所以UNIX/Linux系需要使用sudo)
 - npm run build 编译所有文件到/dist文件夹，最终生成文件为CSS+HTML+JS，可在IE6+上运行
 - npm run new 快速新建网页/模块，自动在private文件夹下创建完所需的文件夹
3. 注意页面/模块对应的JS，CSS需要在entry.xxxx.js中使用es6方法import导入,已自动导入IE8Fix,CSS可使用@import导入。