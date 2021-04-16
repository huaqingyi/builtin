<template>
    <div class="container">
        <!-- <component v-if="$slots.default" :is="$slots.default" /> -->
        <slot v-if="$slots"></slot>
        <template v-else>添加块级元素</template>
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
.container {
    width: 100%;
    height: auto;
}
</style>
