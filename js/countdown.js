
const canvasOpts = {
    w: 1024,
    h: 400,
    marginTop: 20,
    left: 20
};
const ballOpts = {
    r: 8
};
const letterOpts = {
    w: 0,
    h: 0

}
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC",
    "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];
let preSecond = 0;
let preRemainTime = 0;
let balls = [];
let isFirst = true;

// 初始化
const init = () => {
    const dom = document.querySelector('#canvas');
    const ctx = dom.getContext('2d');
    dom.width = canvasOpts.w;
    dom.height = canvasOpts.h;

    letterOpts.w = digit[0][0].length;
    letterOpts.h = digit[0].length;
    getFormattedTimeArr(ctx);
    let timer = setInterval(function(){
        let remainTime = getFormattedTimeArr(ctx);

        if (!remainTime) {
            clearInterval(timer);
        }
    }, 50);
    renderDigit(ctx, canvasOpts.left, canvasOpts.marginTop, 0);
};

const countdown = () => {
    const startTime = new Date(2019, 4, 8, 0, 0, 0);
    let currTime = new Date();
    return startTime - currTime > 0 ? (startTime - currTime) / 1000 : 0;
};
const getFormattedTimeArr = (ctx) => {
    ctx.clearRect(0, 0, canvasOpts.w, canvasOpts.h);
    let remainTime = countdown();
    remainTime = parseInt(remainTime, 10);
    let h = parseInt(remainTime / 3600, 10);
    let min = parseInt((remainTime - 3600 * h) / 60, 10);
    let second = parseInt(remainTime % 60, 10);

    let preH = parseInt(preRemainTime / 3600, 10);
    let preMin = parseInt((preRemainTime - 3600 * preH) / 60, 10);
    let preSecond = parseInt(preRemainTime % 60, 10);
    renderDigits(ctx, h, min, second);
    if (remainTime !== preRemainTime  && !isFirst) {
        // render new balls
        if (parseInt(h / 10, 10) !== parseInt(preH / 10, 10)) {
            addBalls(canvasOpts.left +　0, canvasOpts.marginTop, parseInt(h / 10));
        }
        if (parseInt(h % 10, 10) !== parseInt(preH % 10, 10)) {
            addBalls(canvasOpts.left +　15 * (ballOpts.r + 1), canvasOpts.marginTop, parseInt(h % 10, 10));
        }
        if (parseInt(min / 10, 10) !== parseInt(preMin / 10, 10)) {
            addBalls(canvasOpts.left +　39 * (ballOpts.r + 1), canvasOpts.marginTop, parseInt(min / 10, 10));
        }
        if (parseInt(min % 10, 10) !== parseInt(preMin % 10, 10)) {
            addBalls(canvasOpts.left +　54 * (ballOpts.r + 1), canvasOpts.marginTop, parseInt(min % 10, 10));
        }
        if (parseInt(second / 10, 10) !== parseInt(preSecond / 10, 10)) {
            addBalls(canvasOpts.left +　78 * (ballOpts.r + 1), canvasOpts.marginTop, parseInt(second / 10, 10));
        }
        if (parseInt(second % 10, 10) !== parseInt(preSecond % 10, 10)) {
            addBalls(canvasOpts.left +　93 * (ballOpts.r + 1), canvasOpts.marginTop, parseInt(second % 10, 10));
        }

        preRemainTime = remainTime;

    }
    
    // render new balls
    updateBalls(ctx, h, min, second);
    if (isFirst) {
        isFirst = false;
        preRemainTime = remainTime;
    }
    
    if (remainTime <= 0) {
        return false
    }
    return true;
}

const renderDigits = (ctx, h, min, second) => {
    renderDigit(ctx, canvasOpts.left, canvasOpts.marginTop, h / 10);
    renderDigit(ctx, canvasOpts.left + 15 * (ballOpts.r + 1), canvasOpts.marginTop, h % 10);

    renderDigit(ctx, canvasOpts.left + 30 * (ballOpts.r + 1), canvasOpts.marginTop, 10);

    renderDigit(ctx, canvasOpts.left + 39 * (ballOpts.r + 1), canvasOpts.marginTop, min / 10);
    renderDigit(ctx, canvasOpts.left + 54 * (ballOpts.r + 1), canvasOpts.marginTop, min % 10);

    renderDigit(ctx, canvasOpts.left + 69 * (ballOpts.r + 1), canvasOpts.marginTop, 10);

    renderDigit(ctx, canvasOpts.left + 78 * (ballOpts.r + 1), canvasOpts.marginTop, second / 10);
    renderDigit(ctx, canvasOpts.left + 93 * (ballOpts.r + 1), canvasOpts.marginTop, second % 10);

    for( var i = 0 ; i < balls.length ; i ++ ){
        ctx.fillStyle= balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x , balls[i].y , ballOpts.r, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fill();
    }
}

const addBalls = (x, y, num) => {
    let letter = digit[num];

    for(let i = 0; i < letterOpts.h; i++) {
        for (let j = 0; j < letterOpts.w; j++) {
            if (letter[i][j] === 1) {
                let ball = {
                    x: x + j * 2 * (ballOpts.r + 1) + (ballOpts.r + 1),
                    y: y + i * 2 * (ballOpts.r + 1) + (ballOpts.r + 1),
                    vx: Math.pow( -1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    g: 1.5 +  Math.random(),
                    color: colors[parseInt(Math.random() * colors.length, 10)]
                }

                balls.push(ball);
            }
        }
    }
}

const updateBalls = () => {
    // 1. 移动 计算新位置与速度
    // 2. 边缘计算
    for(let i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= canvasOpts.h - ballOpts.r) {
            balls[i].y = canvasOpts.h - ballOpts.r;
            balls[i].vy = -0.75 * balls[i].vy;
        }
    }

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].x + ballOpts.r　<= 0 || balls[i].x - ballOpts.r >= canvasOpts.w) {
            balls.splice(i, 1);
            i--;
        }
    }
}

const renderDigit = (ctx, x, y, num) => {
    ctx.fillStyle = 'rgb(0, 102, 153)';

    let letter = digit[parseInt(num, 10)];
    for(let i = 0; i < letterOpts.h; i++) {
        for (let j = 0; j < letterOpts.w; j++) {
            if (letter[i][j] === 1) {
                ctx.beginPath();
                // x,y r, startAngle, endAngle, closewise
                ctx.arc(
                    x + j * 2 * (ballOpts.r + 1) + (ballOpts.r + 1),
                    y + i * 2 * (ballOpts.r + 1) + (ballOpts.r + 1),
                    ballOpts.r , 0, 2 * Math.PI
                );
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

window.onload = function() {
    init();
}
