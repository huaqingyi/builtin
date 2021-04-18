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
                item-key="id"
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
import { groupBy, map, max } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({ components: { draggable } })
export default class extends Vue {

    public asts: any[];

    public ast: any[];

    public get components() {
        return [
            { tag: 'ctnrflex', children: [], style: { width: '100%', minHeight: '20px', background: 'green' } },
            { tag: 'ctnrcontainer', children: [], style: { width: '100%', minHeight: '20px', background: 'blue' } },
        ];
    }

    constructor() {
        super(arguments);
        this.asts = [];
        this.ast = [];
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
            {
                tag: 'ctnrflex', children: [
                    { tag: 'ctnrflex', children: [], style: { minHeight: '20px', background: 'green' } },
                    { tag: 'ctnrcontainer', children: [], style: { minHeight: '20px', background: 'blue' } },
                ], style: { width: '100%', minHeight: '20px', background: 'green' },
            },
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