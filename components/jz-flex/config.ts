import {
    ComponentConfiguration, styles
} from 'jz-component-types';
import { StyleInputType } from 'jz-component-types/dist/styles/enums';

export default {
    name: '块及容器',
    styles: {
        ...styles,
        minHeight: { title: `最小高度`, type: StyleInputType.INPUT, value: `40px` },
    },
    attrs: {},
    events: {},
    wrapper: true,
} as ComponentConfiguration;