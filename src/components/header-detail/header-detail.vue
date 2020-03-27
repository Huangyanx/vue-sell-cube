<template>
    <transition name="fade">
        <div v-show="visible" class="header-detail" >
            <div class="detail-main">
                <div class="seller-name">
                    {{seller.name}}
                </div>
                <star :score="seller.score" :size="3"></star>

                <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                        <support-ico :size="2" :type="item.type"></support-ico>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">商家公告</div>
                    <div class="line"></div>
                </div>
                <div class="bulletin">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <div class="detail-close" @click="hide">
                    <i class="icon-close"></i>
                </div>


            </div>

        </div>
    </transition>
</template>

<script>
    import star from "@/components/star/star"
    import supportIco from '@/components/support-ico/support-ico'
    export default {
        name: "header-detail",
        props:{
            seller: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data(){
            return{
                visible:false
            }

        },
        methods:{
            show(){
                this.visible=true
            },
            hide(){
                this.visible=false
            }
        },
        components:{
            star,
            supportIco
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"
    .header-detail
        position :fixed
        top: 0
        left :0
        width :100%
        height :100%
        overflow: auto
        opacity: 1
        color :$color-white
        background-color :$color-background-s
        z-index :80
        &.fade-enter-active, &.fade-leave-active
            transition: all 0.5s
        &.fade-enter, &.fade-leave-active
            opacity: 0
            background: $color-background
        .seller-name
            margin :40px 36px 16px 32px
            text-align: center
            font-size: $fontsize-large
            line-height :$fontsize-large
        .title
            padding :28px 36px 24px 36px
            display :flex
            align-items :center
            .line
                flex :1
                border-bottom : 1px solid rgba(255, 255, 255, 0.2)
            .text
                padding :0 12px
                font-size :$fontsize-medium
        .supports
            padding :0 36px
            .support-item
                display :flex
                margin-bottom :12px
                align-items :center
                &:last-child
                    margin-bottom :0
                .support-ico
                    margin-right :6px
                .text
                    font-size :$fontsize-small
                    line-height :$fontsize-small
                    font-weight :200


        .bulletin
            margin :0 36px
            .content
                padding: 0 12px
                font-weight :200
                line-height: $fontsize-large-xxx
                font-size: $fontsize-small
    .detail-close
        position: relative
        width: 30px
        height: 30px
        margin: 32px auto 32px auto
        font-size: $fontsize-large-xxxx
        text-align :center
        clear: both

</style>