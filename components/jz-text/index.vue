<template>
    <div class="jz-root">
        <slot></slot>
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
.jz-root {
    display: inline-block;
}
</style>