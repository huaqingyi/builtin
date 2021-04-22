import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';
import { StyleInputType } from 'jz-component-types/dist/styles/enums';

export default {
    name: '图标',
    styles: {
        ...styles,
        display: {
            title: `单行显示`,
            type: StyleInputType.SWITCH,
            value: false,
            options: [
                { data: true, map: 'block' },
                { data: true, map: 'inline-block' },
            ],
        },
    },
    attrs: {
        builtin: {
            title: `内置图标`,
            type: AttrInputType.GRIDSELECT,
            gridata: [],
        },
        color: {
            title: `文字颜色`,
            type: AttrInputType.COLORPICKER,
        },
        backgroundColor: {
            title: `按钮颜色`,
            type: AttrInputType.COLORPICKER,
        },
    },
    events: {},
} as ComponentConfiguration;