<template>
    <div class="ratingSelect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block" :class="{'active2':selectType===2}">
                    {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span @click="select(0,$event)" class="positive" :class="{'active0':selectType===0}">
                    {{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span @click="select(1,$event)" class="negative" :class="{'active1':selectType===1}">
                    {{desc.negative}}
                <span class="count">{{negative.length}}</span>
            </span>
        </div>
        <div @click="toggleContent" class="switch">
            <span class="icon-check_circle" :class="{'onlyCon':onlyContent}"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        },
        data() {
            return {
                selectType: {
                    type: Number
                },
                onlyContent: false
            };
        },
        computed: {
            positives() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE;
                });
            },
            negative() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
            select(type, event) {
                if (!event._constructed) {
                    return;
                }
                this.selectType = type;
                this.$emit('ratingselect', type);
            },
            toggleContent(event) {
                if (!event._constructed) {
                    return;
                }
                this.onlyContent = !this.onlyContent;
                this.$emit('ratingtoggle', this.onlyContent);
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .ratingSelect{
        .rating-type{
            padding: 18px 0;
            margin:0 18px;
            border-bottom: 0.5px solid rgba(7,17,27,0.1);
                .count{
                    margin-left: 2px;
                    line-height: 16px;
                    font-size: 8px;
                }
            .block{
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                border-radius: 1px;
                font-size: 12px;
                color: rgb(77,85,93);
                background: rgba(0,160,220,0.6);
            }
            .positive{
                display: inline-block;
                background: rgba(0,160,220,0.2);
                padding: 8px 12px;
                margin-right: 8px;
                border-radius: 1px;
            }
            .negative{
                display: inline-block;
                background: rgba(77,85,93,0.2);
                padding: 8px 12px;
                border-radius: 1px;
            }
            .active2{
                color: rgb(255,255,255);
            }
            .active0{
                background: rgba(0,160,220,1);
                color: rgb(255,255,255);
            }
            .active1{
                background: rgba(77,85,93,1);
                color: rgb(255,255,255);
            }
        }
        .switch{
            padding: 12px 18px;
            border-bottom: 1px solid rgba(7,17,27,0.2);
            .text{
                display: inline-block;
                font-size: 12px;
                line-height: 24px;
                vertical-align: top;
                color: rgb(147,153,159);
            }
            .icon-check_circle{
                display: inline-block;
                font-size: 24px;
                margin-right: 4px;
                vertical-align: top;
                color: rgb(147,153,159);
            }
            .onlyCon{
                color: rgba(0,160,220,1);
            }
        }
    }
</style>
