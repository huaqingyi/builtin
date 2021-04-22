import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';
import { ModeType } from './types';

export default {
    name: '菜单/导航栏',
    styles,
    attrs: {
        options: {
            title: `菜单值`,
            type: AttrInputType.ARRAY,
            config: {
                name: {
                    title: `菜单值`,
                    type: AttrInputType.INPUT,
                },
                builtin: {
                    title: `内置图标`,
                    type: AttrInputType.GRIDSELECT,
                    gridata: [],
                },
                icon: {
                    title: `上传图标`,
                    type: AttrInputType.UPLOAD,
                },
                children: {
                    title: `子菜单`,
                    type: AttrInputType.NOOP,
                },
            }
        },
        collapse: {
            title: `折叠`,
            type: AttrInputType.SWITCH,
            default: false,
        },
        mode: {
            title: `菜单样式`,
            type: AttrInputType.SELECT,
            default: ModeType.HORIZONTAL,
            options: [
                { name: '横向布局', data: ModeType.HORIZONTAL, map: ModeType.HORIZONTAL },
                { name: '纵向布局', data: ModeType.VERTICAL, map: ModeType.VERTICAL },
            ],
        },
    },
    events: {},
} as ComponentConfiguration;