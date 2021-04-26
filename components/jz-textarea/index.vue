<template>
    <div class="jz-root-inline">
        <div class="container">
            <Input
                type="textarea"
                :placeholder="placeholder"
                :autosize="{ minRows: autosize[0], maxRows: autosize[1] }"
                v-model="value"
            />
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Input } from 'element-ui';

@Component({ name: 'jz-textarea', components: { Input } })
export default class extends Vue {

    @Prop({ type: Array, required: false, default: () => [2, 4] })
    public autosize!: number[];

    @Prop({ type: String, required: false, default: '请填写内容' })
    public placeholder!: string;

    @Prop({ type: String, required: false, default: `` })
    public def!: string;

    public value: string;

    constructor() {
        super(arguments);
        this.value = '';
    }
}
</script>
<style lang="less" scoped>
.jz-root-inline {
    width: 300px;
    display: inline-block;
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        &:before {
            content: "";
            flex: 1;
        }
        &:after {
            content: "";
            flex: 1;
        }
    }
}
</style>