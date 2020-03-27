<template>
  <div class="header" @click="showDetail">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support" >
            <support-ico :size="1" :type="seller.supports[0].type"></support-ico>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" >
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
    </div>
    <div class="bulletin-wrapper" >
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SupportIco from "../support-ico/support-ico";

  export default {
    name: 'v-header',
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {SupportIco},
    methods: {
      showDetail(){
        this.headerDetailComp=this.headerDetailComp || this.$createHeaderDetail({
          $props:{
            seller:'seller'
          }
        })
        this.headerDetailComp.show()
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .header
    position: relative
    overflow: hidden
    color: $color-white
    background: $color-background-ss
    .content-wrapper
      position :relative
      display :flex
      align-items :center
      padding :24px 12px 18px 24px
      .avatar
        flex: 0 0 64px
        width: 64px
        margin-right: 16px
      .content
        flex :1
        color :rgb(255,255,255)
        .title
          display: flex;
          align-items: center;
          margin-bottom :8px
          .brand
            flex: 0 0 30px
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left :6px
            font-size :$fontsize-large
            font-weight :bold
            line-height :18px
        .description
          margin-bottom :10px;
          font-size :$fontsize-small
          font-weight :200
          line-height :12px
        .support
          display :flex
          align-items :center
          .support-ico
            margin-right :4px
          .text
            font-size :$fontsize-small-s
            font-weight :200
            line-height :12px
        .support-count
          position :absolute
          right :12px;
          bottom :18px
          padding :7px 8px
          border-radius :14px
          font-size :$fontsize-small-s
          font-weight :200
          line-height 12px
          background-color :$color-background-sss
          .count
            margin-right :1px
    .bulletin-wrapper
      display :flex
      align-items :center
      height :28px
      padding :0 12px
      background-color :rgba(7,17,27,0.2)
      .bulletin-title
        flex :0 0 30px
        width: 30px
        height: 18px
        margin-right :4px
        bg-image('bulletin')
        background-size: 30px 18px
        background-repeat: no-repeat
      .bulletin-text
        font-size :$fontsize-small-s
        color :rgb(255,255,255)
        font-weight :200
        line-height :28px
        white-space :nowrap
        text-overflow ellipsis
        overflow hidden
  .background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
</style>
