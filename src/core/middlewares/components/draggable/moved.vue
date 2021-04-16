<template>
    <div class="container">
        <div class="handle"></div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { map, max } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({ components: { draggable } })
export default class extends Vue {

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

    public async created() {
        if (this.elements.length === 0) {
            const id = (max(map(this.asts, ({ id }) => id || 0)) || 0) + 1;
            const added = { id, parentId: (this.element as any).id, tag: 'ctnrcontainer', style: { width: '100%', height: 'auto', background: 'yellow' } };
            let asts = [...this.asts];
            asts.push(added);
            this.$emit('changeNodes', asts, { added });
        }
    }

    public async changeNodes(nodes: any[], ...props: any[]) {
        this.$emit('changeNodes', nodes, ...props);
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: auto;
    background: rgb(245, 245, 245);
    .handle {
        cursor: pointer;
        background-color: #675e6f;
        height: 0.75rem;
        width: 100%;
    }
}
</style>
