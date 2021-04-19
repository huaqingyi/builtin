<template>
    <span class="main">
        <div class="container">
            <div class="content">
                <i v-if="builtin" :class="builtin" :style="{ color, backgroundColor }" />
                <i
                    v-else
                    class="link"
                    :style="{ color, backgroundColor, backgroundImage: `url(${href})` }"
                />
            </div>
        </div>
    </span>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

    @Prop({ type: String, required: false, default: 'el-icon-edit' })
    public builtin!: string;

    @Prop({ type: String, required: false })
    public href!: string;

    @Prop({ type: String, required: false })
    public color!: string;

    @Prop({ type: String, required: false })
    public backgroundColor!: string;

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.main {
    min-width: 20px;
    display: inline-block;
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .content {
            flex: 1;
            display: flex;
            justify-content: center;
            .link {
                width: 20px;
                height: 20px;
                display: inline-block;
                background-size: 100% auto;
                background-position: center;
            }
        }
    }
}
</style>
