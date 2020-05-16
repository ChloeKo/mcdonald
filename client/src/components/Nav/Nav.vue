<template>
    <div class="nav">
        <router-link to="/order" class="nav-item" active-class="active">訂餐<i class="line"></i></router-link>
        <router-link to="/rating" class="nav-item" active-class="active">評價({{getData.comment_num}})<i class="line"></i></router-link>
        <router-link to="/seller" class="nav-item" active-class="active">店家<i class="line"></i></router-link>
    </div>
</template>

<script>
    import {Vue,Component} from 'vue-property-decorator'
    @Component
    export default class Nav extends Vue{
        get getData(){
            return this.$store.getters.getRatings.data;
        }
    }
</script>

<style lang="scss" scoped>
.nav{
    width: 100%;
    display: grid;
    height: 40px;
    line-height: 40px;
    grid-template-columns: repeat(12,1fr);
    border-bottom: 1px solid #e4e4e4; 
    .nav-item{
        font-size: 13px;
        text-align: center;
        text-decoration: none;
        color: #666666;
        grid-column: span 4;
    }
    .active{
        color:#ffbb22;
        position: relative;
        .line{
            width: 21px;
            height: 2px;
            background: #ffbb22;
            position: absolute;
            top: 38px;
            left: 50%;
            transform: translate(-50%,0);
        }
    }
}


</style>