<template>
    <div class="jz-root-cflex">
        <slot></slot>
    </div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'jz-container' })
export default class extends Vue {
    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.jz-root-cflex {
    flex: 1;
    display: flex;
    flex-direction: column;
    // align-content: center;
}
</style>