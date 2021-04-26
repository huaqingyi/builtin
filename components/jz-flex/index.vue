<template>
    <div class="jz-root-flex">
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
.jz-root-flex {
    display: flex;
    // justify-content: center;
}
</style>