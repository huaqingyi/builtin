<template>
    <div class="dashboard-container">
        <component :is="currentRole" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdminDashboard from './admin/index.vue';
import EditorDashboard from './editor/index.vue';
import { PermissionModule } from '../../store/modules/permission';

@Component({
    name: 'Dashboard',
    components: {
        AdminDashboard,
        EditorDashboard,
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
