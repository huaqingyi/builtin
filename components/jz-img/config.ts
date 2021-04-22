import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';
import { ImageFits } from './types';

export default {
    name: '图片',
    styles,
    attrs: {
        url: {
            title: `图片地址`,
            type: AttrInputType.UPLOAD,
        },
        fit: {
            title: `显示样式`,
            type: AttrInputType.SELECT,
            default: ImageFits.COVER,
            options: [
                { name: '填满', data: ImageFits.FILL, map: ImageFits.FILL },
                { name: '缩放', data: ImageFits.CONTAIN, map: ImageFits.CONTAIN },
                { name: '封面', data: ImageFits.COVER, map: ImageFits.COVER },
                { name: '不显示', data: ImageFits.NONE, map: ImageFits.NONE },
                { name: '缩小', data: ImageFits.SCALEDOWN, map: ImageFits.SCALEDOWN },
            ],
        },
        placeholder: {
            title: `加载中`,
            type: AttrInputType.INPUT,
            default: `加载中 ...`,
        },
    },
    events: {},
} as ComponentConfiguration;