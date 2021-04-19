import { Component, Prop, Vue } from 'vue-property-decorator';
import { map } from 'lodash';

@Component
export class Asynent extends Vue {

    @Prop({ type: Promise, required: false })
    public component?: Promise<Vue>;

    public children?: Vue;
    public display: boolean;

    constructor() {
        super(...arguments);
        this.display = false;
    }

    public async mounted() {
        if (this.component) {
            this.children = await this.component;
            this.display = true;
        }
    }

    public render(h) {
        const Children: any = this.children;
        console.log(this)
        return this.display === true && (
            <Children {...this}>
                {map(this.$slots, slot => slot)}
            </Children>
        );
    }
}
