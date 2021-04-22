import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';
import { CarouselType, CarouselDirectionType, CarouselPositionType } from './types';

export default {
    name: '文本基础组件',
    styles,
    attrs: {
        type: {
            title: `样式`,
            type: AttrInputType.SELECT,
            default: CarouselType.DEFAULT,
            options: [
                { name: '卡片', data: CarouselType.CARD, map: CarouselType.CARD },
                { name: '默认', data: CarouselType.DEFAULT, map: CarouselType.DEFAULT },
            ],
        },
        direction: {
            title: `布局`,
            type: AttrInputType.SELECT,
            default: CarouselDirectionType.HORIZONTAL,
            options: [
                { name: '横向布局', data: CarouselDirectionType.HORIZONTAL, map: CarouselDirectionType.HORIZONTAL },
                { name: '纵向布局', data: CarouselDirectionType.VERTICAL, map: CarouselDirectionType.VERTICAL },
            ],
        },
        autoplay: {
            title: `自动播放`,
            type: AttrInputType.SWITCH,
            default: true,
        },
        position: {
            title: `下标`,
            type: AttrInputType.SWITCH,
            default: true,
            options: [
                { data: true, map: CarouselPositionType.OUTSIDE },
                { data: false, map: CarouselPositionType.NONE },
            ],
        },
    },
    events: {},
    slots: [
        { tag: 'div', attrs: { slot: { title: '新建', type: AttrInputType.INPUT } }, noop: true }
    ],
} as ComponentConfiguration;