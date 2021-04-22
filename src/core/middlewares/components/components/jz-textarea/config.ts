import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';

export default {
    name: '文本基础组件',
    styles,
    attrs: {
        autosize: {
            title: `大小`,
            type: AttrInputType.ARRAY,
            default: [2, 4],
            config: {
                0: { title: '行数', type: AttrInputType.INPUT, default: 2 },
                1: { title: '列数', type: AttrInputType.INPUT, default: 4 },
            },
        },
        placeholder: {
            title: `选择提示`,
            type: AttrInputType.INPUT,
            default: `请选择`,
        },
        def: {
            title: `默认值`,
            type: AttrInputType.INPUT,
        },
    },
    events: {},
} as ComponentConfiguration;