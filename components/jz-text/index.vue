<template>
    <div class="jz-root-inline">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'jz-text' })
export default class extends Vue {

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