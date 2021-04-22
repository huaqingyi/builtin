<template>
    <div class="container">
        Attrs ...
    </div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

    constructor() {
        super(arguments);
    }

    public async created() {
    }
}
</script>
<style lang="less" scoped>
.container {
}
</style>