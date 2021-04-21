import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';
import { CheckboxType } from './types';

export default {
    name: '多选按钮',
    styles,
    attrs: {
        label: {
            title: `全选名称`,
            type: AttrInputType.INPUT,
            default: '默认文字',
        },
        type: {
            title: `是否按钮`,
            type: AttrInputType.SWITCH,
            default: false,
            options: [
                { data: true, map: CheckboxType.BUTTON },
                { data: false, map: CheckboxType.DEFALUT },
            ],
        },
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
            }
        },
        checked: {
            title: `默认选择值`,
            type: AttrInputType.ARRAY,
            connect: ['options'],
        },
        checkAll: {
            title: `全选按钮`,
            type: AttrInputType.SWITCH,
            default: false,
        },
    },
    events: {},
} as ComponentConfiguration;