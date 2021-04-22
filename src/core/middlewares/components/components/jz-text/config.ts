import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';

export default {
    name: '文本基础组件',
    styles,
    attrs: {},
    events: {},
    slots: [
        { tag: 'div', content: { title: '编辑内容', type: AttrInputType.INPUT, default: '编辑内容' } },
    ],
} as ComponentConfiguration;