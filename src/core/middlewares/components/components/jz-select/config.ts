import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';

export default {
    name: '文本基础组件',
    styles,
    attrs: {
        options: {
            title: `选项`,
            type: AttrInputType.ARRAY,
            config: {
                label: {
                    title: '选项名',
                    type: AttrInputType.INPUT,
                    with: ['value'],
                },
                value: {
                    title: '选项值',
                    type: AttrInputType.INPUT,
                },
                disabled: {
                    title: '禁止选中',
                    type: AttrInputType.SWITCH,
                    default: false,
                },
                children: {
                    title: '子选项',
                    type: AttrInputType.NOOP,
                },
            },
        },
        placeholder: {
            title: `选择提示`,
            type: AttrInputType.INPUT,
            default: `请选择`,
        },
        multiple: {
            title: `多选`,
            type: AttrInputType.SWITCH,
            default: false,
        },
        create: {
            title: `创建条目`,
            type: AttrInputType.SWITCH,
            default: false,
        },
    },
    events: {},
} as ComponentConfiguration;