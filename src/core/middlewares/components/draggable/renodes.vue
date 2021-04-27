<template>
    <jz-draggable
        v-if="parent.slot === true"
        v-bind="dragOptions"
        :tag="parent.Component"
        :style="(parent || {}).style"
        class="draggable dragbox"
        :list="list"
        :value="value"
        @input="emitter"
    >
        <renodes v-for="el in realValue" v-model="el.children" :parent="el" :key="el.id" />
    </jz-draggable>
    <component v-else :style="(parent || {}).style" class="dragbox" :is="parent.Component" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'renodes' })
export default class Renodes extends Vue {

    public get dragOptions() {
        return {
            animation: 200,
            group: 'ctx',
            disabled: false,
            ghostClass: 'ghost'
        };
    }

    public get realValue() {
        return this.value ? this.value : this.list;
    }

    @Prop({ type: Array, required: false })
    public list?: any[];

    @Prop({ type: Array, required: false })
    public value?: any[];

    @Prop({ type: Object, required: false })
    public parent?: any;

    constructor() {
        super(arguments);
    }

    public componentData() {
        if (!this.parent) return {};
        return { props: { component: this.parent.Component } };
    }

    public emitter(value) {
        this.$emit('input', value);
    }

    public async created() {
    }
}
</script>
<style lang="less" scoped>
.draggable {
    position: relative;
    padding: 0.15rem 0.75rem;
}
.dragbox {
    position: relative;
    background: rgba(0, 0, 0, 0.05);
    &:hover {
        border: 1px dashed #000;
    }
    .dragbox-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}
</style>
