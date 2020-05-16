<template>
    <div class="egg">
        <div class="eggWrapper">
            <div class="eggTop">
                <div class="eggAlert">
                    注意
                </div>
                <div class="eggContent">
                    <br>
                    我們知道您很想吃到來自海王星海衛一分店的熱騰騰餐點，
                    <br>
                    餐點我們已經準備好了，
                    <br>
                    但我們之間距離2838219233.135868公里，
                    <br>
                    需要騎5708年的gogoro才能送達地球，
                    <br>
                    我們保存食品的技術應該能確保餐點到達您手上的時候，
                    <br>
                    還是熱騰騰的，
                    <br>
                    但聽說地球人的平均壽命約為70歲，
                    <br>
                    我們不確定是否有機會能讓您嚐到這份餐點，
                    <br>
                    您確定還需要這份餐點嗎？
                    <br>
                    <br>
                    P.S.我們採取貨到付款
                </div>
            </div>
            
            <div class="eggButton">
                <div class="buttonLeft">
                    <div class="yesButton" @click="animate">
                        Yes
                    </div>
                </div>
                <div class="buttonRight">
                    <div class="noButton" @click="close">
                        No
                    </div>
                </div>
 
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
@Component
export default class EasterEgg extends Vue{
    private close(){
        this.$emit('closeTag');
    }
    private animate(){
        this.$emit('animate');
    }
}
</script>

<style lang="scss" scoped>
.egg{
    height: calc(100vh);
    width: 100vw;
    background:rgba(98,98,98,0.8);
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 5;
    transform: translateY(calc(-100% + 51px));
    .eggWrapper{
        background: lighten(#78C2C4, 30%);
        height: 80vh;
        margin: 80px 20px;
        border-radius: 10px;
        position: relative;
        .eggTop{
            height: 60vh;
            width: 70vw;
            box-sizing: border-box;
            border-radius: 5px;
            background: #A5DEE4;
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%) translateY(-20%);
            padding: 10px 8px;
            overflow: auto;
            
            .eggAlert{
                color: #FFB11B;
                font-size: 30px;
                padding: 0px 20px;
                background: #4F726C;
                border-radius: 3px;
            }
            .eggContent{
                color: #255359;
                font-size: 15px;
                padding: 5px 5px;
                text-align: center;
                
            }
        }
        .eggButton{
            width: 100%;
            position: absolute;
            bottom: 8%;
            display: flex;
            
            .buttonLeft{
                flex: 1 0 50%;
                box-sizing: border-box;
                padding-right: 5%;
                
                .yesButton{
                    cursor: pointer;
                    height: 30px;
                    background: white;
                    width: 100px;
                    line-height: 30px;
                    border-radius: 5px;
                    text-align: center;
                    float:right;
                    &:hover{
                        background: #0F2540;
                        color: white;
                    } 
                    &:focus{
                        background: #0F2540;
                        color: white;
                    }
                }
                
            }
            .buttonRight{
                flex: 1 0 50%;
                box-sizing: border-box;
                padding-left: 5%;
                
                .noButton{
                    cursor: pointer;
                    height: 30px;
                    background: white;
                    width: 100px;
                    line-height: 30px;
                    border-radius: 5px;
                    text-align: center;
                    display: inline-block;
                    &:hover{
                        background: #0F2540;
                        color: white;
                    } 
                    &:focus{
                        background: #0F2540;
                        color: white;
                    }
                }
                
            }
            
        }
    }
}
</style>