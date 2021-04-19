<template>
    <Carousel
        class="jz-root"
        :type="type"
        :autoplay="autoplay"
        :direction="direction"
        :indicator-position="position"
    >
        <CarouselItem v-for="(name, idx) in children" :key="idx">
            <slot :name="name"></slot>
        </CarouselItem>
    </Carousel>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Carousel, CarouselItem } from 'element-ui';
import { map } from 'lodash';

export enum CarouselType {
    CARD = 'card',
    DEFAULT = '',
}

export enum CarouselDirectionType {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export enum CarouselPositionType {
    OUTSIDE = 'outside',
    NONE = 'none',
}

@Component({ name: 'jz-swiper', components: { Carousel, CarouselItem } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: CarouselType.DEFAULT })
    public type!: CarouselType;

    @Prop({ type: String, required: false, default: CarouselDirectionType.HORIZONTAL })
    public direction!: CarouselDirectionType;

    @Prop({ type: Boolean, required: false, default: true })
    public autoplay!: boolean;

    @Prop({ type: String, required: false, default: CarouselPositionType.OUTSIDE })
    public position!: CarouselPositionType;

    public get children() {
        return map(this.$slots, (slot, title) => {
            return title;
        });
    }

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.jz-root {
    display: inline-block;
    .el-carousel__item {
        background-color: #99a9bf;
    }
}
</style>