<template>
    <section class="root">
        <Button type="primary">
            <slot></slot>
        </Button>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button } from 'element-ui';

@Component({ name: 'jz-main', components: { Button } })
export default class extends Vue {
    public async mounted() { }
}
</script>
<style lang="less" scoped>
.root {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 1.25rem 0;
    justify-content: center;
    text-align: center;
    // .item {
    //     display: flex;
    //     flex: 1;
    //     width: 100%;
    // }
}
</style>
