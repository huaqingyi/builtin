<template>
    <div class="container">
        <div class="label">{{ label }}</div>
        <div class="upload">
            <Upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                drag
                :on-preview="handlePictureCardPreview"
            >
                <i class="el-icon-plus"></i>
            </Upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Upload } from 'element-ui';

@Component({ components: { Upload } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: `` })
    public value!: string;

    @Prop({ type: String, required: false, default: `` })
    public label!: string;

    @Prop({ type: String, required: true })
    public action!: string;

    @Prop({ type: Boolean, required: false, default: false })
    public disabled!: boolean;

    public dialogImageUrl: string;
    public dialogVisible: boolean;

    constructor() {
        super(...arguments);
        this.dialogImageUrl = '';
        this.dialogVisible = false;
    }

    public onInput(color) {
        this.$emit('input', color);
    }

    public handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
    }

    public handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    }

    public created() {
    }
}
</script>
<style lang="less" scoped>
.container {
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

    .upload {
    }
}
</style>
