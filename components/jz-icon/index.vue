<template>
    <div class="jz-root-inline">
        <div class="container">
            <div class="content">
                <i
                    class="jz-icon"
                    v-if="builtin"
                    :class="builtin"
                    :style="{ color, backgroundColor }"
                />
                <i
                    class="link jz-icon"
                    v-else
                    :style="{ color, backgroundColor, backgroundImage: `url(${href})` }"
                />
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'jz-icon' })
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
.jz-root-inline {
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
            .jz-icon{
                font-size: 20px;
            }
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
