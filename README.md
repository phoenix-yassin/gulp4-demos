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

## 运行
命令行运行`gulp`, 输入页面路径 http://localhost:3000/page/about.html

## TODO 
1. ~~压缩与不压缩; 检查~~
2. ~~完善demo, 例如: 模板demo~~
3. 细节, 比如min文件不压缩, lib库(包含img css js)的处理
4. 性能优化
