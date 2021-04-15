<template>
    <div>
        <div style="margin-bottom:15px;">{{ $t('permission.roles') }}： {{ roles }}</div>
        {{ $t('permission.switchRoles') }}：
        <el-radio-group v-model="switchRoles">
            <el-radio-button :disabled="disabled" label="editor" />
            <el-radio-button :disabled="disabled" label="admin" />
        </el-radio-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PermissionModule } from '../../../store/modules/permission';

@Component({
    name: 'SwitchRoles',
})
export default class extends Vue {

    @Prop({ type: Boolean, default: false })
    public disabled!: boolean;

    public get roles() {
        return PermissionModule.roles;
    }

    public get switchRoles() {
        return this.roles[0];
    }

    public set switchRoles(value) {
        PermissionModule.changeRoles([value]);
        // UserModule.ChangeRoles(value).then(() => {
        //   this.$emit('change')
        // })
    }
}
</script>
