<template>
    <div class="jz-root-inline">
        <div class="container">
            <RadioGroup v-if="type === 'default'" v-model="value">
                <Radio
                    v-for="(opt,idx) in options"
                    :key="idx"
                    :label="opt.value"
                    :disabled="opt.disabled"
                >{{ opt.label }}</Radio>
            </RadioGroup>
            <RadioGroup v-else v-model="value">
                <RadioButton
                    v-for="(opt,idx) in options"
                    :key="idx"
                    :label="opt.value"
                    :disabled="opt.disabled"
                >{{ opt.label }}</RadioButton>
            </RadioGroup>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RadioGroup, Radio, RadioButton } from 'element-ui';
import { CheckboxType } from './types';

export interface RadioOptions {
    label: string;
    value: string;
    disabled?: boolean;
}

@Component({ name: 'jz-radio', components: { RadioGroup, Radio, RadioButton } })
export default class extends Vue {

    @Prop({ type: Array, required: false, default: () => [{ label: '添加选项', value: '添加选项' }] })
    public options!: RadioOptions[];

    @Prop({ type: String, required: false, default: CheckboxType.DEFALUT })
    public type!: CheckboxType;

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