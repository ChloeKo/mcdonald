<template>
    <div>
       <div class="head">
           <transition name="fade">
               <div class="bulletin" v-if="bullShow">
               <div class="detail">
                    <div class="logo"></div>
                    <div class="name">{{ShopName.name}}</div>
                    <div class="rate">
                        <Star class="star" :score="ShopName.wm_poi_score"></Star>
                        <span class="ratingScore">{{ShopName.wm_poi_score}}</span>
                    </div>
                    <div class="time">{{ShopName.min_price_tip}} <span>|</span> {{ShopName.shipping_fee_tip}} <span>|</span> {{ShopName.delivery_time_tip}}<br>配送時間 ： {{ShopName.shipping_time}}</div>
                    <div class="line"></div>
                    <div class="discount">
                        <p>
                            <img src="http://p0.meituan.net/xianfu/019d1bbb1310b1531e6af6172c9a5095581.png"/>
                             {{ShopName.discounts2[0].info}}
                        </p>
                    </div>
               </div>
               <div class="close" @click="closeBull">X</div>
           </div>
           </transition>
           <div class="search-wrapper">
               <div class="back-wrapper">
                   <span class="icon-arrow_lift"></span>
               </div>
               <form class="search">
                   <span class="search-icon"></span>
                   <input class="search-bar" type="text" placeholder="搜尋店內美食" @focus="searchShow" @input="filt" @propertychange="filt" v-model="keyWords">
                   <ul class="search-list" v-show="isSearch">
                       <li v-for="(item, iindex) in resultArr" :key="iindex">
                           <a :href=" '#' + item " @click.prevent="searchScroll(item)">{{item}}</a>
                       </li>
                   </ul>
               </form>
               <div class="button-wrapper">
                   <div class="spell">併單</div>
                   <div class="dots">
                       <div class="dot"></div>
                       <div class="dot"></div>
                       <div class="dot"></div>
                   </div>
               </div>
           </div>

           <div class="content-wrapper">
                <div class="logo"></div>
                <div class="name">{{ShopName.name}}</div>
                <div class="star">
                    <span class="star_img" :class="{'star_active': isActive}" @click="isActive = !isActive"></span>
                    <p>收藏</p>
                </div>
           </div>

           <div class="posts-wrapper">
               <div class="posts-mark"></div>
               <div class="posts" @click="showBull" ref="thePost">{{postText}}</div>
               <div class="acts" @click="showBull">{{ShopName.discounts2.length}}個折扣
                   <span class="icon-keyboard_arrow_right"></span>
               </div>
           </div>
       </div>

    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import Star from "../Star/Star.vue";

    @Component({
        components: {
            Star
        }
    })
    export default class Header extends Vue{
        @Prop(Object) readonly Shop: object|undefined;
        private orders:object = {};
        private isShow : boolean = false;
        private postText : string = '';
        private bullShow : boolean = false;
        public score : number = 0;
        private isSearch:boolean = false;
        private searchArr:Array<string> = [];
        private resultArr:Array<string> = [];
        private keyWords:string = '';
        private isActive: boolean = false;
        get getData(){
            return this.$store.getters.getOrders.data;
        }
        private updated(){
            if(this.keyWords.length==0){
                this.isSearch = false;
            }else{
                this.isSearch = true;
            }
        }
        get ShopName(){
            return this.$store.getters.getSellers.data;            
        }
        get ShopOrder(){
            return this.$store.getters.getOrders.data;            
        }
        
        private showBull():void{
            this.bullShow = true;
        }
        private closeBull():void{
            this.bullShow = false;
        }
        private searchShow():void{
            this.isSearch = true;
        }
        private searchScroll(item){
            this.keyWords = '';
            const result = document.querySelector(`#${item}`);
            const content = document.querySelector('.contentGoods');
            
            if (navigator.vendor == "Apple Computer, Inc.") {
                let top: number = 0;
                let current:number = content.scrollTop;
                if(current != 0){
                    top = current;
                }
                
                const timer = setInterval(()=>{
                    if(current < result.parentElement.parentElement.parentElement.offsetTop){
                        if(Math.floor(top/10) >= Math.floor((result.parentElement.parentElement.parentElement.offsetTop-50)/10)){
                            clearInterval(timer);
                        }
                        content.scrollTo(0,top);
                        top+=50;
                    }else{
                        if(Math.floor(top/10) <= Math.floor((result.parentElement.parentElement.parentElement.offsetTop-50)/10)){
                            clearInterval(timer);
                        }
                        content.scrollTo(0,top);
                        top-=50;
                    }
                    
                    
                },1)
            }else{
                content.scrollTo(0, result.parentElement.parentElement.parentElement.offsetTop);
            }
        }
        private mounted(){
            this.postText = this.ShopName.discounts2[0].info.slice(0,20)+'...';
            const arr = this.ShopOrder.food_spu_tags;
            arr.forEach(tags=>{
                tags.spus.forEach(food=>{
                    this.searchArr.push(food.name);
                })
            })
            // console.log(this.searchArr);
        }
        private filt(){
            this.resultArr = this.searchArr.filter(arr=>arr.match(this.keyWords))
        }
    }
</script>

<style lang="scss" scoped>
@import url("../../../public/font/style.css");
.head{
    height:180px;
    background:url("./sky.jpeg") no-repeat;
    background-size: cover;
    position: relative;
    .bulletin{
        position:absolute;
        z-index:6;
        width:100vw;
        height:100vh;
        background:rgba(98,98,98,0.8);
        padding:43px 20px 0 20px;
        box-sizing:border-box;
        .close{
            font-size:15px;
            font-family: 'Baloo Bhaina 2', cursive;
            text-align:center;
            line-height: 44px;
            position:fixed;
            bottom:65px;
            left:50%;
            transform:translate(-50%,0);
            width:40px;
            height:40px;
            border:1px solid rgba(160,160,160,0.9);
            color:white;
            border-radius:50%;
            cursor:pointer;
        }
        .detail{
            position:relative;
            width:100%;
            height:500px;
            background:rgba(30,30,30,0.9);
            border-radius:20px;
            .logo{
                display:inline-block;
                position:absolute;
                top:40px;
                left:50%;
                transform:translate(-50%,0);
                width:60px;
                height:60px;
                background: url(../../../public/font/mc.jpeg);
                background-size: 106px 60px;
                background-position: -23px;
                border-radius: 5px;
            }
            .name{
                width:180px;
                font-size:15px;
                color:white;
                position:absolute;
                top:113px;
                text-align:center;
                left:50%;
                transform:translate(-50%,0);
                font-weight:700;
            }
            .rate{
                position: absolute;
                top: 132px;
                left: 50%;
                transform: translate(-50%,0);
                margin-bottom: 8px;
                display: inline-block;
                
                .star{
                    display: inline-block;
                }
                .ratingScore{
                    display: inline-block;
                    color: white;
                    font-size: 10px;
                    margin-left: 7px;
                }
            }
            .time{
                width:100%;
                line-height:26px;
                text-align:center;
                font-size:11px;
                color:#bababc;
                position:absolute;
                top:149px;
                left:50%;
                transform:translate(-50%,0);
            }
            .line{
                height:1px;
                width:calc(100% - 40px);
                position:absolute;
                top:212px;
                left:50%;
                transform:translate(-50%,0);
                box-sizing:border-box;
                background:rgba(186, 186, 188, 0.884);                
            }
            .discount{
                display:inline-block;
                font-weight:700;
                text-align:center;
                width:100%;
                color:white;
                position:absolute;
                top:222px;
                left:50%;
                transform:translate(-50%,0);
                p{
                    font-size:11px;
                    display: inline-block;
                    word-break:break-all;
                    line-height:16px;
                    img{
                        vertical-align: middle;
                        width:16px;
                        height:16px;
                        display: inline-block;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .search-wrapper{
        width: 100%;
        height: 57px;
        // background: black;
        position: relative;
        padding-top: 26px;
        box-sizing: border-box;
        
        .back-wrapper{
            width: 49px;
            height: 31px;
            position: absolute;
            color: white;
            text-align: center;
            line-height: 31px;
            top: 26px;
            left:0;
            z-index: 1;
        }

        .search{
            width: 100%;
            height: 31px;
            // background: pink;
            position: absolute;
            padding: 0 100px 0 49px;
            z-index: 2;
            box-sizing: border-box;
            .search-list{
                position:relative;
                width:90%;
                left:50%;
                transform:translate(-50%,0);
                // height:300px;
                max-height:300px;
                overflow:auto;
                background:rgba(255,255,255,0.9);
                z-index:2;
                border-radius:0 0 5px 5px;
                &::-webkit-scrollbar{
                    display: none;
                }
                li{
                    height:30px;
                    line-height:30px;
                    padding-left:10px;
                    font-size:15px;
                    border-bottom:1px solid rgb(180,180,180);
                    font-weight:700;
                    &:last-child{
                        border-bottom:none;
                    }
                    &:hover{
                        background:#ffd161;
                    }
                    a{
                        display:block;
                        height:100%;
                        width:100%;
                        color:#333333;
                        text-decoration:none;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
            }
            .search-icon{
                position: absolute;
                // width: 25px;
                // height: 31px;
                width: 14px;
                height: 14px;
                background:url(../../../public/font/titans_h5_search@2x.png) no-repeat;
                background-size: 14px 14px;
                z-index: 1;
                left:61px;
                top: 9px;
            }

            .search-bar{
                padding-left:29px;
                width: 100%;
                font-size: 13px;
                box-sizing: border-box;
                height: 31px;
                // background: palevioletred;
                border-radius: 25px;
                border: none;
                outline: none;
                &::placeholder{
                    color:lighten(#4e4e4e,25%);
                    padding-left: 5px;
                }
            }
        }
        
        .button-wrapper{
            overflow: hidden;
            width: 100px;
            height: 31px;
            // background:chocolate;
            position: absolute;
            top: 26px;
            right: 0;
            z-index:5;
            .spell{
                overflow: hidden;
                display: inline-block;
                text-align: center;
                margin-top: 5px;
                margin-left: 17px;
                border:1.5px solid white;
                width:30px;
                padding: 1px;
                font-size:13px;
                color: white;
                font-weight: 700;
            }
            .dots{
                overflow: hidden;
                margin-top: 5px;
                display: inline-block;
                margin-left: 14px;
                
                height: 17px;
                // border:1px solid white;
                width:27px;

                .dot{
                    margin-top: 2px;
                    border: 1.5px solid white;
                    width:5px;
                    height:5px;
                    border-radius: 50%;
                    float: left;
                    margin-right: 1px;
                }
            }
        }

    }

    .content-wrapper{
        .logo{
            display:inline-block;
            text-align:center;
            width:50px;
            height:50px;
            position: absolute;
            background: url(../../../public/font/mc.jpeg);
            background-size: 90px 50px;
            background-position: -20px;
            border-radius: 5px;
            left:10px;
            margin-top:17px;
        }

        .name{
            position:absolute;
            height:50px;
            line-height: 50px;
            margin-top: 17.5px;
            left:70px;
            color:white;
            font-weight: 700;
        }

        .star{
            float:right;
            margin-right:15px;

            .star_img{
                margin-left: 4px;
                margin-top: 25px;
                display:block;
                width:25px;
                height:25px;
                background:url("./star.png") no-repeat;
                background-size:50px 25px;
                background-position: -12.5px;
            }

            p{
                margin-top: 7px;
                color:white;
                font-weight: 700;
            }

            .star_active{
                margin-left: 4px;
                margin-top: 25px;
                display:block;
                width:25px;
                height:25px;
                background:url("./Star_icon_stylized.svg.png") no-repeat;
                background-size:25px 25px;
            }
        }
    }

    .posts-wrapper{
        position: absolute;
        bottom: 10px;
        width:100%;
        height:16px;
        // border:1px solid white;
        // padding-left: 10px;
        box-sizing: border-box;

        .posts-mark{
            z-index:3;
            position: absolute;
            height: 16px;
            width: 16px;
            background: url("http://p0.meituan.net/xianfu/019d1bbb1310b1531e6af6172c9a5095581.png");
            background-size:16px 16px;
            left: 10px;
        }
        .posts{
            cursor:pointer;
            font-weight:700;
            position:absolute;
            color:white;
            width:100%;
            // background: darkgrey;
            border:none;
            height:16px;
            font-size: 11px;
            line-height:16px;
            padding-left:31px;
            box-sizing:border-box;
        }

        .acts{
            right:0;
            position: absolute;
            width: 68px;
            height: 16px;
            line-height: 16px;
            // background: darkcyan;
            border:none;
            font-size:10px;
            margin-left: 15px;
            color:white;
            font-weight: 700;
            padding-left:8px;
            box-sizing: border-box;
            cursor:pointer;
            span{
                float: right;
                color: white;
                line-height: 16px;
                font-size: 18px;
            }
        }
    }

}

// animation/transition
.fade-enter,.fade-leave-to{
    opacity:0;
}
.fade-enter-active, .fade-leave-active{
    transition:opacity 0.6s;
}
</style>