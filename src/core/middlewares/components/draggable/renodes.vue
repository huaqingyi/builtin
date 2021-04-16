<template>
    <draggable
        v-bind="dragOptions"
        tag="div"
        class="container"
        :list="list"
        :value="value"
        @input="emitter"
    >
        <component v-for="el in realValue" :key="el.id" :style="el.style" :is="el.tag">
            <renodes class="item-sub" :list="el.children" />
        </component>
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

    @Prop({ type: Array, required: false, default: null })
    public list!: any[];

    @Prop({ type: Array, required: false, default: null })
    public value!: any[];

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
.container {
    width: 100%;
    height: 100%;
}
</style>
