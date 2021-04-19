<template>
    <span class="main">
        <Input
            type="textarea"
            :placeholder="placeholder"
            :autosize="{ minRows: autosize[0], maxRows: autosize[1] }"
            v-model="value"
        />
    </span>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Input } from 'element-ui';

@Component({ components: { Input } })
export default class extends Vue {

    @Prop({ type: Array, required: false, default: () => [2, 4] })
    public autosize!: number[];

    @Prop({ type: String, required: false, default: '请填写内容' })
    public placeholder!: string;

    public value: string;

    constructor() {
        super(arguments);
        this.value = '';
    }
}
</script>
<style lang="less" scoped>
.main {
    display: inline-block;
    width: 300px;
}
</style>