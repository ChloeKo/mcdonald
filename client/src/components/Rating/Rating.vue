<template>
    <div class="ratingPage">
        <div class="tRating">
            <div class="left">
                <div class="avg">
                    <span class="avg_score">{{((getData.data.quality_score+getData.data.pack_score)/2).toFixed(1)}}</span>
                    <span class="text">商家評分</span>
                </div>
                <div class="did">
                    <div class="taste">
                        <span>口味</span>
                        <Star :score="getData.data.quality_score"></Star>{{getData.data.quality_score}}
                    </div>
                    <div class="wrap">
                        <span>包裝</span>
                        <Star :score="getData.data.pack_score"></Star>{{getData.data.pack_score}}
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="deScore">
                    {{getData.data.delivery_score}}
                </div>
                <div class="deText">
                    配送評分
                </div>
            </div>
        </div>
        <Split class="split"></Split>
        <div class="bRating">
            <ul class="ratingNav">
                <li class="allR" :class="{'active': show==0}" @click="nav(0)">
                    {{getData.data.tab[0].comment_score_title}}
                </li>
                <li class="picR" :class="{'active': show==5}" @click="nav(5)">
                    {{getData.data.tab[1].comment_score_title}}
                </li>
            </ul>
            
            <div class="scroll">
                <ul class="ratingLabel">
                    <li class="labels">
                        {{getData.data.comment_score_type_infos[0].comment_score_title}}{{getData.data.comment_score_type_infos[0].total_count}}
                    </li>
                    <li class="labels bad">
                        {{getData.data.comment_score_type_infos[1].comment_score_title}}{{getData.data.comment_score_type_infos[1].total_count}}
                    </li>
                    <li class="labels" v-for="(label, num) in getData.data.labels" :key="num" :class="{'bad': isBad(label.label_star)}">
                        {{label.content}}{{label.label_count}}
                    </li>
                </ul>
                <ul v-if="getData.data.comment_num>0" class="comments">
                    <li class="comment" v-for="(comment, index) in getComment" :key="index">
                        <div class="top">
                            <div class="head" v-if="comment.user_pic_url" :style="{backgroundImage:'url('+comment.user_pic_url+')'}"></div>
                            <div class="anony" v-if="!comment.user_pic_url"></div>
                            <div class="info">
                                <div class="name">{{comment.user_name}}</div>
                                <div class="time">{{formatDate(comment.comment_time)}}</div>   
                            </div>
                            <div class="star">
                                <span class="text">
                                    評分
                                </span>
                                <Star class="starScore" :score="comment.order_comment_score"></Star>
                            </div>
                        </div>
                        
                        <div class="Rcontent">
                            {{comment.comment}}
                        </div>
                        <img v-for="pic in comment.comment_pics" :src="pic.thumbnail_url" :key="pic.url">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue,Component} from "vue-property-decorator";
    import Split from "@/components/Split/Split.vue";
    import Star from "@/components/Star/Star.vue";
    @Component({
        components: {
            Split,
            Star
        }
    })
    export default class Rating extends Vue{
        private show: number = 0;
        get getData(){
            return this.$store.getters.getRatings
        }
        get getComment(){
            if(this.show == 0){
                return this.$store.getters.getRatings.data.comments
            }else{
                return this.$store.getters.getRatings.data.comments.filter(c=>c.comment_pics.length>0)
            }
        }
        private isBad(labelStar){
            if(labelStar == 0){
                return true;
            }else{
                return false;
            }
        }
        private formatDate(time){
            let date = new Date(time * 1000);
            let fmt = 'yyyy.mm.dd';

            if(/(y+)/.test(fmt)){
                let year = date.getFullYear().toString();
                fmt = fmt.replace(RegExp.$1, year);
            }
            if(/(m+)/.test(fmt)){
                let month = (date.getMonth() + 1).toString();
                if(parseInt(month) < 10){
                    month = '0' + month;
                }
                fmt = fmt.replace(RegExp.$1, month);
            }
            if(/(d+)/.test(fmt)){
                let day = (date.getDate()).toString();
                if(parseInt(day) < 10){
                    day = '0' + day;
                }
                fmt = fmt.replace(RegExp.$1, day);
            }

            return fmt;
        }
       
        nav(type){
            this.show = type;
        }
    }
</script>

<style lang="scss" scoped>
.ratingPage{
    position: absolute;
    top:220px;
    bottom: 0;
    width:100%;
    .tRating{
        padding: 20px 26px 18px 26px;
        box-sizing: border-box;
        display: flex;
        height: 80px;
        .left{
            // background: red;
            flex: 1;
            .avg{
                float: left;
                margin-right: 28px;
                .avg_score{
                    // text-align: center;
                    display: block;
                    font-weight: 800;
                    font-size: 23px;
                    line-height: 23px;
                    width: 47px;
                    color:#ffb000;
                }
                .text{
                    color:#666666;
                    font-size: 11px;
                    line-height: 11px;
                }
            }
            .did{
                float: left;
                color:#666666;
                font-size: 12px;
                margin-top: 2px;
                .taste{
                    height: 12px;
                    margin-bottom: 14px;
                    span{
                        margin-right: 11px;
                    }
                    .Star{
                        display: inline-block;
                        height: 11px;
                        margin-right: 11px;
                    }
                }
                .wrap{
                    height: 12px;
                    span{
                        margin-right: 11px;
                    }
                    .Star{
                        display: inline-block;
                        height: 11px;
                        margin-right: 11px;
                    }
                }
            }
        }
        .right{
            flex: 0 0 74px;
            color: #999999;
            text-align: right;
            border-left: 1px solid #e4e4e4;
            .deScore{
                font-size: 18px;
                margin: 3px 8px 10px 0px;
                line-height: 18px;
            }
            .deText{
                font-size: 11px;
                line-height: 11px;
            }
        }
    }
    .split{
        position: absolute;
        top: 80px;
    }
    .bRating{
        box-sizing: border-box;
        width: 100%;
        
        
        .ratingNav{
            list-style: none;
            position: absolute;
            left:16px;
            right: 16px;
            height: 36px;
            top: 105px;
            border: 1px solid #ffd161;
            border-radius: 3px;
            // box-sizing: border-box;
            
            li{
                float: left;
                box-sizing: border-box;
                line-height: 36px;
                text-align: center;
                font-size: 14px;
            }
            .allR{
                border-right: 1px solid #ffd161;
                height: 36px;
                width: 50%;
                color: #ffb000;
                
            }
            .picR{
                height: 36px;
                width: 50%;
                color: #ffb000;
                
            }
            .active{
                background: #ffd161;
                color: black;
            }
        }
        .scroll{
            overflow-y: auto;
            overflow-x:hidden ;
            position: absolute;
            top: 150px;
            bottom: 0px;
            width: 100%;
            &::-webkit-scrollbar {
                display: none;
            }

            .ratingLabel{
                list-style: none;
                position: absolute;
                top: 0px;
                left: 16px;
                right: 16px;
                
                
                .labels{
                    background: #f4f4f4;
                    color: #656565;
                    display: inline-block;
                    font-size: 12px;
                    padding: 9px 10px 9px 10px;
                    margin-right: 6px;
                    margin-bottom: 6px;
                }
                .bad{
                    color: #999999;
                }
            }
            .comments{
                
                position: absolute;
                bottom: 0px;
                top:80px;
                width: 100%;
                
                .comment{
                    
                    position: relative;
                    box-sizing:border-box;
                    width:100%;
                    padding:16px 15px 16px 15px;
                    background:white;
                    border-bottom:1px solid #f4f4f4;
                    &:last-child{
                        border-bottom:none;
                    }
                    .top{
                        width:100%;
                        display:flex;
                        .head{
                            flex:0 0 35px;
                            border-radius:50%;
                            height:35px;
                            width: 35px;
                            background-size:100% 100%!important;
                            margin-right:11px;
                            display: inline-block;
                        }
                        .anony{
                            flex:0 0 35px;
                            border-radius:50%;
                            height:35px;
                            width: 35px;
                            background-size:100% 100%!important;
                            margin-right:11px;
                            background-image: url('anonymity.png');
                        }
                        .info{
                            // flex:1;
                            height: 11px;
                            display: inline-block;
                            width: 100%;
                            margin-top: 0px;
                            .name{
                                font-weight:600;
                                font-size:11px;
                                float:left;
                                line-height:11px;
                            }
                            .time{
                                color:#999999;
                                font-size:9px;
                                float:right;
                                line-height:9px;
                            }
                        }
                        .star{
                            left: 60px;
                            width: 100%;
                            height: 11px;
                            line-height: 11px;
                            position: absolute;
                            top: 39px;
                            .text{
                                color: #999999;
                                font-size: 11px;
                                display: inline-block;
                                margin-right: 7px;
                            }
                            .starScore{
                                display: inline-block;
                            }
                        }
                    }
                    .Rcontent{
                        margin-top: 15px;
                        margin-left: 45px;
                        margin-right: 7px;
                    }
                    img{
                        display: inline-block;
                        width: 80px;
                        height: auto;
                        margin-left: 45px;
                    }
                }
            }
        }
    }
}
@media (max-width:338px){
    .avg{
        margin-right:12px!important;
    }
}
</style>