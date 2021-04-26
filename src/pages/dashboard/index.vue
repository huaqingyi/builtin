<template>
    <div class="dashboard-container">
        <component :is="currentRole" />
        <!-- <JZButton>Test</JZButton> -->
        <!-- <JZCheckbox
            :options="[{ label: '选项1', value: '选项1' }, { label: '选项2', value: '选项2' }]"
            type="button"
        />-->
        <!-- <JZCollapse>
            <div slot="Collapse 1">Collapse Content 1</div>
            <div slot="Collapse 2">Collapse Content 2</div>
            <div slot="Collapse 3">Collapse Content 3</div>
        </JZCollapse>-->
        <!-- <JZDatepicker type="date" /> -->
        <!-- <JZFlex>
            <JZButton>Test</JZButton>
            <JZCollapse>
                <div slot="Collapse 1">Collapse Content 1</div>
                <div slot="Collapse 2">Collapse Content 2</div>
                <div slot="Collapse 3">Collapse Content 3</div>
            </JZCollapse>
        </JZFlex>-->
        <!-- <JZIcon /> -->
        <!-- <JZImg /> -->
        <!-- <JZInput /> -->
        <!-- <JZMenu
            :options="[
                { name: '菜单1' },
                { name: '菜单2', children: [{ name: '子菜单1' }] },
                { name: '菜单3', children: [{ name: '子菜单1', children: [{ name: '子子菜单1' }, { name: '子子菜单2' }] }] },
            ]"
        />-->
        <!-- <JZRadio type="button" :options="[{ label: '选项1', value: '选项1' }, { label: '选项2', value: '选项2' }]" /> -->
        <!-- <JZSelect /> -->
        <!-- <JZSwiper>
            <div slot="Swiper 1">Swiper Content 1</div>
            <div slot="Swiper 2">Swiper Content 2</div>
            <div slot="Swiper 3">Swiper Content 3</div>
        </JZSwiper>-->
        <!-- <JZTabs>
            <div slot="Tabs 1">Tabs Content 1</div>
            <div slot="Tabs 2">Tabs Content 2</div>
            <div slot="Tabs 3">Tabs Content 3</div>
        </JZTabs>-->
        <!-- <JZText>测试</JZText> -->
        <!-- <JZTextarea /> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdminDashboard from './admin/index.vue';
import EditorDashboard from './editor/index.vue';
import { PermissionModule } from '../../store/modules/permission';
import components from '../buitlin/components';

@Component({
    name: 'Dashboard',
    components: {
        AdminDashboard,
        EditorDashboard,
        ...components as any,
    },
})
export default class extends Vue {

    public currentRole: string;

    public get roles() {
        return PermissionModule.roles;
    }

    constructor() {
        super(...arguments);
        this.currentRole = 'admin-dashboard';
    }

    public created() {
        if (!this.roles.includes('*')) {
            this.currentRole = 'editor-dashboard';
        }
    }
}
</script>
