<template>
    <MenuItem :index="index" v-if="!option.children">
        <span slot="title">
            <JZIcon
                v-if="option.builtin || option.icon"
                :builtin="option.builtin"
                :href="option.icon"
            />
            {{ option.name }}
        </span>
    </MenuItem>
    <Submenu :index="index" v-else>
        <template slot="title">
            <JZIcon
                v-if="option.builtin || option.icon"
                :builtin="option.builtin"
                :href="option.icon"
            />
            <span>{{ option.name }}</span>
        </template>
        <MenuNode
            :mode="mode"
            v-for="(opt,idx) in option.children"
            :option="opt"
            :index="`${index}-${idx}`"
            :key="`${index}-${idx}`"
        />
    </Submenu>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Component as JZIcon } from '../jz-icon';
import { MenuItem, Submenu } from 'element-ui';

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

@Component({ components: { MenuItem, Submenu, JZIcon } })
export default class MenuNode extends Vue {

    @Prop({ type: Object, required: true })
    public option!: MenuOptions;

    @Prop({ type: String, required: true })
    public index!: string;

    @Prop({ type: String, required: false, default: ModeType.VERTICAL })
    public mode!: ModeType;

    constructor() {
        super(arguments);
    }
}
</script>
<style lang="less" scoped>
.main {
}
</style>