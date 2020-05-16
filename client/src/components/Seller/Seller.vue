<template>
    <div class="seller">
        <ul class="back">
            <li v-for="(n,index) in 50" :key="index"></li>
        </ul>
        <Split></Split>
        
        <div class="seller_top">
            <div class="contact">
                <div class="address-wrapper">
                    <div class="add_pic"></div>
                    <div class="add_text">{{getData.address}}</div>
                </div>
                <div class="phone-line">
                    <div class="phone"></div>
                </div>
            </div>
            
            <div class="photo-list">
                <ul>
                    <li v-for="url in getData.poi_env.thumbnails_url_list" :key="url">
                        <img :src="url">
                    </li>
                </ul>
            </div>

        </div>

        <Split></Split>
        
        <div class="seller_center">
            <div class="deli_service">
                <div class="deli_pic">

                </div>
                <div class="deli_text">
                    配送服務：{{getData.app_delivery_tip}}
                </div>
            </div>
            <div class="deli_time">
                <div class="time_pic">

                </div>
                <div class="time_text">
                    配送時間：{{getData.shipping_time}}
                </div>
            </div>
        </div>

        <Split></Split>
        
        <div class="seller_bottom">
            <div class="shop_service">
                <div class="service_left">
                    <div class="left_pic">

                    </div>
                    <div class="left_text">
                        商家服務
                    </div>
                    
                </div>
                <div class="service_right">
                    <div class="right_pic" :style="{backgroundImage:'url('+getData.poi_service[0].icon+')'}">

                    </div>
                    <div class="right_text">
                        可開發票
                    </div>
                </div>
            </div>
            <div class="shop_tips">
                <div class="tips_pic" :style="{backgroundImage: 'url('+getData.discounts2[0].icon_url+')'}">
                    
                </div>
                <div class="tips_text">
                    {{getData.discounts2[0].info}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Vue,Component} from "vue-property-decorator";
    import Split from "@/components/Split/Split.vue";
    @Component({
        components: {
            Split
        }
    })
    export default class Seller extends Vue{
        get getData(){
            return this.$store.getters.getSellers.data;
        }
    }
</script>

<style lang="scss" scoped>
.seller{
    width:100%;
    background:#f4f4f4;
    position: absolute;
    top:220px;
    bottom: 0;
    overflow: auto;
    &::-webkit-scrollbar{
        display:none;
    }
    .back{
        position:absolute;
        z-index: -1;
    }
    .seller_top{
        background:white;
        .contact{
            display: flex;
            padding:16px 0 16px 16px;
            box-sizing: border-box;
            .address-wrapper{
                position:relative;
                flex:1;
                .add_pic{
                    margin:auto 0 auto 0;
                    background: url('./address.png');
                    background-size: 16px 16px;
                    display: inline-block;
                    width:16px;
                    height:16px;
                    position: absolute;
                    top:50%;
                    transform:translate(0,-50%);
                }
                .add_text{
                    font-size:16px;
                    display: inline-block;
                    width:calc(100% - 27px);
                    margin-left:27px;
                }
            }
            .phone-line{
                flex:0 0 61px;
                background-image: url('./line.png');
                background-repeat: no-repeat;
                background-position: left center;
                background-size:1px 15px;
                position:relative;
                .phone{
                    cursor:pointer;
                    position:absolute;
                    top:50%;
                    transform:translate(0,-50%);
                    display:inline-block;
                    background:url('./phone.png') no-repeat;
                    background-size:cover;
                    width:19px;
                    height:19px;
                    margin-left: 21px;
                }
            }
        }
        .photo-list{
            // height:200px;
            overflow: auto;
            padding: 10px 0;
            &::-webkit-scrollbar{
                    display:none;
                }
            ul{
                margin-left:15px;
                white-space: nowrap;
                list-style:none;
                li{
                    display: inline-block;
                    height:75px;
                    img{
                        height:75px;
                        width:94px;
                        margin-right:11px;
                    }
                }
            }
        }
    }
    .seller_center{
        background:white;
        .deli_service{
            width: 100%;
            border-bottom: 1px solid #e4e4e4;
            position: relative;
            
            .deli_pic{
                background: url("delivery.png");
                width: 13px;
                height: 15px;
                background-size: 13px 15px;
                display: inline-block;
                position: absolute;
                top: 15px;
                left: 12px;
            }
            .deli_text{
                display: inline-block;
                font-size: 15px;
                line-height: 15px;
                margin: 15px 0px 15px 40px;
            }
            
        }
        .deli_time{
            position: relative;
            padding:15px 0px 20px 40px;
            .time_pic{
                background: url("time.png");
                width: 15px;
                height: 15px;
                background-size: 15px 15px;
                position: absolute;
                top: 50%;
                transform: translate(0,-50%);
                left: 12px;
            }
            .time_text{
                font-size: 15px;
                line-height: 15px;
                // margin:15px 0px 20px 40px;
            }
        }
    }
    .seller_bottom{
        background:white;
        .shop_service{
            border-bottom: 1px solid #e4e4e4;
            position: relative;
            .service_left{
                display: inline-block;
                padding: 15px 0px 15px 40px;
                .left_pic{
                    position: absolute;
                    background: url("server.png");
                    background-size: 15px 15px;
                    width: 15px;
                    height: 15px;
                    top: 50%;
                    transform: translate(0,-50%);
                    left: 15px;
                }
                .left_text{
                    // position: absolute;
                    font-size: 14px;
                    line-height: 14px;
                    // top: 15px;
                    // left: 40px;
                    // margin: 15px 0px 15px 40px;
                }
            }
            .service_right{
                display:inline-block;
                margin-left:17px;
                display:relative;
                .right_pic{
                    background-size: 15px 15px;
                    height: 15px;
                    width: 15px;
                    top: 0px;
                    left: 116px;
                    position:absolute;
                    top:50%;
                    transform: translate(0,-50%);
                }
                .right_text{
                    font-size: 10px;
                    line-height: 10px;
                    // position: absolute;
                    margin-left:21px;
                    display: inline-block;
                    left: 137px;
                    top: 3px;
                }
            }
        }
        .shop_tips{
            position: relative;
            padding: 15px 24px 19px 40px;
            .tips_pic{
                background-size: 15px 15px;
                height: 15px;
                width: 15px;
                position: absolute;
                top: 15px;
                left: 15px;
            }
            .tips_text{
                font-size: 13px;
                line-height: 13px;
                margin-top: 2px;
            }
        }
    }
}
</style>