<template>
    <Select
        v-model="value"
        :multiple="multiple"
        :collapse-tags="collapse"
        :filterable="filterable"
        :allow-create="create"
        :placeholder="placeholder"
        class="main"
    >
        <Option v-for="(opt,idx) in options" :key="idx" :option="opt" />
    </Select>
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

@Component({ components: { Select, Option } })
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
.main {
    width: 200px;
}
</style>