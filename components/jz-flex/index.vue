<template>
    <Row  class="jz-root" type="flex">
        <slot></slot>
    </Row>
</template>
  
<script lang="ts">
import { Row } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'jz-flex', components: { Row } })
export default class extends Vue {

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.jz-root {
    // display: flex;
    // justify-content: center;
}
</style>