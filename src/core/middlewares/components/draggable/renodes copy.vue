<template>
    <draggable
        v-bind="dragOptions"
        :tag="(parent && parent.tag) ? parent.tag : 'div'"
        :style="(parent || {}).style"
        class="draggable"
        :list="list"
        :value="value"
        @input="emitter"
    >
        <template v-for="el in realValue">
            <renodes v-if="el.slot" v-model="el.children" :parent="el" :key="el.id" />
            <component v-else :style="el.style" :is="el.tag" :key="el.id" />
        </template>
    </draggable>
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
</style>
