<template>
    <div class="jz-root-inline">
        <div class="container">
            <Input
                class="inputs"
                v-model="value"
                :placeholder="placeholder"
                :disabled="disabled"
                :show-password="password"
                :suffix-icon="suffixIcon"
                :prefix-icon="prefixIcon"
                clearable
            />
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Input } from 'element-ui';

@Component({ name: 'jz-input', components: { Input } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: '请输入内容' })
    public placeholder!: string;

    @Prop({ type: Boolean, required: false, default: false })
    public disabled!: boolean;

    @Prop({ type: Boolean, required: false, default: false })
    public password!: boolean;

    @Prop({ type: String, required: false, default: '' })
    public prefixIcon!: string;

    @Prop({ type: String, required: false, default: '' })
    public suffixIcon!: string;

    @Prop({ type: String, required: false, default: '' })
    public def!: string;

    public value: string;

    constructor() {
        super(arguments);
        this.value = '';
    }

    public created() {
        this.value = this.def;
    }
}
</script>
<style lang="less" scoped>
.jz-root-inline {
    width: 200px;
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
        .inputs {
            width: 100%;
        }
    }
}
</style>