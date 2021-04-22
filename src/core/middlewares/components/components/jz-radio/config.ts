import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';
import { CheckboxType } from './types';

export default {
    name: '单选按钮',
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
            }
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
        def: {
            title: `默认值`,
            type: AttrInputType.INPUT,
        },
    },
    events: {},
} as ComponentConfiguration;