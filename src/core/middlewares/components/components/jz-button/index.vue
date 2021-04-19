<template>
    <div class="jz-root">
        <Button :type="type">
            <slot></slot>
        </Button>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button } from 'element-ui';

@Component({ name: 'jz-button', components: { Button } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: 'primary' })
    public type!: string;

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.jz-root {
    display: inline-block;
}
</style>