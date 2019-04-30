gulp 4 前后端不分离模板(切图仔的最爱)
============

前后端不分离的多页应用, 而且前端只是负责做静态图

## 本脚手架基于gulp 4, 主要功能包括:
1. less以及css的处理: less转css, autoprefix
2. html处理: gulp-file-include模板, 对应后端jsp的`include`语法
3. img压缩
4. 热启动
5. js语法检查(因为我是切图仔, 写的js是基本效果, 必须让后端xx看明白)
6. 引入es6

## 重点分析
1. 热启动

    为了能像webpac打包单页应用一样, 修改任何资源页面热加载, 即时展现出修改。在多页应用中，要监控不特定的页面的不特定资源修改，就需要对所有资源进行监控。当然，我们为了节约性能，可以对正在开发的页面进行监控或者对常常修改的内容， 不进行监控。

    ```javascript
    gulp.task('watch', cb => {
        // 在下面的任务js、less、html中，都会执行文件的预处理以及页面的热启动
        gulp.watch('./js/*.js', gulp.series('js'));

        gulp.watch('./css/*.less', gulp.series('less'));

        gulp.watch('./img/**.*', gulp.series('img'));
        gulp.watch(['./page/*.html', './html_template/*.html'], gulp.series('html'));
        cb();
    });

    gulp.task('img', () => {
        return gulp.src(['./img/**.*'])
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'))
            .pipe(gulp.dest('./dist/img/'))
            .pipe(
                reload({
                    stream: true
                })
            );
    });
    ```

2. html模板

    采用 `gulp-file-include`模仿最常见的的模板格式 `<!--@include('xx.html')-->`, 这样的话, 后端的java开发者也能很容易看出来, 直接转换成jsp的include指令,在配置未见中的配置如下:

    ```javascript
    gulp.task('html', () => {
        return gulp.src(['./page/*.html'])
            .pipe(
                fileinclude({
                    prefix: '<!--@',
                    suffix: '-->',
                    basepath: './html_template'
                })
            )
            .pipe(gulp.dest('./dist/page/'))
            .pipe(
                reload({
                    stream: true
                })
            );
    });
    ```

3. es6
   
   采用es6编码已经非常流行了, 但是在关于es6 babel的配置却一直变化, 一会儿找不到包`babel-preset-env`, 一会儿又是`babel-core`异常。出现问题， 主要是因为es6转码的babel一直在变化，出现了版本间不兼容的问题。
   
   `package.json`中相关的包:
   ```javascript
    "gulp-babel": "^8.0.0",
    "@babel/core": "^7.4.4",
    "@babel/preset-env": "^7.4.4",
   ```
   `.babelrc`中的配置如下:
   ```javascript
    {
        "presets": ["@babel/preset-env"]
    }
   ```
   `gulpfile.babel.js`中应该这样配置:
   ```javascript
    gulp.task('js', cb => {
        return (
            gulp.src(['./js/*.js'])
                // .pipe(uglify())
                .pipe(eslint())
                .pipe(babel({
                    presets: ['@babel/preset-env']
                }))
                .pipe(gulp.dest('./dist/js/'))
                .pipe(
                    reload({
                        stream: true
                    })
                )
        );
    });
   ```
## 运行
命令行运行`gulp`, 输入页面路径 http://localhost:3000/page/about.html


## TODO 
1. ~~压缩与不压缩; 检查~~
2. 细节, 比如min文件不压缩, lib库(包含img css js)的处理
3. 性能优化
