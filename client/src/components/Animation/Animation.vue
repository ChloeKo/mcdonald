<template>
    <div class="animation">
        <canvas></canvas>
        <div class="describe">
            {{whichDesc}}
        </div>
        <div class="finalNotice" v-if="isOver">
            <div class="topNotice">
                Penguin is so sorry...
            </div>
            <div class="sadPenguin">
                很抱歉...
                <br>
                星際企鵝先生在送餐過程中
                <br>
                不幸發生了意外
                <br>
                我們損失了唯一一名外送員
                <br>
                很遺憾的
                <br>
                我們必須取消您的訂單
                <br>
                造成您的不便敬請見諒
                <br>
                若您還需要點餐服務
                <br>
                建議您聯絡地球分店
                <br>
                <br>
                <br>
                謝謝
            </div>
            <div class="finalButton" @click="closeAnimate">
                我知道了
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    @Component
    export default class Animation extends Vue{
        private animateState: number = 0;
        private isOver: boolean = false;

        get whichDesc(){
            switch(this.animateState){
                case 0:
                    return "運送中...";
                    break;
                case 1:
                    return "唔...星際企鵝先生很像遇到了一點麻煩";
                    break;
                case 2:
                    return "喔不！快停下來 星際企鵝先生要吐了";
                    break;
                case 3:
                    return "";
                    break;
                default:
                    return "與星際企鵝先生聯繫中 請稍候...";
                    break;
            }
            
        }

        private closeAnimate(){
            this.$emit("closeAnimate");
        }

        private mounted(){
            const oA = document.querySelector('.animation');
            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d');
            const h = oA.offsetHeight;
            const w = oA.offsetWidth;
            canvas.width = 0.8*w;
            canvas.height = 0.8*h;

            const picX = w*0.8/2-100;
            const picY = h*0.8/2-100;
            const pg = new Image();
            const ed = new Image();
            pg.src = require('./rider.png');
            ed.src = require('./boom.png');
            let i = 1;
            let increase = true;
            const slideDown = ()=>{
                ctx.clearRect(0,0,w,h);
                ctx.save();
                ctx.translate(0,i);
                ctx.drawImage(pg,picX,picY,200,200)
                ctx.restore();
                i = i*-1;
            }
            const rotate = ()=>{
                ctx.clearRect(0,0,w,h);
                ctx.save();
                ctx.translate(picX,picY);
                ctx.rotate((Math.PI/180)*-i);
                ctx.drawImage(pg,0,0,200,200);
                ctx.restore();
                i++;
            }
            const rotateCenter = ()=>{
                ctx.clearRect(0,0,w,h);
                ctx.save();
                ctx.translate(picX+100,picY+100);
                ctx.rotate((Math.PI/180)*-i*2.7);
                ctx.drawImage(pg,-100,-100,200,200);
                ctx.restore();
                i++;
            }
            const explode = ()=>{
                ctx.clearRect(0,0,w,h);
                ctx.save();
                ctx.translate(w*0.8/2-100,h*0.8/2+50);
                ctx.scale(1,i);
                ctx.translate(0,-200*i);
                ctx.drawImage(ed,0,0,200,300);
                ctx.restore();
                i = i+0.03;
            }
            const fly = ()=>{
                ctx.clearRect(0,0,w,h);
                ctx.save();
                ctx.translate(picX+100,picY+100);
                ctx.rotate((Math.PI/180)*-i*2.7);
                ctx.translate(0,i*2.7);
                ctx.drawImage(pg,-100,-100,200,200);
                ctx.restore();
                i++;
                ctx.save();
                ctx.translate(w*0.8/2-100,h*0.8/2-150);
                ctx.drawImage(ed,0,0,200,300);
                ctx.restore();
            }
            let shake = 0;
            let rotateCounter = 0;
            let rotateCenterCounter = 0;
            pg.onload = ()=>{
                const shakeTimer = setInterval(()=>{
                        slideDown();
                        shake++;
                        if(shake==24){
                            clearInterval(shakeTimer);
                            this.animateState = 1;//企鵝先生發生意外
                            i = 0;
                            const rotateTimer = setInterval(()=>{
                                rotate();
                                rotateCounter++;
                                if(rotateCounter==360){
                                    clearInterval(rotateTimer);
                                    this.animateState = 2;//企鵝先生瘋狂旋轉
                                    i = 0;
                                    const rotateCenterTimer = setInterval(()=>{
                                        rotateCenter();
                                        rotateCenterCounter++;
                                        if(rotateCenterCounter==2*365){
                                            clearInterval(rotateCenterTimer);
                                            this.animateState = 3;//企鵝先生爆炸
                                            i = 0;
                                            const explodeTimer = setInterval(()=>{
                                                explode();
                                                if(i>1){
                                                    clearInterval(explodeTimer);
                                                    i = 0;
                                                    const flyTimer = setInterval(()=>{
                                                        fly();
                                                        if(i>800){
                                                            clearInterval(flyTimer);
                                                            this.isOver = true;
                                                        }
                                                    },1)
                                                }
                                            },2)
                                        }
                                    },1);
                                }
                            },2)
                        }
                },220);
            }
        }
    }
</script>

<style lang="scss" scoped>
.animation{
    z-index: 10;
    position:absolute;
    width: 100vw;
    height:100vh;
    background: rgba(lighten(#78C2C4, 30%),0.6);
    transform: translateY(calc(-100% + 51px));
    canvas{
        background: #78C2C4;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .describe{
        position: absolute;
        bottom: 27%;
        left: 50%;
        transform: translateX(-50%);
    }
    .finalNotice{
        height: 80vh;
        width: 80vw;
        background: #78C2C4;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        .topNotice{
            height: 50px;
            width: 100%;
            text-align: center;
            background: #4F726C;
            color: #FFB11B;
            font-size: 26px;
            line-height: 50px;
            border-radius: 5px 5px 0px 0px;
        }
        .sadPenguin{
            height: calc(100% - 50px);
            width: 100%;
            text-align: center;
            padding-top: 5%;
            box-sizing: border-box;
        }
        .finalButton{
            cursor: pointer;
            width: 100px;
            height: 30px;
            position: absolute;
            bottom: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            border-radius: 3px;
            text-align: center;
            line-height: 30px;
            &:hover{
                background: #0F2540;
                color: white;
            }
        }
    }
}
</style>