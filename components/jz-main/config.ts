import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';

export default {
    name: '容器基础组件',
    styles,
    attrs: {
        slot: {
            title: `插入元素`,
            type: AttrInputType.SLOT,
        }
    },
    events: {},
} as ComponentConfiguration;