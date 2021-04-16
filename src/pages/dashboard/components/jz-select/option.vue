<template>
    <Option
        v-if="!option.children"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
    />
    <OptionGroup :label="option.label" v-else>
        <JZOption v-for="(opt,idx) in option.children" :option="opt" :key="idx" />
    </OptionGroup>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { OptionGroup, Option } from 'element-ui';

export interface SelectOptions {
    label: string;
    value: string;
    disabled?: boolean;
    children?: SelectOptions[];
}

@Component({ components: { OptionGroup, Option } })
export default class JZOption extends Vue {

    @Prop({ type: Object, required: false })
    public option!: SelectOptions;

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.main {
}
</style>