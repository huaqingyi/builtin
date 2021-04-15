<template>
    <vue-dropzone
        :id="id"
        :options="dropzoneOptions"
        :use-custom-slot="true"
        @vdropzone-removed-file="dropzoneRemovedFile"
        @vdropzone-success="dropzoneSuccess"
    >
        <div class="dropzone-custom-content">
            <h3
                class="dropzone-custom-title"
                :style="{ color: themeColor }"
            >Drag and drop to upload content!</h3>
            <div class="subtitle">...or click to select a file from your computer</div>
        </div>
    </vue-dropzone>
</template>

<script lang="ts">
import VueDropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { SettingsModule } from '@/store/modules/settings';

@Component({
    name: 'Dropzone',
    components: {
        VueDropzone,
    },
})
export default class extends Vue {
    // You can add more Prop, see: https://www.dropzonejs.com/#configuration
    @Prop({ required: true })
    public id!: string;

    @Prop({ required: true })
    public url!: string;

    @Prop({ default: 200 })
    public thumbnailHeight!: number;

    @Prop({ default: 200 })
    public thumbnailWidth!: number;

    @Prop({ default: 4 })
    public maxFiles!: number;

    @Prop({ default: 5 })
    public maxFilesize!: number; // In MB

    @Prop({ default: true })
    public autoProcessQueue!: boolean;

    @Prop({ default: true })
    public addRemoveLinks!: boolean;

    @Prop({ default: 'Drop files here to upload' })
    public dictDefaultMessage!: string;

    @Prop({ default: 'Your broswer does not support dropzone.js' })
    public dictFallbackMessage!: string;

    @Prop({ default: 'Remove' })
    public dictRemoveFile!: string;

    @Prop({ default: 'Max Files Exceeded' })
    public dictMaxFilesExceeded!: string;

    public get dropzoneOptions() {
        return {
            url: this.url,
            thumbnailWidth: this.thumbnailWidth,
            thumbnailHeight: this.thumbnailHeight,
            maxFiles: this.maxFiles,
            maxFilesize: this.maxFilesize,
            autoProcessQueue: this.autoProcessQueue,
            addRemoveLinks: this.addRemoveLinks,
            dictDefaultMessage: this.dictDefaultMessage,
            dictFallbackMessage: this.dictFallbackMessage,
            dictRemoveFile: this.dictRemoveFile,
            dictMaxFilesExceeded: this.dictMaxFilesExceeded,
        };
    }

    public get themeColor() {
        return SettingsModule.theme;
    }

    // You can add more Event handler, see: https://rowanwins.github.io/vue-dropzone/docs/dist/#/events
    public dropzoneSuccess(file: File, response: any) {
        this.$emit('dropzone-success', file, response);
    }

    public dropzoneRemovedFile(file: File, error: Error, xhr: XMLHttpRequest) {
        this.$emit('dropzone-removed-file', file, error, xhr);
    }
}
</script>

<style lang="scss" scoped>
.dropzone-custom-content {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.subtitle {
    color: #314b5f;
}

.dropzone {
    min-height: 250px;
}
</style>
