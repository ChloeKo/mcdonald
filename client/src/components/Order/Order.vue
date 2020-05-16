<template>
    <div class="order">
        <div class="content" @mouseenter.once="getOffset">
            <div class="decorate">
                <div class="bar1"></div>
                <div class="bar2"></div>
            </div>
            <div class="contentNav">
                <ul class="Nav">
                    <li class="active"> 
                        <a href="#專場" @click.prevent="ScrollTo($event,orders.container_operation_source.tag_name)">
                            <i class="icon" v-if="orders.container_operation_source.tag_icon" 
                               :style="{background:'url(' + orders.container_operation_source.tag_icon + ')'}"
                               ></i>
                            {{orders.container_operation_source.tag_name}}
                        </a>
                    </li>
                    <li v-for="(title,index) in orders.food_spu_tags" :key="index" @click.prevent="ScrollTo($event,title.name)">
                        <a :href="'#' + title.name" >
                            <i class="icon" v-if="title.icon" :style="{background:'url('+ title.icon+')'}"></i>
                            {{title.name}}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="contentGoods" @scroll="scrollHandle($event);">
                <div class="topGoods" id="專場"> 
                    <div class="bar"></div>
                    <div class="Img1"></div>
                    <div class="Img2"></div>
                </div>
                <div class="mainGoods">
                    <div class="topic" v-for="(item, num) in orders.food_spu_tags" :key="num">
                        <span class="topicMark"></span>
                        <p class="topicText" :id="item.name">{{item.name}}</p>
                        <ul class="goods" v-for="(detail, index) in item.spus" :key="index">
                            <li class="goodsItem" @click="decideView(detail)">                             
                                <div class="goodsImg" :style="{backgroundImage:'url(' + getImage(detail.picture) + ')'}"></div>
                                <div class="goodsText">
                                    <p class="goodsName"><strong :id="detail.name">{{detail.name}}</strong></p>
                                    <p class="goodsSells">月售{{detail.month_saled}}  讚{{detail.praise_num}}</p>
                                    <p class="goodsPrice">＄{{detail.min_price * 4}}
                                    <span>/個</span>
                                    </p>
                                </div>
                                <div>
                                    <ShopControl :orders="detail"></ShopControl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <FoodDetail ref="foodView" :food="fd"></FoodDetail>
        
        <Shopcart :orders="orders"></Shopcart>
    </div>
</template>

<script lang="ts">
    import {Vue,Component,Watch} from "vue-property-decorator";
    import Shopcart from '@/components/Shopcart/Shopcart.vue';
    import ShopControl from '@/components/ShopControl/ShopControl.vue';
    import FoodDetail from '@/components/FoodDetail/FoodDetail.vue';
    @Component({
        components:{
            Shopcart,
            ShopControl,
            FoodDetail
        }
    })
    
    export default class Order extends Vue{
        private isShow:boolean = false;
        private orders:object = {};
        private offset:Array<number> = [];
        private fd: object = {};
        // private isClick: boolean = false;
        // private isScroll: boolean = false;
        
        
        get getData(){
            return this.$store.getters.getOrders.data;
        }
        private created(){
            this.orders = this.getData;
            this.isShow = true;       
        }
        private mounted(){
            this.getOffset();
        }
        private getImage(i){
            return i;
        }
        private changeNav(event){
            const lists = event.target.parentElement.parentElement.getElementsByClassName('active');
            lists.forEach(element => {
                element.className = "";
            });
            let changeId = 'active';
            event.target.parentElement.className += changeId;
            
        }
        private changeNavByScroll(index){
            const active = document.querySelectorAll('.contentNav .active');
            for(let i=0;i<active.length;i++){
                active[i].className = "";
            }
            const lists = document.querySelectorAll('.contentNav li');
            lists[index+1].className = 'active';
            
            // const contentNav = document.querySelector('.contentNav');
            // let topNav = document.querySelector('.nav').offsetTop;
            // topNav += 40;
            
            // let scroll = document.querySelector('.contentNav .active').offsetTop + 220;
            // let toHere = window.innerHeight / 2;
            
            
            // if(scroll > (window.innerHeight-80)){
            //     if(this.isClick == false){
            //         contentNav.scrollTo(0, toHere);
            //         this.isScroll = false;
            //         this.isClick = false;
            //     }
            //     if(this.isScroll == true){
            //         this.isClick = true;
            //     }
            // }else if((scroll-220) < topNav){
            //     if(this.isClick == false){
            //         contentNav.scrollTo(0, 0);
            //         this.isScroll = false;
            //         this.isClick = false;
            //     }
            //     if(this.isScroll == true){
            //         this.isClick = true;
            //     }
            // }else{
            //     this.isClick = false;
            // }
            
              
        }
        private scrollHandle(event){
            const goods = document.querySelector('.contentGoods');
            
            for(let i=0;i<10;i++){
                if(i<9){
                    if((this.offset[this.offset.length-i-1]<goods.scrollTop)&&(goods.scrollTop < this.offset[this.offset.length-i-2])){
                        this.changeNavByScroll(i-1);
                    }
                }else if(i=9){
                    if((this.offset[this.offset.length-i-1]<goods.scrollTop)){
                        this.changeNavByScroll(i-1);
                    }  
                }
             }                
        }
            
        
        private getOffset(){
            this.offset = [];
            const hot = document.querySelectorAll('.topic');
            
            for(let i=8;i>=0;i--){
                this.offset.push(hot[i].offsetTop-10)
            }
            this.offset.push(0)
        }

        public decideView(detail){
            this.fd = detail;
            this.$refs.foodView.showView();
        }

        private ScrollTo(e,name){
            // this.isClick = true;
            const content = document.querySelector('.contentGoods');
            const target = document.querySelector(`#${name}`);
            if (navigator.vendor == "Apple Computer, Inc.") {
                e.preventDefault();
                let current:number = content.scrollTop;
                let top: number = 0;
                top = current;
                const timer = setInterval(()=>{
                    if(current < target.offsetTop){
                        if(Math.floor(top/10) >= Math.floor((target.offsetTop)/10)){
                            clearInterval(timer);
                        }
                        content.scrollTo(0,top);
                        top+=50;
                    }else{
                        if(Math.floor(top/10) <= Math.floor((target.offsetTop+30)/10)){
                            clearInterval(timer);
                        }
                        content.scrollTo(0,top);
                        top-=50;
                    }
                    
                    
                },1)
            }else{
                content.scrollTo(0, target.offsetTop);
            }
            

        }
        
    }

</script>

<style lang="scss" scoped>
    .order{
        overflow:hidden;
    }
    .content{
        overflow:hidden;
        position: absolute;
        top:221px;
        bottom: 51px;
        width:100%;
        display: flex;
        .decorate{
            right:0;
            z-index: -5;
            width:200px;
            position: absolute;
            top:0px;
            bottom: 0px;
            background: #dc0106;
            .bar1{
                margin-left: 20px;
                display: inline-block;
                width: 30px;
                height: 100%;
                background: rgb(248, 198, 3);
            }
            .bar2{
                display: inline-block;
                margin-left: 50px;
                width: 30px;
                height: 100%;
                background: rgb(248, 198, 3);
            }
        }
        .contentNav{
            overflow: auto;
            height: 100%;
            background:#f4f4f4;
            width: 88px;
            scroll-behavior: smooth;
            .Nav{
                list-style: none;
                .active{
                    background: white;
                }
                li{
                    cursor: pointer;
                    border-bottom:1px solid lighten(#e4e4e4,3%);
                    font-weight:500;
                    color:#333333;
                    padding: 10px;
                    height:48px;
                    line-height:48px;
                    a{  
                        margin-left: -5px;
                        overflow: hidden;
                        font-size:13px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-decoration: none;
                        color:#333333;
                        width: 99%;
                        height: 100%;
                        display: inline-block;
                    }
                    .icon{
                        display:inline-block;
                        width:13px;
                        height:13px;
                        background-size:13px 13px!important;
                    }
                }
            }
        }


        .contentGoods{
            scroll-behavior: smooth;
            // background: olive;
            height: 100%;
            overflow: auto;
            padding: 25px 11px 0px 11px;
            flex: 1;
            box-sizing: border-box;
            .topGoods{
                // height: 201px;
                border-bottom: 1px solid #e4e4e4;
                .bar{
                    height: 50px;
                    background: darken(#43341B, 5%);
                    margin-bottom: 10px;
                    border-radius: 5px;
                }
                .Img1{
                    height:90px;
                    margin-bottom: 11px;
                    border-radius: 5px;
                    background:lighten(#CAAD5F, 20%) url("./mc.png") no-repeat;
                    background-size: 100% 100%;
                }
                .Img2{
                    border-radius: 5px;
                    margin-bottom: 11px;
                    background:lighten(#A28C37, 10%) url("https://upload.wikimedia.org/wikipedia/commons/b/b4/McCaf%C3%A9_logo.svg") no-repeat; 
                    background-size: 100% 100%;
                    height: 90px;
                }
            }
            .mainGoods{
                padding-top: 10px;
                height: 205px;
                .topic{
                    padding-top: 0px;
                    .topicMark{
                        display:inline-block;
                        width:2px;
                        height:10px;
                        background: url(./btn_yellow_highlighted@2x.png);
                        background-size: 2px 10px;
                        margin-right: 3px;
                    }
                    .topicText{
                        display:inline-block;
                        font-size: 13px; 
                        margin-bottom: 12px;
                    }
                }
                .goods{
                    list-style: none;
                    margin-top: 12px;
                    margin-left: 8px;
                    .goodsItem{
                        position: relative;
                        cursor: pointer;
                        display: flex;
                        height: 90px;
                        .shopButton{
                            bottom: 22px;    
                            right: -1px;
                        }
                         .goodsImg{
                             flex: 0 0 63px;
                             background-size: 120% 100%;
                             background-position: center;
                             height: 55px;
                             margin-right: 20px;
                         }
                         .goodsText{
                             .goodsName{
                                 font-size: 16px;
                                 line-height: 21px;
                                 color: #333333;
                                 margin-bottom: 5px;
                             }
                             .goodsSells{
                                 font-size: 10px;
                                 color: #bfbfbf;
                             }
                             .goodsPrice{
                                 font-size: 15px;
                                 color: #fb4e44;
                                 font-weight: 900;
                                 margin-top: 3px;
                                 span{
                                     color: #bfbfbf;
                                     font-size: 10px;
                                 }
                             }
                         }
                    }
                }
            }
        }
    }
@media (max-width : 630px){
    .decorate{
        display: none;
    }
}
@media (min-width:500px){
    .topGoods{
        // height:261px!important;
        margin: 0 50px 0 50px;
        .Img1,.Img2{
            height:100px!important;
            background-size: 100% 100%!important;
        }
    }
}
@media (min-width : 750px){
    .topGoods{
        // height:261px!important;
        margin: 0 70px 0 70px;
        .Img1,.Img2{
            height:160px!important;
            background-size: 100% 100%!important;
        }
    }
    .contentGoods{
        padding: 25px 26px 0px 26px!important;
    }
}
@media (min-width : 900px){
    .topGoods{
        // height:301px!important;
        margin: 0 90px 0 90px;
        .Img1,.Img2{
            height:170px!important;
            background-size: 100% 100%!important;
        }
    }
    .contentGoods{
        padding: 25px 32px 0px 32px!important;
    }
    .decorate{
        width:300px!important;
        .bar1{
            margin-left: 30px!important;
            width: 40px!important;
        }
        .bar2{
            margin-left: 60px!important;
            width: 40px!important;
        }
}
    }
    
@media (min-width : 1050px){
    .topGoods{
        // height:361px!important;
        margin: 0 110px 0 110px;
        .Img1,.Img2{
            height:210px!important;
            background-size: 100% 100%!important;
        }
    }
    .contentGoods{
        padding: 25px 38px 0px 38px!important;
    }
}
@media (min-width : 631px){
    .goodsItem{
        .shopButton{
        right:200px!important;
    }
    }
    
}
@media (min-width : 900px){
    .goodsItem{
        .shopButton{
        right:300px!important;
    }
    }
}
.contentNav::-webkit-scrollbar {
    display: none;
}
.contentGoods::-webkit-scrollbar{
    display: none;
}

</style>