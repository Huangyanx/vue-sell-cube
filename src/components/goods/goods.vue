<template>
    <div class="goods">
        <div class="scroll-nav-wrapper">
            <cube-scroll-nav
                    :side="true"
                    :data="goods"
                    :options="scrollOptions"
                    v-if="goods.length"
            >
                 <template slot="bar" slot-scope="props">
                     <cube-scroll-nav-bar
                                direction="vertical"
                                :labels="props.labels"
                                :txts="barTxts"
                                :current="props.current">
                            <template slot-scope="props">
                                <div class="text">
                                    <support-ico
                                            v-if="props.txt.type>=1"
                                            :size=3
                                            :type="props.txt.type"
                                    ></support-ico>
                                    <span>{{props.txt.name}}</span>
                                    <div class="num">
                                        <bubble :number="props.txt.count"></bubble>
                                    </div>
                                </div>
                            </template>
                     </cube-scroll-nav-bar>

                    </template>
                <cube-scroll-nav-panel
                        v-for="item in goods"
                        :key="item.name"
                        :label="item.name"
                        :title="item.name">
                    <ul>
                        <li
                                @click="selectFood(food)"
                                v-for="food in item.foods"
                                :key="food.name"
                                class="food-item">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cart-control-wrapper">
                                     <cart-control @add="onAdd"  :food="food"></cart-control>
                                  </div>
                            </div>
                        </li>
                    </ul>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
        <div class="shop-cart-wrapper">
            <shop-cart ref="shopCart" :selected-foods="selectedFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice">
            </shop-cart>
        </div>
    </div>
</template>

<script>
    import {getGoods} from "api";
    import supportIco from "@/components/support-ico/support-ico"
    import cartControl from "@/components/cart-control/cart-control"
    import shopCart from '@/components/shop-cart/shop-cart'
    import bubble from '@/components/bubble/bubble'
    export default {
        name: "goods",
        props: {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data(){
            return {
                goods:[],
                selectedFood:[],
                scrollOptions:{
                    click:false,
                    directionLockThreshold:0
                }
            }
        },

        computed:{
            seller() {
                return this.data.seller
            },
            barTxts() {
                let ret = []
                this.goods.forEach((good) => {
                    const {type, name, foods} = good
                    let count = 0
                    foods.forEach((food) => {
                        count += food.count || 0
                    })
                    ret.push({
                        type,
                        name,
                        count
                    })
                })
                return ret
            },
            selectedFoods(){
                let foods=[]
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            }
        },
        methods: {
            fetch() {
                if(!this.fetched){
                    this.fetched=true
                    getGoods({
                        id:this.seller.id
                    }).then((goods)=>{
                        this.goods=goods
                    })
                }

            },
            selectFood(food) {
                this.selectedFood = food
                this._showFood()
                this._showShopCartSticky()
            },
            onAdd(el){
               this.$refs.shopCart.drop(el)
            },
            _showFood() {
                this.foodComp = this.foodComp || this.$createFood({
                    $props: {
                        food: 'selectedFood'
                    },
                    $events: {
                        add: (target) => {
                            this.shopCartStickyComp.drop(target)
                        },
                        leave: () => {
                            this._hideShopCartSticky()
                        }
                    }
                })
                this.foodComp.show()
            },
            _showShopCartSticky() {
                this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
                    $props: {
                        selectedFoods: 'selectedFoods',
                        deliveryPrice: this.seller.deliveryPrice,
                        minPrice: this.seller.minPrice,
                        fold: true
                    }
                })
                this.shopCartStickyComp.show()
            },
            _hideShopCartSticky() {
                this.shopCartStickyComp.hide()
            }
        },
        components:{
            supportIco,
            cartControl,
            shopCart,
            bubble
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"
    .goods
        position: relative
        text-align: left
        height: 100%
        .scroll-nav-wrapper
            position: absolute
            width: 100%
            top: 0
            left: 0
            bottom: 48px
       >>> .cube-scroll-nav-bar
           width: 80px
           white-space: normal
           overflow: hidden
       >>> .cube-scroll-nav-bar-item
           padding: 0 10px
           display: flex
           align-items: center
           height: 56px
           line-height: 14px
           font-size: $fontsize-small
           background: $color-background-ssss
           .text
               flex: 1
               position: relative
           .num
               position: absolute
               right: -8px
               top: -10px
           .support-ico
               display: inline-block
               vertical-align: top
               margin-right: 4px
       >>> .cube-scroll-nav-bar-item_active
           background: $color-white
           color: $color-dark-grey
       >>> .cube-scroll-nav-panel-title
           padding-left: 14px
           height: 26px
           line-height: 26px
           border-left: 2px solid $color-col-line
           font-size: $fontsize-small
           color: $color-grey
           background: $color-background-ssss
       .food-item
           display: flex
           margin: 18px
           padding-bottom: 18px
           border-bottom: 1px solid rgba(7,17,27,0.1)
           position: relative
           &:last-child
               border-bottom: 0
               margin-bottom: 0
           .icon
               flex: 0 0 57px
               margin-right: 10px
               img
                   height: auto
           .content
               flex: 1
               .name
                   margin: 2px 0 8px 0
                   height: 14px
                   line-height: 14px
                   font-size: $fontsize-medium
                   color: $color-dark-grey
               .desc, .extra
                   line-height: 10px
                   font-size: $fontsize-small-s
                   color: $color-light-grey
               .desc
                   line-height: 12px
                   margin-bottom: 8px
               .extra
                   .count
                       margin-right: 12px
               .price
                   font-weight: 700
                   line-height: 24px
                   .now
                       margin-right: 8px
                       font-size: $fontsize-medium
                       color: $color-red
                   .old
                       text-decoration: line-through
                       font-size: $fontsize-small-s
                       color: $color-light-grey
           .cart-control-wrapper
               position: absolute
               right: 0
               bottom: 20px
       .shop-cart-wrapper
           position: absolute
           left: 0
           bottom: 0
           z-index: 50
           width: 100%
           height: 48px

</style>