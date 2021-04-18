<template>
    <!-- <draggable
        v-if="parent"
        v-bind="dragOptions"
        tag="div"
        class="container-drag"
        :list="list"
        :value="value"
        @input="emitter"
    >
        <renodes v-for="el in realValue" :key="el.id" :list="el.children" />
    </draggable>
    <draggable
        v-else
        v-bind="dragOptions"
        :tag="parent.tag"
        :style="parent.style"
        :list="list"
        :value="value"
        @input="emitter"
    >
        <component v-for="el in realValue" :key="el.id" :style="el.style" :is="el.tag">
            <renodes :list="el.children" />
        </component>
    </draggable>-->
    <draggable v-if="!parent" class="dragArea" tag="div" :group="{ name: 'g1' }">
        <component v-for="el in realValue" :key="el.tag" :is="el.tag" :style="el.style">
            <renodes :list="el.children" :parent="el" />
        </component>
    </draggable>
    <draggable v-else :tag="parent.tag" :style="parent.style" :group="{ name: 'g1' }">
        <component v-for="el in realValue" :key="el.tag" :is="el.tag" :style="el.style">
            <renodes :list="el.children" :parent="el" />
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

    @Prop({ type: Object, required: false, default: null })
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
.container-drag {
    width: 100%;
    height: 100%;
}
</style>
