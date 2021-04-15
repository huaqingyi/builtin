<template>
    <div class="app-container">
        <switch-roles :disabled="true" @change="handleRolesChange" />
        <span class="permission-alert">
            请到指令权限去测试权限切换
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SwitchRoles from './components/SwitchRoles.vue';

@Component({
    name: 'PagePermission',
    components: {
        SwitchRoles,
    },
})
export default class extends Vue {
    private handleRolesChange() {
        this.$router.push({ path: '/permission/index?' + +new Date() });
    }
}
</script>
