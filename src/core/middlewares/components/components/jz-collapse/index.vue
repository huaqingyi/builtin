<template>
    <div class="jz-root">
        <Collapse v-model="activeNames" :accordion="accordion">
            <CollapseItem
                v-for="panel in panels"
                :key="panelName(panel)"
                :title="panelName(panel)"
                :name="panelName(panel)"
            >
                <slot :name="panelName(panel)"></slot>
            </CollapseItem>
        </Collapse>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Collapse, CollapseItem } from 'element-ui';
import { map } from 'lodash';

@Component({ name: 'jz-collapse', components: { Collapse, CollapseItem } })
export default class extends Vue {

    @Prop({ type: String, required: false, default: `新建折叠面板` })
    public title!: string;

    @Prop({ type: Boolean, required: false, default: true })
    public accordion!: boolean;

    public get panels() {
        return map(this.$slots, ([panel]: any[], name) => {
            if (!panel.data) panel.data = {};
            if (!panel.data.attrs) panel.data.attrs = {};
            if (!panel.data.attrs.title) {
                panel.data.attrs.title = name;
            }
            return panel;
        });
    }

    public activeNames: string[];

    constructor() {
        super(arguments);
        this.activeNames = [];
    }

    public panelName(panel) {
        if (!panel.data) panel.data = {};
        if (!panel.data.attrs) panel.data.attrs = {};
        return panel.data.attrs.title;
    }

    public async created() {
        this.activeNames = this.panelName(this.panels[0]);
    }
}
</script>
<style lang="less" scoped>
.jz-root {
    display: inline-block;
}
</style>
