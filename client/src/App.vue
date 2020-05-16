<template>
  <div id="app">
    <Header v-if="isShow" ></Header>
    <Nav v-if="isShow"></Nav>
    <keep-alive>
      <router-view v-if="isShow"></router-view>
    </keep-alive>
    
  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import Header from './components/Header/Header.vue';
import Nav from './components/Nav/Nav.vue';
@Component({
  components:{
    Header,
    Nav
  }
})
export default class App extends Vue{
  private isShow = false;
  private windowHeight = 0;
  private beforeCreate(){
     const pr1 = this.axios.get('/api/seller').then(res=>this.$store.dispatch('setSellers',res.data))
     const pr2 = this.axios.get('/api/order').then(res=>this.$store.dispatch('setOrders',res.data))
     const pr3 = this.axios.get('/api/rating').then(res=>this.$store.dispatch('setRatings',res.data))
     Promise.all([pr1,pr2,pr3]).then(()=>{
       this.isShow = true;
     })
  }
  // mounted(){
  //   this.windowHeight = window.innerHeight;
  //   let viewport = document.querySelector("meta[name=viewport]");
  //   viewport.setAttribute("content", "width=device-width,height=" + this.windowHeight + "px,initial-scale=1.0,user-scalable=no,minimum-scale=1,maximum-scale=1");
  //   viewport.setAttribute("content", "height=" + this.windowHeight + "px");
  //   console.log(viewport);
  // }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
html {
    overflow: -moz-hidden-unscrollable;
    // height: 100%;
}
body {
  overflow: hidden;
}

</style>
