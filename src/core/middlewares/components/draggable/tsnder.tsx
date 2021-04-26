import { Component, Prop, Vue } from 'vue-property-decorator';
import { map } from 'lodash';

@Component
export default class extends Vue {

    @Prop({ type: Function, required: false })
    public component!: Vue;

    constructor() {
        super(arguments);
    }

    public render(h) {
        const Componder: any = this.component;
        console.log(this.$slots);
        return Componder ? (
            <Componder {...this}>{map(this.$slots, slot => slot)}</Componder>
        ) : <div>{map(this.$slots, slot => slot)}</div>;
    }
}
