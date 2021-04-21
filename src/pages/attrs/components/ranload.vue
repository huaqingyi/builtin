<template>
    <div class="upload-container">
        <div class="label">
            <div class="labelext">{{ label }}</div>
            <div class="curr">
                <Select size="mini" v-model="utype">
                    <Option :label="`图片链接`" :value="uploadtype.URL" />
                    <Option :label="`本地图片`" :value="uploadtype.UPLOAD" />
                    <Option :label="`云图片库`" :value="uploadtype.CLOUD" />
                </Select>
            </div>
        </div>
        <div v-if="utype === uploadtype.UPLOAD" class="upload">
            <Upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </Upload>
        </div>
        <div v-if="utype === uploadtype.URL" class="upload-url">
            <Input placeholder="请输入内容" v-model="url[1]" size="mini" class="input-with-select">
                <Select v-model="url[0]" slot="prepend" placeholder="请选择">
                    <Option label="http://" value="http://"></Option>
                    <Option label="https://" value="https://"></Option>
                    <Option label="data:" value="data:"></Option>
                </Select>
            </Input>
        </div>
        <div v-if="utype === uploadtype.CLOUD" class="upload">
            <div class="avatar-uploader">
                <div v-if="value" class="el-upload el-upload--text">
                    <img :src="value" class="avatar" />
                    <span class="el-upload-list__item-actions">
                        <span class="btn">
                            <i class="el-icon-zoom-in" @click="visible = true"></i>
                            <i class="el-icon-delete" @click="() => $emit('input', '')"></i>
                        </span>
                    </span>
                </div>
                <div v-else class="el-upload el-upload--text">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </div>
        </div>
        <el-dialog width="80%" :visible.sync="visible">
            <img width="100%" :src="value" alt />
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Upload, Select, Option, Input } from 'element-ui';
import { map } from 'lodash';

export enum UploadType {
    URL = 'url', UPLOAD = 'upload', CLOUD = 'cloud',
}

@Component({ components: { Upload, Select, Option, Input } })
export default class extends Vue {

    public get uploadtype() {
        return UploadType;
    }

    @Prop({ type: String, required: false, default: UploadType.UPLOAD })
    public type!: UploadType;

    @Prop({ type: String, required: false, default: `` })
    public value!: string;

    @Prop({ type: String, required: false, default: `` })
    public label!: string;

    @Prop({ type: String, required: true })
    public action!: string;

    @Prop({ type: Boolean, required: false, default: false })
    public disabled!: boolean;

    public utype: UploadType;

    public imageUrl: string;

    public url: string[];

    public visible: boolean;

    constructor() {
        super(...arguments);
        this.imageUrl = '';
        this.utype = UploadType.UPLOAD;
        this.url = [];
        this.visible = false;
    }

    @Watch('url', { deep: true })
    public changeUrl() {
        this.$emit('input', this.url.join(''));
    }

    public handleSuccess(res, file) {
        console.log(res, file);
        this.imageUrl = URL.createObjectURL(file.raw);
    }

    public beforeUpload() {
        return true;
    }

    public created() {
        const value = this.value;
        map(['http://', 'https://', 'data:'], pf => {
            if (value.indexOf(pf) === 0) {
                this.url[1] = value.replace(pf, '');
                this.url[0] = pf;
            }
        });
        if (this.url.length === 0) {
            this.url = ['http://', ''];
        }
    }
}
</script>
<style lang="less" scoped>
.upload-container {
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

    .upload {
        display: flex;
        // &:before {
        //     content: "";
        //     flex: 1;
        // }
        &:after {
            content: "";
            flex: 1;
        }
        .avatar-uploader {
            /deep/ .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                &:hover {
                    border-color: #409eff;
                }
            }
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        .el-upload-list__item-actions {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            transition: opacity 0.3s;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &:hover {
                opacity: 1;
            }
            .btn {
                .el-icon-zoom-in,
                .el-icon-delete {
                    margin: 0 8px;
                }
            }
        }
    }

    .upload-url {
        /deep/ .el-select {
            .el-input {
                width: 90px;
            }
        }
        .input-with-select {
            /deep/ .el-input-group__prepend {
                background-color: #fff;
            }
        }
    }
}
</style>
