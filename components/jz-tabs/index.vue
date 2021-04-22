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
import { TabsType } from './types';

@Component({ name: 'jz-tabs', components: { Tabs, TabPane } })
export default class extends Vue {

    public get children() {
        return map(this.$slots, (slot, title) => title);
    }

    @Prop({ type: String, required: false, default: TabsType.BORDERCARD })
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
}
</style>