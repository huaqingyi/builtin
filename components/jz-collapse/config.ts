import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';

export default {
    name: '文本基础组件',
    styles,
    attrs: {
        accordion: { title: `手拉风琴`, type: AttrInputType.SWITCH, default: true },
    },
    events: {},
    slots: [
        { tag: 'div', attrs: { slot: { title: '新建折叠面板', type: AttrInputType.INPUT } }, noop: true },
    ],
} as ComponentConfiguration;