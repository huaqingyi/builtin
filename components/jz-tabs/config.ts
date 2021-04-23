import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';
import { TabsType } from './types';

export default {
    name: '文本基础组件',
    styles,
    attrs: {
        type: {
            title: `样式`,
            type: AttrInputType.SELECT,
            default: TabsType.BORDERCARD,
            options: [
                { name: '边框卡片', data: TabsType.BORDERCARD, map: TabsType.BORDERCARD },
                { name: '卡片', data: TabsType.CARD, map: TabsType.CARD },
                { name: '无边框', data: TabsType.DEFALUT, map: TabsType.DEFALUT },
            ],
        },
    },
    events: {},
    slots: [
        { tag: 'div', attrs: { slot: { title: '新建标签页', type: AttrInputType.INPUT } }, noop: true }
    ],
    slot: true,
} as ComponentConfiguration;