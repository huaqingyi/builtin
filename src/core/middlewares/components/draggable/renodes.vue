<template>
    <div>
        <div class="handle"></div>
        <draggable
            v-bind="dragOptions"
            tag="tsnder"
            :component-data="componentData()"
            :style="(parent || {}).style"
            :class="{ draggable: true, dragbox: parent && parent.tag ? true : false }"
            handle=".handle"
            :list="list"
            :value="value"
            @input="emitter"
        >
            <renodes v-for="el in realValue" v-model="el.children" :parent="el" :key="el.id" />
            <!-- <template v-for="el in realValue">
            <renodes v-if="el.slot" v-model="el.children" :parent="el" :key="el.id" />
            <tsnder class="dragbox" v-else :style="el.style" :is="el.Component" :key="el.id" />
            </template>-->
        </draggable>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({ name: 'renodes', components: { draggable } })
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

    .handle {
        padding: 0.75rem;
        background: #000;
    }
}
.dragbox {
    background: rgba(0, 0, 0, 0.05);
    &:hover {
        border: 1px dashed #000;
    }
}
</style>
