<template>
    <Tabs class="jz-root" v-model="activeName" :type="type">
        <TabPane v-for="(name, idx) in children" :key="idx" :label="name" :name="name">
            <slot :name="name"></slot>
        </TabPane>
    </Tabs>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tabs, TabPane } from 'element-ui';
import { map } from 'lodash';

export enum TabsType {
    CARD = 'card',
    BORDERCARD = 'border-card',
    DEFALUT = '',
}

@Component({ name: 'jz-tabs', components: { Tabs, TabPane } })
export default class extends Vue {

    public get children() {
        return map(this.$slots, (slot, title) => title);
    }

    @Prop({ type: String, required: false, default: TabsType.DEFALUT })
    public type!: TabsType;

    public activeName: string;

    constructor() {
        super(arguments);
        this.activeName = '';
    }

    public async created() {
        this.activeName = this.children[0] || '';
    }
}
</script>
<style lang="less" scoped>
.jz-root {
    display: inline-block;
}
</style>