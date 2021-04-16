<template>
    <div class="container">
        <div class="handle"></div>
        <draggable
            class="row"
            :list="[...elements]"
            @change="row => onChange(element, row)"
            @choose="row => onChoose(element, row)"
            group="ctx"
            item-key="id"
        >
            <template #item="{ element }">
                <component
                    :is="element.tag.replace('ctnr', 'drag')"
                    :elements="element.children"
                    :element="element"
                    :style="element.style"
                    :asts="asts"
                    @changeNodes="changeNodes"
                />
            </template>
        </draggable>
    </div>
</template>
<script lang="ts">
import { differenceBy, isNumber, remove } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({ components: { draggable } })
export default class extends Vue {

    public get emptys() {
        return [{ content: '' }];
    }

    @Prop({
        type: Array, required: false, default: () => [
            { tag: 'ctnrcontainer', style: { width: '100%', height: 'auto', background: 'blue' } }
        ]
    })
    public elements!: any[];

    @Prop({ type: Object, required: false })
    public element!: any;

    @Prop({ type: Array, required: true })
    public asts!: any[];

    constructor() {
        super(arguments);
    }

    public async changeNodes(nodes: any[], ...props: any[]) {
        this.$emit('changeNodes', nodes, ...props);
    }

    public async onChange(element, { added, removed, moved, ...props }) {
        if (added) {
            let nodes = [...this.elements];
            let asts = [...this.asts];
            asts = differenceBy(this.asts, nodes, 'id');
            const row = { ...added.element, parentId: element.id };
            nodes = nodes.slice(0, added.newIndex).concat([row]).concat(nodes.slice(added.newIndex));
            asts = asts.concat(nodes);
            if (isNumber(added.element.parentId)) {
                remove(asts, ({ id, parentId }) => id === added.element.id && parentId === added.element.parentId);
            }
            this.$emit('changeNodes', asts, { added: row, removed, moved, ...props });
        } else if (removed) {
            // console.log(234234, removed);
            // this.$emit('changeNodes', filter(this.asts, ({ id, parentId }) => {
            //     return !(id === removed.element.id && parentId === element.id);
            // }));
        } else if (moved) {
            // console.log('moved', moved);
            let nodes = [...this.elements];
            let asts = differenceBy(this.asts, nodes, 'id');
            const oldRow = { ...moved.element, parentId: element.id };
            nodes = nodes.slice(0, moved.oldIndex).concat(nodes.slice(moved.oldIndex + 1));
            nodes = nodes.slice(0, moved.newIndex).concat([oldRow]).concat(nodes.slice(moved.newIndex));
            this.$emit('changeNodes', asts.concat(nodes), { added, removed, moved, ...props });
        }
    }

    public async onChoose(element, { added, removed }) {
        // if (added) {
        //     const id = (this.asts[this.asts.length - 1] || {}).id || 0;
        //     const nrow = { ...added.element, id: id + 1, parentId: element.id };
        //     this.asts.push(nrow);
        // } else if (removed) {
        //     remove(this.asts, ast => ast.id === removed.element.id);
        // }
        // console.log(2222, this.asts);
    }

    public async created() {
        // console.log(222, this.element, this.elements);
    }
}
</script>
<style lang="less" scoped>
.container {
    .handle {
        cursor: pointer;
        background-color: #675e6f;
        height: 0.75rem;
        width: 100%;
    }
    .row {
        border: 1px solid;
        min-width: 3.75rem;
        min-height: 1.25rem;
    }
}
</style>
