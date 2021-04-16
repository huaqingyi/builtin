import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';

export default {
    name: '文本基础组件',
    styles,
    attrs: {
        text: {
            title: `编辑文本`,
            type: AttrInputType.INPUT,
        },
    },
    events: {},
} as ComponentConfiguration;