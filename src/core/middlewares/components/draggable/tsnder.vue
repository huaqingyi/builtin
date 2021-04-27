<template>
    <component v-if="component" :is="component">
        <slot></slot>
    </component>
    <div v-else>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

    @Prop({ type: Function, required: false })
    public component!: Vue;

    @Prop({ type: String, required: false })
    public handle!: string;

    constructor() {
        super(arguments);
    }

    public async mounted() {
        console.log(this);
    }
}
</script>
<style lang="less" scoped>
</style>

