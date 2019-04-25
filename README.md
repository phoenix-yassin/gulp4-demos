gulp 4 前后端不分离模板(切图仔的最爱)
============
## 本脚手架基于gulp 4, 主要功能包括:
1. less以及css的处理: less转css, autoprefix
2. html处理: gulp-file-include模板, 对应后端jsp的`include`语法
3. img压缩
4. 热启动
5. js语法检查(因为我是切图仔, 写的js是基本效果, 必须让后端xx看明白)
6. es6 写配置文件

## TODO 
1. ~~压缩与不压缩; 检查~~
2. ~~完善demo, 例如: 模板demo~~
3. 细节, 比如min文件不压缩, lib库(包含img css js)的处理
4. 性能优化

## 运行
运行`gulp`, 
查看页面 http://localhost:3000/page/about.html