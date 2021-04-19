<template>
    <div class="main">
        <div class="data">
            <pre>{{ ast }}</pre>
        </div>
        <renodes v-model="ast" class="context" />
        <div class="components">
            <draggable
                :list="components"
                :group="{ name: 'ctx', pull: 'clone', put: false }"
                :clone="cloneDog"
            >
                <div
                    class="list-group-item"
                    v-for="element in components"
                    :key="element.tag"
                >{{ element.tag }}</div>
            </draggable>
        </div>
    </div>
</template>
  
<script lang="ts">
import { groupBy, map } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({ components: { draggable } })
export default class extends Vue {

    public asts: any[];

    public ast: any[];

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

    constructor() {
        super(arguments);
        this.asts = [];
        this.ast = [];
    }

    public cloneDog(data) {
        // console.log(data);
        return { id: ''.uniqueId(), ...data };
    }

    public cycleParse(group: any, idx: number = 0) {
        return map(group[idx], nodes => {
            if (group[nodes.id]) return { ...nodes, children: this.cycleParse(group, nodes.id) };
            else return { ...nodes, children: [] };
        });
    }

    public async onChange(nodes: any[], { added, removed, moved }) {
        this.asts = nodes;
    }

    public async created() {
        const group = groupBy(this.asts, 'parentId');
        const tree = this.cycleParse(group);
        this.ast = [
            // {
            //     id: ''.uniqueId(), tag: 'jz-flex', children: [
            //         { id: ''.uniqueId(), tag: 'jz-flex', children: [], style: { width: '100%', minHeight: '20px', background: 'green' } },
            //         { id: ''.uniqueId(), tag: 'jz-container', children: [], style: { width: '100%', minHeight: '20px', background: 'blue' } },
            //     ], style: { width: '100%', minHeight: '20px', background: 'green' },
            // },
        ];
    }
}
</script>
<style lang="less" scoped>
.main {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    .data {
        width: 20%;
    }
    .context {
        flex: 1;
        .context-inner {
            width: 100%;
            height: auto;
            .list-group-item-padd {
                padding: 0.75rem;
            }
        }
    }
    // .components {
    //     width: 30%;
    //     border: 1px solid;
    //     .components-warrp {
    //         position: relative;
    //         width: 25%;
    //         display: inline-block;
    //         &:before {
    //             content: "";
    //             padding-top: 100%;
    //             display: block;
    //         }
    //         .components-container {
    //             position: absolute;
    //             top: 0.75rem;
    //             right: 0.75rem;
    //             bottom: 0.75rem;
    //             left: 0.75rem;
    //             border: 1px solid red;
    //             .components-render {
    //                 position: absolute;
    //                 top: 50%;
    //                 right: 50%;
    //                 transform: translate(50%, -50%);
    //             }
    //         }
    //     }
    // }

    .flexbox {
        display: flex;
    }

    .handle,
    .fhandle {
        cursor: pointer;
        background-color: #675e6f;
        height: 0.75rem;
        width: 100%;
    }

    .row {
        border: 1px solid;
    }
    .flex {
        display: flex;
        border: 1px solid;
        .flex-ctx {
        }
        .flex-item {
            flex: 1;
        }
    }
}
</style>