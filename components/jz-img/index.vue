<template>
    <el-image class="jz-root" :src="url" :fit="fit" :preview-src-list="[url]" lazy>
        <div slot="placeholder" class="image-slot">
            <span class="dot">{{ placeholder }}</span>
        </div>
        <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
        </div>
    </el-image>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button } from 'element-ui';
import { ImageFits } from './types';

@Component({ name: 'jz-img', components: { Button } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' })
    public url!: string;

    @Prop({ type: String, required: false, default: ImageFits.COVER })
    public fit!: string;

    @Prop({ type: String, required: false, default: '加载中 ...' })
    public placeholder!: string;

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.jz-root {
    width: 100%;
    display: inline-block;
}
</style>