<template>
    <div>
        <renodes v-model="ast" class="container" />
    </div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

    public ast: any[];

    constructor() {
        super(arguments);
        this.ast = [];
    }

    public async created() {
    }
}
</script>
<style lang="less" scoped>
.container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
}
</style>