<template>
    <div>
        <div class="shop-cart">
            <div class="content" @click.stop="toggleList">
                <div class="content-left" >
                    <div class="cart-wrapper">
                        <i class="logo icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                        <bubble :number="totalCount"></bubble>
                    </div>
                    <div class="total-price" :class="{'highlight':totalCount>0}">
                        ￥{{totalPrice}}
                    </div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}</div>
                </div>
                <div class="content-right" @click="pay">
                    <div class="pay " :class="payClass">{{payDes}}</div>
                </div>
            </div>

        </div>
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index" class="ball-wrapper">
                <transition name="parabola"
                @before-enter="beforeDrop"
                @enter="dropping"
                @after-enter="afterDrop">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>


</template>

<script>
    import bubble from '@/components/bubble/bubble'

    const BALL_LEN=10
    function createBalls() {
        let ball=[]
        for (let i=0; i<BALL_LEN;i++){
            ball.push({
                show:false
            })
        }
        return ball
    }
    export default {
        name: "shop-cart",
        props:{
            selectedFoods:{
                type:Array,
                default(){
                    return []
                }
            },
            deliveryPrice:{
                type:Number,
                default(){
                    return 0
                }
            },
            minPrice:{
                type:Number,
                default(){
                    return 0
                }
            },
            sticky: {
                type: Boolean,
                default: false
            },
            fold: {
                type: Boolean,
                default: true
            }

        },
        data(){
          return {
            balls:createBalls(),
            listFold:this.fold
          }
        },
        computed:{
            totalPrice(){
                let total=0
                this.selectedFoods.forEach(food=>{
                    total+=food.price*food.count
                })
                return total
            },
            totalCount(){
                let count=0
                this.selectedFoods.forEach(food=>{
                    count+=food.count
                })
                return count
            },
            payDes(){
                if(this.totalPrice===0){
                    return `￥${this.minPrice}元起送`
                }else if(this.totalPrice<this.minPrice){
                    let diff = this.minPrice - this.totalPrice
                    return `还差￥${diff}元起送`
                }else {
                    return '去结算'
                }
            },
            payClass() {
                if (!this.totalCount || this.totalPrice < this.minPrice) {
                    return 'not-enough'
                } else {
                    return 'enough'
                }
            },

        },
        created(){
          this.dropBalls=[]
        },
        methods:{
            toggleList(){
                if(this.listFold){
                    if(!this.totalCount){
                        return
                    }
                    this.listFold=false
                    this._showShopCartList()
                    this._showShopCartSticky()
                }else {
                    this.listFold=true
                    this._hideShopCartList()
                }
            },
            pay(e) {
                if (this.totalPrice < this.minPrice) {
                    return
                }
                this.$createDialog({
                    title: '支付',
                    content: `您需要支付${this.totalPrice}元`
                }).show()
                e.stopPropagation()
            },
            drop(el){
                for (let i=0;i<this.balls.length;i++){
                    const ball =this.balls[i]
                    if(!ball.show){
                        ball.show=true
                        ball.el=el
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            beforeDrop(el){
                const ball=this.dropBalls[this.dropBalls.length-1]
                const rect=ball.el.getBoundingClientRect()
                const x=rect.left-32
                const y=-(window.innerHeight-rect.top-22)
                el.style.display=''
                el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
                const inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            },
            dropping(el,done){
                this._reflow=document.body.offsetHeight
                el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
                const inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
                el.addEventListener('transitionend', done)
            },
            afterDrop(el){
                const ball=this.dropBalls.shift()
                if(ball){
                    ball.show=false
                    el.style.display='none'
                }
            },
            _showShopCartList(){
                this.ShopCartListComp=this.ShopCartListComp||this.$createShopCartList({
                    $props:{
                        selectFoods:'selectedFoods'
                    },
                    $events: {
                        leave: () => {
                            this._hideShopCartSticky()
                        },
                        hide: () => {

                            this.listFold = true
                        },
                        add: (el) => {
                            this.ShopCartStickyComp.drop(el)
                        }
                    }
                })
                this.ShopCartListComp.show()
            },
            _showShopCartSticky(){
                this.ShopCartStickyComp=this.ShopCartStickyComp||this.$createShopCartSticky({
                    $props:{
                        selectedFoods:'selectedFoods',
                        deliveryPrice: 'deliveryPrice',
                        minPrice: 'minPrice',
                        fold:'listFold',
                        list: this.ShopCartListComp
                    }
                })
                this.ShopCartStickyComp.show()
            },
            _hideShopCartList(){
                const list = this.sticky ? this.$parent.list : this.ShopCartListComp
                list.hide && list.hide()
            },
            _hideShopCartSticky() {
                this.ShopCartStickyComp.hide()
            }

        },
        watch: {
            fold(newVal) {
                this.listFold = newVal
            },
            totalCount(count) {
                if (!this.fold && count === 0) {
                    this._hideShopCartList()
                }
            },
        },
        components:{
            bubble
        }

    }
   </script>

<style lang="stylus" scoped>
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"

        .content
            display: flex
            background: $color-background
            font-size: 0
            color: $color-light-grey
            .content-left
                flex: 1
                font-weight :700
                .cart-wrapper
                    display :inline-block
                    position :relative
                    width :44px
                    height :44px
                    margin :-10px 12px 0 12px
                    padding :6px
                    background-color :$color-background
                    border-radius :50%
                    .logo
                        display :inline-block
                        width :100%
                        height :100%
                        line-height :44px
                        background-color :rgb(43,52,60)
                        border-radius :50%
                        text-align :center
                        font-size :$fontsize-large-xxx
                        &.highlight
                            background-color : $color-blue
                            color :$color-white
                .total-price
                    display :inline-block
                    font-size :$fontsize-large
                    line-height :$fontsize-large-xxx
                    margin-top :8px
                    padding-right :12px
                    border-right:1px solid rgba(255,255,255,0.1)
                    &.highlight
                        color :$color-white
                .desc
                    display :inline-block
                    margin-left :12px
                    font-size :$fontsize-small-s
                    line-height :$fontsize-large-xxx
            .content-right
                flex: 0 0 105px
                width: 105px
                .pay
                    height: 48px
                    line-height: 48px
                    text-align: center
                    font-weight: 700
                    font-size: $fontsize-small
                    &.not-enough
                        background: $color-dark-grey
                    &.enough
                        background: $color-green
                        color: $color-white

        .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 22px
                z-index: 200
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: $color-blue
                    transition: all 0.4s linear
</style>