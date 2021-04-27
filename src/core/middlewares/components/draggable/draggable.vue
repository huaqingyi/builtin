<script lang="ts">
import draggable from 'vuedraggable';
import { Component, Prop, Vue } from 'vue-property-decorator';

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

    public getTag() {
        const tag = this.tag || this.element;
        if (!tag.toLowerCase) {
            tag.toLowerCase = () => 'jz-components';
        }
        return tag;
    }
}
</script>
