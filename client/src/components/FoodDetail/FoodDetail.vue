<template>
    <transition name="slide">
        <div class="foodDetail" v-if="foodShow">
            <div class="upper-box">
                <div class="pic" :style="{background:'url('+food.picture+')' + ' no-repeat'}">
                    <div class="close" @click="closeView"></div>
                </div>
                <div class="desc">
                    <div class="foodName">
                        {{food.name}}
                    </div>
                    <div class="foodSell">
                        {{food.month_saled_content}}
                    </div>
                    <div class="foodPrice">
                        ${{food.min_price * 4}}
                        <span class="unit">/個</span>
                    </div>
                    <ShopControl class="control" :orders="food"></ShopControl>
                </div>
            </div>
            <Split></Split>
            <div class="lower-box">
                <div class="ratingInfo">
                    <div class="infoLeft" v-if="food.rating">
                        <div class="infoTitle">
                            {{food.rating.title}}
                        </div>
                        <div class="infoLike">
                            (
                            {{food.rating.like_ratio_desc}}
                            <span class="ratio">{{food.rating.like_ratio}}</span>
                            )
                        </div>
                    </div>
                    <div class="infoRight" v-if="food.rating">
                        <div class="infoNum">
                            {{foodCm}}
                        </div>
                        <span class="infoMark icon-keyboard_arrow_right"></span>
                    </div>
                </div>
                <ul v-if="food.rating.comment_list.length>0">
                    <li class="comment" v-for="comment in food.rating.comment_list">
                        <div class="top">
                            <div class="head" v-if="comment.user_icon" :style="{backgroundImage:'url('+comment.user_icon+')'}"></div>
                            <div class="anony" v-if="!comment.user_icon"></div>
                            <div class="info">
                                <div class="name">{{comment.user_name}}</div>
                                <div class="time">{{comment.comment_time}}</div>   
                            </div>
                        </div>
                        <p>{{comment.comment_content}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script lang='ts'>
import {Vue, Component,Prop} from "vue-property-decorator";
import ShopControl from "@/components/ShopControl/ShopControl.vue";
import Split from "@/components/Split/Split.vue";
@Component({
    components:{
        ShopControl,
        Split
    }
})
export default class FoodDetail extends Vue{
    @Prop(Object) readonly food: object;
    public foodShow: boolean = false;
    public showView(){
        this.foodShow = true;
    }
    public closeView(){
        this.foodShow = false;
    }
    get foodCm(){
        if(this.food.rating.snd_title=='暫無'){
            return this.food.rating.snd_title;
        }else if(this.food.rating.snd_title.length==4){
            if(this.food.rating.snd_title[0]>2){
                return '2條評論'
            }else{
                return this.food.rating.snd_title
            }
        }else if(this.food.rating.snd_title.length==5){
            return '2條評論'
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .foodDetail{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 51px;
        width: 100vw;
        background: white;
        z-index: 5;
        overflow:auto;
        &::-webkit-scrollbar {
                display: none;
            }
        .upper-box{
            max-width:100%;
            width:100vw;
            box-sizing:border-box;
            padding: 12px 10px 0px 10px;
            position: relative;
            .pic{
                box-sizing:border-box;
                width:100%;
                height:400px;
                background-size:100% 100%!important;
                .close{
                    background-image: url("icon_mergeAccount_close@3x.png");
                    height: 30px;
                    width: 30px;
                    background-size: 30px 30px;
                    cursor: pointer;
                }
            }
            .desc{
                height: 103px;
                // background: pink;
                width: 100%;
                
                .foodName{
                    font-size: 15px;
                    color: #333333;
                    line-height: 30px;
                    font-weight: 900;
                    margin-left: 6px;
                }
                .foodSell{
                    font-size: 11px;
                    color: #9d9d9d;
                    margin-left: 6px;
                }
                .foodPrice{
                    font-size: 17px;
                    color: #fb4e44;
                    margin-left: 6px;
                    margin-bottom: 16px;
                    margin-top: 20px;
                    display: inline-block;
                    
                    .unit{
                        font-size: 11px;
                        color: #9d9d9d;
                    }
                }
                .control{
                    position: absolute;
                    display: inline-block;
                    right: 14px;
                    bottom: 16px;
                    
                }
            }
        }
        .lower-box{
            width: 100%;
            overflow: auto;
            .ratingInfo{
                width: 100%;
                padding-top: 16px;
                padding-bottom: 16px;
                border-bottom: 1px solid #f4f4f4;
                display: inline-block;
                box-sizing: border-box;
                .infoLeft{
                    float: left;
                    margin-left: 16px;
                    line-height: 13px;
                    .infoTitle{
                        font-size: 13px;
                        display: inline-block;
                    }
                    .infoLike{
                        font-size: 11px;
                        display: inline-block;
                        .ratio{
                            font-size: 11px;
                            color: #fb4e44;
                        }
                    }
                }
                .infoRight{
                    float: right;
                    margin-right: 16px;
                    line-height: 13px;
                    // overflow:hidden;
                    
                    .infoNum{
                        font-size: 13px;
                        color: #9d9d9d;
                        display: inline-block;
                        margin-right: 12px;
                    }
                    .icon-keyboard_arrow_right{
                        font-size: 13px;
                        color: #9d9d9d;
                        display: inline-block;
                        line-height: 13px;
                        transform:translateY(1px);
                    }
                }
            }
            .comment{
                box-sizing:border-box;
                width:100%;
                padding:15px 14px 17px 14px;
                background:white;
                border-bottom:1px solid #f4f4f4;
                &:last-child{
                    border-bottom:none;
                }
                .top{
                    width:100%;
                    display:flex;
                    .head{
                        flex:0 0 41px;
                        border-radius:50%;
                        height:41px;
                        width:41px;
                        background-size:100% 100%!important;
                        margin-right:10px;
                    }
                    .anony{
                        flex:0 0 41px;
                        border-radius:50%;
                        height:41px;
                        width:41px;
                        background-size:100% 100%!important;
                        margin-right:10px;
                        background-image: url('anonymity.png');
                    }
                    .info{
                        flex:1;
                        .name{
                            font-weight:600;
                            font-size:12px;
                            height:100%;
                            float:left;
                            line-height:41px;
                        }
                        .time{
                            color:#666666;
                            font-size:10px;
                            height:100%;
                            float:right;
                            line-height:41px;
                        }
                    }
                }
                p{
                    margin-top:17px;
                    padding-left:51px;
                }
                
            }
        }
    }
    .slide-enter, .slide-leave-to{
        transform: translateX(800px);
    }
    .slide-enter-active, .slide-leave-active{
        transition: all 0.5s linear;
    }
    @media (min-width:654px){
        .pic{
            height:600px!important;
        }
    }
    @media (min-width:900px){
        .pic{
            width:66%!important;
            margin:0 auto;
        }
    }
</style>