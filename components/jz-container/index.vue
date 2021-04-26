<template>
    <!-- <div class="jz-root-cflex">
        <slot></slot>
    </div> -->
    <Row type="flex" class="jz-root-cflex">
        <slot></slot>
    </Row>
</template>
  
<script lang="ts">
import { Row } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'jz-container', components: { Row } })
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