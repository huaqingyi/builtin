<template>
    <div class="number-container">
        <div class="label">
            <div class="labelext">{{ label }}</div>
            <div class="curr">
                <Select size="mini" v-model="value[1]">
                    <Option :label="`百分比(${inputype.RATE})`" :value="inputype.RATE" />
                    <Option :label="`像素(${inputype.PX})`" :value="inputype.PX" />
                    <Option :label="`分辨率(${inputype.PT})`" :value="inputype.PT" />
                    <Option :label="`自适应(${inputype.REM})`" :value="inputype.REM" />
                </Select>
            </div>
        </div>
        <div v-if="value[1] === inputype.RATE" class="editor">
            <div class="content">
                <Slider v-model="value[0]" show-input input-size="mini" />
            </div>
        </div>
        <div v-else class="editor">
            <div class="content npad">
                <InputNumber
                    class="input-number"
                    v-model="value[0]"
                    controls-position="right"
                    size="mini"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Slider, Select, Option, InputNumber } from 'element-ui';

export enum InputType {
    RATE = '%', PX = 'px', PT = 'pt', REM = 'rem',
}

@Component({
    components: { Slider, Select, Option, InputNumber },
})
export default class extends Vue {

    public get inputype() {
        return InputType;
    }

    @Prop({ type: Array, required: false, default: () => [0, InputType.RATE] })
    public value!: [number, InputType];

    @Prop({ type: String, required: false, default: `` })
    public label!: string;

    constructor() {
        super(...arguments);
    }
}
</script>
<style lang="less" scoped>
.number-container {
    // padding-right: 20px;
    .label {
        display: flex;
        // padding: 0 20px;
        .labelext {
            display: flex;
            flex-direction: column;
            text-align: left;
            vertical-align: middle;
            font-size: 14px;
            line-height: 28px;
            color: #606266;
            box-sizing: border-box;
            &:before {
                content: "";
                flex: 1;
            }
            &:after {
                content: "";
                flex: 1;
            }
        }
        .curr {
            display: flex;
            flex-direction: column;
            width: 102px;
            &:before {
                content: "";
                flex: 1;
            }
            &:after {
                content: "";
                flex: 1;
            }
            /deep/ .el-input {
                .el-input__inner {
                    padding-left: 5px;
                    border: none;
                }
            }
        }
    }
    .editor {
        display: flex;
        flex-wrap: wrap;
        .content {
            flex: 1;
            padding-left: 8px;
            min-width: 260px;
            &.npad {
                padding: 0;
            }
            /deep/ .el-slider__runway {
                margin-right: 120px;
            }
            /deep/ .el-slider__input {
                width: 95px;
            }
            .input-number {
                width: 100%;
            }
        }
    }
}
</style>
