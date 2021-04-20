<template>
    <div class="jz-root">
        <slot></slot>
    </div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'jz-flex' })
export default class extends Vue {

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.jz-root {
    display: flex;
    // justify-content: center;
}
</style>