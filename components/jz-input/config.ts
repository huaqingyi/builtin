import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';

export default {
    name: '输入框',
    styles,
    attrs: {
        placeholder: {
            title: `输入提示`,
            type: AttrInputType.INPUT,
            default: `请输入内容`,
        },
        disabled: {
            title: `禁止输入`,
            type: AttrInputType.SWITCH,
            default: false,
        },
        password: {
            title: `密码`,
            type: AttrInputType.SWITCH,
            default: false,
        },
        prefixIcon: {
            title: `头部图标`,
            type: AttrInputType.GRIDSELECT,
            gridata: [],
        },
        suffixIcon: {
            title: `尾部图标`,
            type: AttrInputType.GRIDSELECT,
            gridata: [],
        },
        def: {
            title: `默认值`,
            type: AttrInputType.INPUT,
        },
    },
    events: {},
} as ComponentConfiguration;