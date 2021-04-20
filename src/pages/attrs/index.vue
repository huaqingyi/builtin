<template>
    <div class="container-main">
        <!-- <div>
            <div>{{ value }}</div>
            <Ranumber v-model="value" label="宽度" />
        </div>-->
        <!-- <div>
            <div>{{ color }}</div>
            <Rancolor v-model="color" label="颜色" />
            <Rancolor v-model="color" label="颜色11111" />
        </div>-->
        <div>
            <div>{{ upload }}</div>
            <Ranload v-model="upload" action="https://jsonplaceholder.typicode.com/posts/" label="图片" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as components from './components';

@Component({ components: { ...components } })
export default class extends Vue {

    public value: [number, string];

    public color: string;

    public upload: string;

    constructor() {
        super(...arguments);
        this.value = [0, '%'];
        this.color = '';
        this.upload = '';
    }
}
</script>
<style lang="less" scoped>
.container-main {
    width: 375px;
    .comp {
        display: flex;
        &:before {
            content: "";
            flex: 1;
        }
        &:after {
            content: "";
            flex: 1;
        }
        .with-wc {
            width: 100%;
        }
        .with-w {
            width: 100%;
            display: flex;
            .with-wi {
                position: relative;
                flex: 1;
                height: 36px;
                &:before {
                    content: "";
                    position: absolute;
                    top: 0.15rem;
                    right: 0.15rem;
                    bottom: 0.15rem;
                    left: 0.15rem;
                    background-color: rgba(0, 0, 0, 0.2);
                }
            }
        }
        .slot {
            min-height: 300px;
            text-align: center;
        }
    }
}
</style>
