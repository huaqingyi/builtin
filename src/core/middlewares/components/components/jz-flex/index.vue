<template>
    <div class="main">
        <slot></slot>
    </div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.main {
    display: flex;
    justify-content: center;
}
</style>