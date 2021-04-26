<template>
    <div class="jz-root-inline">
        <div class="container">
            <Select
                v-model="value"
                :multiple="multiple"
                :collapse-tags="collapse"
                :filterable="filterable"
                :allow-create="create"
                :placeholder="placeholder"
                class="inputs"
            >
                <Option v-for="(opt,idx) in options" :key="idx" :option="opt" />
            </Select>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Select } from 'element-ui';
import Option from './option.vue';

export interface SelectOptions {
    label: string;
    value: string;
    disabled?: boolean;
    children?: SelectOptions[];
}

@Component({ name: 'jz-select', components: { Select, Option } })
export default class extends Vue {

    @Prop({ type: Array, required: false, default: () => [{ label: '请添加选项', value: '请添加选项' }] })
    public options!: SelectOptions[];

    @Prop({ type: String, required: false, default: '请选择' })
    public placeholder!: string;

    @Prop({ type: Boolean, required: false, default: false })
    public multiple!: boolean;

    @Prop({ type: Boolean, required: false, default: false })
    public collapse!: boolean;

    @Prop({ type: Boolean, required: false, default: false })
    public filterable!: boolean;

    @Prop({ type: Boolean, required: false, default: false })
    public create!: boolean;

    @Prop({ type: Array, required: false, default: () => [] })
    public def!: string[];

    public value: string | string[];

    constructor() {
        super(arguments);
        this.value = '';
    }

    public created() {
        if (this.multiple !== true) this.value = this.def[0] || '';
        else this.value = this.def;
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