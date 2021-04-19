import { map } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import './index.less';

@Component({ components: { draggable } })
export default class extends Vue {

    public asts: any[];

    public ast: any[];

    public view: any;

    constructor() {
        super(arguments);
        this.asts = [];
        this.ast = [];
        this.view = {};
    }

    public get components() {
        return [
            { tag: 'jz-flex', children: [], style: { width: '100%', minHeight: '20px', background: 'green' }, slot: true },
            { tag: 'jz-container', children: [], style: { width: '100%', minHeight: '20px', background: 'blue' }, slot: true },
            { tag: 'jz-button', children: [], slot: true },
            { tag: 'jz-checkbox', children: [], slot: false },
            { tag: 'jz-datepicker', children: [], slot: false },
            { tag: 'jz-icon', children: [], slot: false },
            { tag: 'jz-img', children: [], slot: false },
            { tag: 'jz-input', children: [], slot: false },
            { tag: 'jz-menu', children: [], slot: false },
            { tag: 'jz-radio', children: [], slot: false },
            { tag: 'jz-select', children: [], slot: false },
            { tag: 'jz-swiper', children: [], slot: false },
            { tag: 'jz-tabs', children: [], slot: true },
            { tag: 'jz-text', children: [], slot: false },
            { tag: 'jz-textarea', children: [], slot: false },
        ];
    }

    public cloneDog(data) {
        // console.log(data);
        return { id: ''.uniqueId(), ...data };
    }

    public render() {
        return (
            <div class="main">
                <div class="data">
                    <pre>{JSON.stringify(this.ast, null, 2)}</pre>
                </div>
                <renodes value={this.ast} onInput={ast => this.ast = ast} class="context" />
                <div class="components">
                    <draggable list={this.components} group={{
                        name: 'ctx', pull: 'clone', put: false,
                    }} clone={this.cloneDog.bind(this)}>
                        {map(this.components, element => (
                            <div key={element.tag}>{element.tag}</div>
                        ))}
                    </draggable>
                </div>
            </div>
        );
    }
}
