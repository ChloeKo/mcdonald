<template>
    <div class="shopButton">
        <transition name="anima">
            <div class="shopDecre icon-remove_circle_outline" v-if="orders.count" @click.stop="minus">
            </div>
        </transition>
        <transition name="numMove">
            <div class="shopNum" v-if="this.orders.count>0">
                {{this.orders.count}}
             </div>
        </transition>
        <div class="shopIncre icon-add_circle" @click.stop="add">
            <i class="IncreBack"></i>
        </div>
    </div>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from "vue-property-decorator";
@Component
export default class ShopControl extends Vue{
    @Prop(Object) orders:object;
    
    private add(){
        if(this.orders.count){
            this.orders.count++;
        }else{
            this.$set(this.orders, 'count', 0);
            this.orders.count++;
        } 
    }
    private minus(){
        if(this.orders.count){
            this.orders.count--;
        }              
    }
}
</script>

<style lang='scss' scoped>
.shopButton{
    position: absolute;
    padding-top: 0px;
    z-index:1;
    .shopDecre{
        display: inline-block;
        font-size: 26px;
        color: #bfbfbf;
        cursor: pointer;
    }
    .shopNum{
        display: inline-block;
        font-size: 13px;
        vertical-align: top;
        margin-right: 12px;
        margin-left: 12px;
        line-height: 26px;
    }
    .shopIncre{
        display: inline-block;
        font-size: 26px;
        color: #ffd161;
        width: 26px;
        height: 26px;
        position: relative;
        cursor: pointer;
        
        .IncreBack{
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: black;
            z-index: -1;
            position: absolute;
            top: 3px;
            left: 3px;
        }
    }
}
@media (max-width:338px){
    .goodsItem{
        .shopButton{
            .shopNum{
                margin:0 4px 0 4px;
            }
        }
    }
}
.anima-enter-active, .anima-leave-active{
    transition: all 0.5s linear;
}

.anima-enter, .anima-leave-to{
    transform: translateX(45px);
}

.numMove-enter-active,.numMove-leave-active{
    transition: all 0.5s linear;
}
.numMove-enter, .numMove-leave-to{
    transform: translateX(20px);
    opacity: 0;
}


</style>