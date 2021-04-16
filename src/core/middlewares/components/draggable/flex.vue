<template>
    <div class="ctx">
        <slot class="tab" v-if="$slots"></slot>
        <template v-else>
            <div class="tab">添加行级元素</div>
        </template>
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
.ctx {
    width: 100%;
    height: auto;
    display: flex;
    .tab {
        background: aqua;
    }
}
</style>
