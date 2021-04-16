<template>
    <Button class="main" :type="type">
        <slot></slot>
    </Button>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button } from 'element-ui';

@Component({ components: { Button } })
export default class extends Vue {

    @Prop({ type: String, required:false, default: 'primary' })
    public type!:string;

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.main {
}
</style>