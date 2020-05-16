<template>
    <div class="Star">
        <span class="Staritem" v-for="(item, index) in items" :key="index" :class="item"></span>
    </div>
</template>

<script lang="ts">
import {Vue,Component,Prop} from "vue-property-decorator";
@Component
export default class Star extends Vue{
    @Prop(Number) readonly score: number|undefined;
    private scores : number = 0;
    private items : Array<string> = [];
    private len : number = 5;
    private isHalf : string = "half";
    private isOn : string = "on";
    private isOff : string = "off";

    mounted(){
        this.scores = this.score;
        //向下取0.5(4.9->4.5)
        this.scores = Math.floor(this.scores * 2) / 2;

        //全星
        for(let i = 1; i <= this.scores/1 ; i++){
            this.items.push(this.isOn);
        }
        //有半星
        if(this.scores % 1 !== 0){
            this.items.push(this.isHalf);
        }
        //空星處理
        while(this.items.length < this.len){
            this.items.push(this.isOff);
        }
    }
}
</script>

<style lang="scss">
.Star{
    font-size: 0;
}
.Staritem{
    height: 10px;
    width: 10px;
    margin-right: 3px;
    display: inline-block;
    background: no-repeat;
    
    :last-child{
        margin-right: 0px;
    }
}
.on{
    background: url("./star24_on@2x.png");
    background-size: 10px 10px;
}
.off{
    background: url("./star24_off@2x.png");
    background-size: 10px 10px;
}
.half{
    background: url("./star24_half@2x.png");
    background-size: 10px 10px;
}
</style>