<template>
    <span class="main">
        <DatePicker
            class="date"
            v-if="type === 'date'"
            v-model="value"
            :type="type"
            :placeholder="placeholder"
        />
        <DatePicker
            class="date"
            v-if="type === 'week'"
            v-model="value"
            :type="type"
            format="yyyy 第 WW 周"
            :placeholder="placeholder"
        />
        <DatePicker
            class="date"
            v-if="type === 'month'"
            v-model="value"
            :type="type"
            :placeholder="placeholder"
        />
        <DatePicker
            class="date"
            v-if="type === 'year'"
            v-model="value"
            :type="type"
            :placeholder="placeholder"
        />
        <DatePicker
            class="date"
            v-if="type === 'dates'"
            v-model="value"
            :type="type"
            :placeholder="placeholder"
        />
        <DatePicker
            class="date"
            v-if="type === 'daterange'"
            v-model="value"
            :type="type"
            range-separator="-"
            :start-placeholder="placeholder"
            :end-placeholder="placeholder"
        />
        <DatePicker
            class="date"
            v-if="type === 'monthrange'"
            v-model="value"
            :type="type"
            range-separator="-"
            :start-placeholder="placeholder"
            :end-placeholder="placeholder"
        />
    </span>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DatePicker } from 'element-ui';

export enum DateType {
    DATE = 'date',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year',
    DATES = 'dates',
    DATERANGE = 'daterange',
    MONTHRANGE = 'monthrange',
}

@Component({ components: { DatePicker } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: DateType.DATE })
    public type!: DateType;

    @Prop({ type: String, required: false, default: `选择日期` })
    public placeholder!: DateType;

    @Prop({ type: Array, required: false, default: () => [] })
    public def!: string[];

    public value: string | string[];

    constructor() {
        super(arguments);
        this.value = '';
        if (this.def.length === 1) this.value = this.def[0];
        if (this.def.length > 1) this.value = this.def;
    }
}
</script>
<style lang="less" scoped>
.main {
    display: inline-block;
    width: 200px;
    .date {
        width: 100%;
    }
}
</style>