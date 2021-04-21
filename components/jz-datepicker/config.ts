import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { AttrInputType } from 'jz-component-types/dist/attrs/enums';
import { DateType } from './types';

export default {
    name: '时间选择器',
    styles,
    attrs: {
        type: {
            title: `选择类型`,
            type: AttrInputType.SELECT,
            default: DateType.DATE,
            options: [
                { name: `某年-某月-某日`, data: DateType.DATE, map: DateType.DATE },
                { name: `星期`, data: DateType.WEEK, map: DateType.WEEK },
                { name: `月份`, data: DateType.MONTH, map: DateType.MONTH },
                { name: `年`, data: DateType.YEAR, map: DateType.YEAR },
                { name: `日期多选`, data: DateType.DATES, map: DateType.DATES },
                { name: `日期范围`, data: DateType.DATERANGE, map: DateType.DATERANGE },
                { name: `月份范围`, data: DateType.MONTHRANGE, map: DateType.MONTHRANGE },
            ],
        },
        placeholder: {
            title: `输入提示`,
            type: AttrInputType.INPUT,
            default: `请选择日期`,
        },
        def: {
            title: `默认时间`,
            type: AttrInputType.ARRAY,
        },
    },
    events: {},
} as ComponentConfiguration;