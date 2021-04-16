<template>
    <draggable
        class="context"
        :list="[...ast]"
        :group="{ name: 'ctx' }"
        handle=".handle"
        @change="onChange"
        @choose="onChoose"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
    >
        <template #item="{ element }">
            <component
                v-if="element.tag.indexOf('ctnr') === 0"
                :is="element.tag.replace('ctnr', 'drag')"
                :elements="element.children"
                :element="element"
                :style="element.style"
                :asts="asts"
                @changeNodes="changeNodes"
            />
            <dragmoved
                v-else
                :elements="element.children"
                :element="element"
                :asts="asts"
                @changeNodes="changeNodes"
            >
                <component :is="element.tag" :style="element.style" @add="onAdd(element)">
                    <component
                        v-for="el in element.children"
                        :key="el.id"
                        :is="el.tag.replace('ctnr', 'drag')"
                        :elements="el.children"
                        :element="el"
                        :style="el.style"
                        :asts="asts"
                        @changeNodes="changeNodes"
                    />
                </component>
            </dragmoved>
        </template>
    </draggable>
</template>
<script lang="ts">
import { differenceBy, isNumber, map, max, remove } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({ name: 'renodes', components: { draggable } })
export default class extends Vue {

    public get components() {
        const id = (max(map(this.asts, ({ id }) => id || 0)) || 0) + 1;
        return [
            { id, tag: 'ctnrflex', style: { width: '100%', height: 'auto', background: 'green' } },
            { id, tag: 'ctnrcontainer', style: { width: '100%', height: 'auto', background: 'blue' } },
        ];
    }

    @Prop({ type: Array, required: true })
    public ast!: any[];

    @Prop({ type: Array, required: true })
    public asts!: any[];

    public drag: Boolean;

    constructor() {
        super(arguments);
        this.drag = false;
    }

    public async onAdd(element) {
        const id = (max(map(this.asts, ({ id }) => id || 0)) || 0) + 1;
        const added = { id, parentId: element.id, tag: 'ctnrcontainer', style: { width: '100%', height: 'auto', background: 'yellow' } };
        let asts = [...this.asts];
        asts.push(added);
        this.$emit('changeNodes', asts, { added });
    }

    public async changeNodes(nodes: any[], ...props: any[]) {
        this.$emit('changeNodes', nodes, ...props);
    }

    public async onChange({ added, removed, moved, ...props }) {
        if (added) {
            let nodes = [...this.ast];
            let asts = [...this.asts];
            asts = differenceBy(this.asts, nodes, 'id');
            const row = { ...added.element, parentId: 0 };
            nodes = nodes.slice(0, added.newIndex).concat([row]).concat(nodes.slice(added.newIndex));
            asts = asts.concat(nodes);
            if (isNumber(added.element.parentId)) {
                remove(asts, ({ id, parentId }) => id === added.element.id && parentId === added.element.parentId);
            }
            this.$emit('changeNodes', asts, { added: row, removed, moved, ...props });
        } else if (removed) {
            // console.log(234234, removed);
            // this.$emit('changeNodes', filter(this.asts, ({ id, parentId }) => {
            //     return !(id === removed.element.id && parentId === removed.element.parentId);
            // }));
        } else if (moved) {
            let nodes = [...this.ast];
            let asts = differenceBy(this.asts, nodes, 'id');
            const oldRow = nodes[moved.oldIndex];
            nodes = nodes.slice(0, moved.oldIndex).concat(nodes.slice(moved.oldIndex + 1));
            nodes = nodes.slice(0, moved.newIndex).concat([oldRow]).concat(nodes.slice(moved.newIndex));
            this.$emit('changeNodes', asts.concat(nodes), { added, removed, moved, ...props });
        }
    }

    public async onChoose({ added, removed }) {
        // if (added) {
        //     const id = (this.asts[this.asts.length - 1] || {}).id || 0;
        //     const nrow = { ...added.element, id: id + 1 };
        //     this.asts.push(nrow);
        // } else if (removed) {
        //     remove(this.asts, ast => ast.id === removed.element.id);
        // }
        // console.log(2222, this.asts);
    }

    public async created() {
        // console.log(this.asts);
    }
}
</script>
<style lang="less" scoped>
.flexbox {
    display: flex;
    width: 100%;
}

.container {
    position: relative;
    .btn {
        position: absolute;
        top: 0px;
        left: 0px;
        background: grey;
        z-index: 9999;
        &.handle {
            padding: 8px;
        }
    }

    .cdle {
        width: 100%;
        .conandle {
            position: relative;
            &:hover {
                .conandle-handle {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    bottom: 0px;
                    left: 0px;
                    background: rgba(255, 255, 255, 0.7);
                }
            }
        }
    }
}
</style>
