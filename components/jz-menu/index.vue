<template>
    <Menu :mode="mode" :collapse="collapse" class="jz-root">
        <MenuNode
            :mode="mode"
            v-for="(opt, idx) in options"
            :option="opt"
            :index="String(idx)"
            :key="idx"
        />
    </Menu>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Menu, MenuItem, Submenu } from 'element-ui';
import MenuNode from './menu.vue';

export interface MenuOptions {
    name: string;
    builtin?: string;
    icon?: string;
    children: MenuOptions[];
}

export enum ModeType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

@Component({ name: 'jz-menu', components: { Menu, MenuItem, Submenu, MenuNode } })
export default class extends Vue {

    @Prop({ type: Array, required: false, default: () => [{ name: '添加菜单' }] })
    public options!: MenuOptions[];

    @Prop({ type: Boolean, required: false, default: false })
    public collapse!: boolean;

    @Prop({ type: String, required: false, default: ModeType.HORIZONTAL })
    public mode!: ModeType;

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.jz-root {
}
</style>