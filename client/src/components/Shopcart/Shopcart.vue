<template>
        <div class="shopCart">
            <!-- <transition name="easterEgg"> -->
            <EasterEgg v-if="isShow" @closeTag="closeTag" @animate="animate"></EasterEgg>
            
            <Animation v-if="isAnimate" @closeAnimate="closeAnimate"></Animation>
            <!-- </transition> -->
            <div class="blackBack" v-if="isList" @click="isBack"></div>
            <div class="leftShop">
                <div class="buttonShop" :class="{'highlight':getAmount>0}" @click="isLists">
                    <span class="icon-shopping_cart" :class="{'highlight':getAmount>0}">
                    </span>
                    <i v-if="getAmount>0" class="itemNum">
                        {{getAmount}}
                    </i>
                </div>
                <p class="totalPrice" v-if="getAmount>0">
                    ${{getPrice}}
                </p>
                <p class="descShop" :class="{'hightlight': getAmount>0}">
                    {{orders.poi_info.shipping_fee_tip}}
                </p>
            </div>
            <div class="rightShop" :class="{'highlight':getAmount>0}" @click="showEgg">
                <p class="priceTip">
                    {{orderCheck}}
                </p>
            </div>
            <div class="shop-list" v-if="isList">
                <div class="top">{{orders.poi_info.discounts2[0].info}}</div>
                <div class="header">
                    <div class="hd-left">1號購物車</div>
                    <div @click="clear" class="hd-right">
                        <img src="./ash_bin.png"/>
                        清空購物車
                    </div>
                </div>
                <ul class="contents">
                    <template v-for="(tags, index) in orders.food_spu_tags">
                        <li class="conItem" v-for="food in tags.spus" :key="food.name" v-if="food.count>0">
                            <div class="itemLeft">
                                <h3 class="itemName">{{food.name}}</h3>
                                <span class="itemNum">個</span>
                                <div class="itemPrice">${{food.min_price * 4}}</div>
                            </div>
                            <div class="itemRight">
                                <ShopControl :orders="food"></ShopControl>
                            </div>
                        </li>
                    </template>
                </ul>
            <div class="bottom"></div>
        </div>
    </div>
  
</template>

<script lang='ts'>
import {Vue, Component, Prop, Emit} from "vue-property-decorator";
import ShopControl from "../ShopControl/ShopControl.vue";
import EasterEgg from "@/components/EasterEgg/EasterEgg.vue";
import Animation from '@/components/Animation/Animation.vue';
@Component({
    components: {
        ShopControl,
        EasterEgg,
        Animation
    }
})
export default class Shopcart extends Vue{
    @Prop(Object) readonly orders:object;
    private isList: boolean = false;
    private counter: number = 0;
    private isShow: boolean = false;
    private isAnimate:boolean = false;
    private updated(){
        if(this.getAmount == 0){
            this.isList = false;
        }
    }
    get getAmount(){
        let sum = 0;
        this.orders.food_spu_tags.forEach((s)=>{
            s.spus.forEach((f)=>{
                if(f.count){
                    sum += f.count;
                }
            })
        })
        return sum;
    }

    get getFoods(){
        let foods = [];
        this.orders.food_spu_tags.forEach((s)=>{
            s.spus.forEach((f)=>{
                if(f.count > 0){
                    foods.push(f);
                }
            })
        })
        return foods;
    }

    get orderCheck(){
        if(this.getAmount > 0){
            return '結帳吧'
        }else{
            return this.orders.poi_info.min_price_tip
        }
    }

    get getPrice(){
        let total = 0;
        this.orders.food_spu_tags.forEach((s)=>{
            s.spus.forEach((f)=>{
                if(f.count){
                    total += f.count * f.min_price * 4;
                }
            })
        })
        return total;
    }

    private showEgg(){
        if(this.getAmount > 0){
            this.isShow = true;
        }else{
            this.isShow = false;
        }
    }

    private isLists(){
        if(this.getAmount > 0){
            this.counter++;
            this.isList = true;
            if((this.counter%2) ==0){
                this.isList = false;
            }
        }else{
            this.isList = false;
        }
    }
    
    private isBack(){
        this.counter++;
        this.isList = !this.isList;
    }

    private clear(){
        this.orders.food_spu_tags.forEach((s)=>{
            s.spus.forEach((f)=>{
                if(f.count){
                    f.count = 0;
                    this.counter = 0;
                    this.isLists();
                }
            })
        })
    }

    @Emit()
    closeTag(){
        this.isShow = false;
    }
    @Emit()
    animate(){
        this.isShow = false;
        this.isAnimate = true;
    }
    @Emit()
    closeAnimate(){
        this.isAnimate = false;
    }
}

</script>

<style lang='scss' scoped>
.shopCart.highlight{
    background: #2d2b2a;
}
.shopCart{
    z-index:6;
    width: 100%;
    height: 51px;
    display: flex;
    background: #514f4f;
    position: fixed;
    bottom: 0;
    left: 0;
    
    .blackBack{
        position:absolute;
        bottom:0;
        height: 100vh;
        width: 100vw;
        background: rgba(7, 17, 17, 0.6);
        z-index: -1;
    }
    .leftShop{
        flex: 1;
        .buttonShop{
            cursor: pointer;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            background: #666666;
            position: absolute;
            left: 10px;
            top: -14px;
            text-align: center;
            z-index:1;
            .icon-shopping_cart{
                line-height: 50px;
                font-size: 29px;
                color: #c4c4c4;
            }
            .itemNum{
                position: absolute;
                top: 0;
                right: 0;
                height: 15px;
                width: 15px;
                border-radius: 50%;
                font-size: 9px;
                background: red;
                color: white;
                line-height: 15px;
                text-align: center;
            }
        }
        .buttonShop.highlight{
            background: #ffd161;
            .icon-shopping_cart{
                color:#2d2b2a;
            }
        }
        .totalPrice{
            margin-left: 71px;
            width: 44px;
            height: 32px;
            line-height: 32px;
            font-size: 18px;
            text-align: center;
            color: white;
        }
        .descShop{
            font-size: 12px;
            color: #bab9b9;
            margin-left: 71px;
            line-height: 50px;
        }
        .descShop.hightlight{
            line-height: 0px;
            margin-top: 4px;
        }
    }
    .rightShop{
        flex: 0 0 110px;
        .priceTip{
            text-align: center;
            font-size: 15px;
            color: #bab9b9;
            line-height: 50px;
        }
    }
    .rightShop.highlight{
        cursor: pointer;
        background:#ffd161;
        .priceTip{
            color:#2d2b2a!important;
        }
    }
    .shop-list{
        box-sizing: border-box;
        width:100%;
        max-height: 431px;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        bottom: 51px;
        z-index: 0;
        &::-webkit-scrollbar {
            display: none;
        }
        .top{
            background: #f3e6c6;
            height:30px;
            line-height: 30px;
            font-weight: 600;
            width:100%;
            color:#646158;
            font-size:11px;
            text-align: center;
        }
        .header{
            width:100%;
            height:30px;
            background: #f4f4f4;
            .hd-left{
                height:100%;
                float: left;
                border-left: 4px solid #53c123;
                padding-left: 6px;
                color:#646158;
                font-weight: 600;
                font-size:11px;
                line-height: 30px;
            }
            .hd-right{
                cursor:pointer;
                padding-right: 10px;
                height:100%;
                float: right;
                color:#646158;
                font-weight: 600;
                font-size:11px;
                line-height: 30px;
                img{
                    height:12px;
                }
            }
        }
        .contents{
            width: 100%;
            list-style: none;
            background: white;
            .conItem{
                list-style: none;
                width: 100%;
                height: 60px;
                box-sizing: border-box;
                border-bottom: 1px solid #f4f4f4;
                padding: 12px 12px 10px 12px;
                display: flex;
                .itemLeft{
                    position: relative;
                    width: 200px;
                    height: 38px;
                    float: left;
                    margin-bottom: 0px;
                    flex: 1;
                    .itemName{
                        font-size: 16px;
                        width: 168px;
                        display: inline-block;
                        overflow : hidden;
                        text-overflow : ellipsis;
                        white-space : nowrap;
                    }
                    .itemNum{
                        height: 13px;
                        width: 13px;
                        font-size: 12px;
                        display: inline-block;
                        color: #b4b4b4;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                    }
                    .itemPrice{
                        font-size: 17px;
                        // width: 25px;
                        margin-right:6px;
                        height: 37px;
                        line-height: 37px;
                        // display: inline-block;
                        float: right;
                    }
                }
                .itemRight{
                    position: relative;
                    float: right;
                    // width: 83px;
                    height: 100%;
                    flex: 0 0 84px;
                    .shopButton{
                        right:0;
                        top: 6px;
                    }
                }  
            }
        }
        .bottom{
            width:100%;
            height:11px;
            background:#f4f4f4;
            border-left:4px solid #ffd161;
            box-sizing: border-box;
        }
    }
}

</style>