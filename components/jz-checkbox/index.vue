<template>
    <div v-if="options.length === 1" class="jz-root">
        <Checkbox
            v-if="type === 'default'"
            :label="options[0].value"
            :disabled="options[0].disabled || false"
        >{{ options[0].label }}</Checkbox>
        <CheckboxButton
            v-else
            :label="options[0].value"
            :disabled="options[0].disabled || false"
        >{{ options[0].label }}</CheckboxButton>
    </div>
    <div v-else class="jz-root">
        <div v-if="cckall" class="branch">
            <Checkbox
                v-if="type === 'default'"
                :indeterminate="indeterminate"
                v-model="all"
                @change="onCheckAllChange"
            >{{ label }}</Checkbox>
            <CheckboxButton
                v-else
                :indeterminate="indeterminate"
                v-model="all"
                @change="onCheckAllChange"
            >{{ label }}</CheckboxButton>
        </div>
        <CheckboxGroup v-if="type === 'default'" v-model="statecked">
            <Checkbox
                v-for="(opt, idx) in options"
                :label="opt.value"
                :key="idx"
                :disabled="opt.disabled || false"
            >{{ opt.label }}</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup v-else v-model="statecked">
            <CheckboxButton
                v-for="(opt, idx) in options"
                :label="opt.value"
                :key="idx"
                :disabled="opt.disabled || false"
            >{{ opt.label }}</CheckboxButton>
        </CheckboxGroup>
    </div>
</template>
  
<script lang="ts">
import { difference, isBoolean, map } from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Checkbox, CheckboxGroup, CheckboxButton } from 'element-ui';
import { CheckboxType } from './types';

export interface CheckboxOption {
    label: string;
    value: string;
    disabled?: boolean;
}

@Component({ name: 'jz-checkbox', components: { Checkbox, CheckboxGroup, CheckboxButton } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: `全选` })
    public label!: string;

    @Prop({ type: String, required: false, default: CheckboxType.DEFALUT })
    public type!: CheckboxType;

    @Prop({
        type: Array, required: false,
        default: () => [{ label: `编辑选项`, value: `编辑选项` }]
    })
    public options!: CheckboxOption[];

    @Prop({ type: Array, required: false, default: () => [] })
    public checked!: string[];

    @Prop({ type: Boolean, required: false, default: undefined })
    public checkAll!: boolean;

    public get ops() {
        return map(this.options, ({ value }) => value);
    }

    public cckall: boolean;
    public all: boolean;
    public statecked: string[];
    public indeterminate: boolean;

    constructor() {
        super(arguments);
        this.statecked = [];
        this.cckall = false;
        this.all = false;
        this.indeterminate = false;
    }

    @Watch('statecked', { deep: true })
    public async ckedchange() {
        await this.checkedISAll();
    }

    public async onCheckAllChange(bool) {
        this.statecked = bool ? this.ops : [];
        this.checkedISAll();
    }

    public async checkedISAll() {
        const iss = difference(this.ops, this.statecked);
        if (iss.length === 0) {
            this.all = true;
            this.indeterminate = false;
        } else {
            if (this.statecked.length !== 0) {
                this.all = true;
                this.indeterminate = true;
            } else {
                this.all = false;
                this.indeterminate = false;
            }
        }
    }

    public async created() {
        this.statecked = this.checked;
        if (isBoolean(this.checkAll)) {
            this.cckall = this.checkAll;
        } else {
            this.cckall = this.options.length > 1 ? true : false;
        }
        this.checkedISAll();
    }
}
</script>
<style lang="less" scoped>
.jz-root {
    display: inline-block;
    .branch {
        border-bottom: 1px solid #e9e9e9;
    }
}
</style>