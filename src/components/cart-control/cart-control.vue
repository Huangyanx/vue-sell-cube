<template>
    <div class="cart-control">
        <transition name="move">
            <div class="subtract" @click.stop="decrease">
                <i v-show="food.count>0" class="inner icon-remove_circle_outline"></i>
            </div>
        </transition>
        <span v-show="food.count>0" class="count" >{{food.count}}</span>
        <div class="add" @click.stop="add">
            <i class=" icon-add_circle" ></i>
        </div>

    </div>
    
</template>

<script>
    const EVENT_ADD = 'add'
    export default {
        name: "cart-control",
        props:{
            food:Object,
            default(){
                return{}
            }
        },
        methods:{
            add(event){
                if(!this.food.count){
                    this.$set(this.food, 'count', 1)
                }else {
                    this.food.count++
                }
                this.$emit(EVENT_ADD, event.target)
            },
            decrease(){
                if(this.food.count){
                    this.food.count--
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/mixin'
    @import '~common/stylus/variable'

    .cart-control
        display :flex
        line-height :$fontsize-medium
        .subtract,.add
            color :rgb(0,160,220)
            font-size :$fontsize-medium
        .subtract
            opacity :1
            &.move-enter-active, &.move-leave-active
                transition: all 0.8s linear
            &.move-enter, &.move-leave-active
                opacity: 0
                transform: translate3d(24px, 0, 0)
        .count
            display :inline-block
            width :24px
            font-size :$fontsize-small-s
            color :rgb(147,153,159)
            text-align :center
</style>