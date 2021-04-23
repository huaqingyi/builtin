import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';

export default {
    name: '按钮',
    styles,
    attrs: {},
    events: {},
    slots: [
        { tag: 'div', content: { title: '编辑内容', type: AttrInputType.INPUT, default: '按钮名称' } },
    ],
    slot: true,
} as ComponentConfiguration;