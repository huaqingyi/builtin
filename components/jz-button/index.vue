<template>
    <div class="jz-root-inline">
        <div class="container">
            <Button :type="type">
                <slot></slot>
            </Button>
        </div>
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
.jz-root-inline {
    display: inline-block;
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        &:before {
            content: "";
            flex: 1;
        }
        &:after {
            content: "";
            flex: 1;
        }
    }
}
</style>