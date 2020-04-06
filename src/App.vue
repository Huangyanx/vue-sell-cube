<template>
  <div class="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import header from '@/components/header/header'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'
import tab from '@/components/tab/tab'
import {getSeller} from "api";
import qs from 'query-string'

export default {
  name: 'App',
  data(){
    return {
      seller:{
        id:qs.parse(location.search).id
      }
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评论',
          component: ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: seller,
          data: {
            seller: this.seller
          }
        }
      ]
    },

  },

  created(){
   this. _getSeller()
  },
  methods:{
    _getSeller() {
      getSeller({
        id:this.seller.id
      }).then((seller)=>{
        this.seller=seller
      })
    },
  },
  components: {
    'v-header':header,
    tab
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
