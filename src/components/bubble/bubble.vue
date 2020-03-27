<template>
    <div>
        <div class="bubble" v-show="number>0">{{number}}</div>
    </div>
</template>

<script>
    export default {
        name: "bubble",
        props:{
            number:{
                type:Number,
                default(){
                    return 0
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"
    .bubble
        position :absolute
        top: -3px
        right :-1px
        height :16px
        padding :0 5px
        font-size :$fontsize-small-s
        font-weight :700
        color :rgb(255,255,255)
        line-height :$fontsize-medium
        text-align :center
        background: linear-gradient(to right, $color-orange, $color-red)
        border-radius :25px
        box-shadow :0 4px 0px rgba(0,0,0,0.4)


</style>