<template>
    <div class="container">
        <div class="label">{{ label }}</div>
        <ColorPicker :value="color" @input="onInput" show-alpha />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ColorPicker } from 'element-ui';

@Component({ components: { ColorPicker } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: `rgba(255, 255, 255, 1)` })
    public value!: string;

    @Prop({ type: String, required: false, default: `` })
    public label!: string;

    public color: string;

    constructor() {
        super(...arguments);
        this.color = '';
    }

    public onInput(color) {
        this.$emit('input', color);
    }

    public created() {
        if (!this.value) {
            this.$emit('input', `rgba(255, 255, 255, 1)`);
        }
        this.color = this.value || `rgba(255, 255, 255, 1)`;
    }
}
</script>
<style lang="less" scoped>
.container {
    display: inline-block;
    width: auto;
    .label {
        display: flex;
        flex-direction: column;
        text-align: left;
        vertical-align: middle;
        font-size: 14px;
        line-height: 28px;
        color: #606266;
        box-sizing: border-box;
    }
}
</style>
