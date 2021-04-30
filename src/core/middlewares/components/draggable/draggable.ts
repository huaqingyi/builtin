import draggable from 'vuedraggable';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import './draggable.less';
import { map } from 'lodash';

@Component({ extends: draggable, })
export default class extends Vue {

    @Prop(Object)
    public options!: any;

    @Prop({ type: Array, required: false, default: null })
    public list!: any;

    @Prop({ type: Array, required: false, default: null })
    public value!: any;

    @Prop({ type: Boolean, default: false })
    public noTransitionOnDrag!: any;

    @Prop({ type: Function, default: original => original })
    public clone!: any;

    @Prop({ type: String, default: 'div' })
    public element!: any;

    @Prop({ type: [String, Function, Object], default: null })
    public tag!: any;

    @Prop({ type: Function, default: null })
    public move!: any;

    @Prop({ type: Object, required: false, default: null })
    public componentData!: any;

    @Prop({ type: String, required: false, default: 'resize-handle' })
    public classNameHandle!: string;

    @Prop({
        type: Array, required: false,
        default: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
    })
    public sticks!: string[];

    public transitionMode!: boolean;
    public headerOffset!: number;
    public footerOffset!: number;

    constructor() {
        super(...arguments);
    }

    public getTag() {
        const tag = this.tag || this.element;
        if (!tag.toLowerCase) {
            tag.toLowerCase = () => 'jz-components';
        }
        return tag;
    }

    public isTransition() {
        const slots = this.$slots.default;
        if (!slots || slots.length !== 1) {
            return false;
        }
        const [{ componentOptions }] = slots;
        if (!componentOptions) {
            return false;
        }
        return ['transition-group', 'TransitionGroup'].includes(componentOptions.tag || '');
    }

    public getSlot(slot, scopedSlot, key) {
        return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : undefined);
    }

    public computeChildrenAndOffsets() {
        let headerOffset = 0;
        let footerOffset = 0;
        let children = this.$slots.default || [];
        const slot = this.$slots;
        const scopedSlot = this.$scopedSlots;
        const header = this.getSlot(slot, scopedSlot, 'header');
        if (header) {
            headerOffset = header.length;
            children = children ? [...header, ...children] : [...header];
        }
        const footer = this.getSlot(slot, scopedSlot, 'footer');
        if (footer) {
            footerOffset = footer.length;
            children = children ? [...children, ...footer] : [...footer];
        }
        return { children, headerOffset, footerOffset };
    }

    public buildAttribute(object, propName, value) {
        if (value === undefined) {
            return object;
        }
        object = object || {};
        object[propName] = value;
        return object;
    }

    public getComponentAttributes() {
        const $attrs = this.$attrs;
        const componentData = this.componentData;
        let attributes: any = null;
        const update = (name, value) => {
            attributes = this.buildAttribute(attributes, name, value);
        };
        const attrs = Object.keys($attrs)
            .filter(key => key === 'id' || key.startsWith('data-'))
            .reduce((res, key) => {
                res[key] = $attrs[key];
                return res;
            }, {});
        update('attrs', attrs);

        if (!componentData) {
            return attributes;
        }
        const { on, props, attrs: componentDataAttrs } = componentData;
        update('on', on);
        update('props', props);
        Object.assign(attributes.attrs, componentDataAttrs);
        return attributes;
    }

    public render(h: CreateElement) {
        this.transitionMode = this.isTransition();
        const { children, headerOffset, footerOffset } = this.computeChildrenAndOffsets();
        this.headerOffset = headerOffset;
        this.footerOffset = footerOffset;
        const attributes = this.getComponentAttributes();
        return h(this.getTag(), attributes, children);
    }
}
