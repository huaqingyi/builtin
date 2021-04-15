<template>
    <div class="app-container">
        <switch-roles />
        <span>editor 用户不能编辑 性别, 不显示年龄</span>
        <vxe-toolbar>
            <template v-slot:buttons>
                <vxe-button icon="fa fa-plus" @click="insertEvent()"
                    >新增</vxe-button
                >
                <vxe-button @click="insertEvent(tableData[2])"
                    >在第3行插入并激活 Sex 单元格</vxe-button
                >
                <vxe-button @click="insertEvent(-1)">在最后行插入</vxe-button>
                <vxe-button @click="$refs.xTable.removeCheckboxRow()"
                    >删除选中</vxe-button
                >
                <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
                <vxe-button @click="getInsertEvent">获取新增</vxe-button>
                <vxe-button icon="fa fa-save" @click="saveEvent"
                    >保存</vxe-button
                >
            </template>
        </vxe-toolbar>
        <vxe-table
            border
            show-overflow
            ref="xTable"
            class="my_table_insert"
            max-height="400"
            :data="tableData"
            :edit-config="{
                trigger: 'click',
                mode: 'cell',
                icon: 'fa fa-pencil',
            }"
        >
            <vxe-table-column type="checkbox" width="60"></vxe-table-column>
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column
                field="name"
                title="Name"
                sortable
                :edit-render="{ name: 'input', defaultValue: '默认的名字' }"
            ></vxe-table-column>
            <vxe-table-column
                v-if="checkPermission(['admin'])"
                field="sex"
                title="Sex"
                :edit-render="{ name: 'input' }"
            ></vxe-table-column>
            <vxe-table-column
                v-if="checkPermission(['editor'])"
                field="sex"
                title="Sex"
            ></vxe-table-column>
            <vxe-table-column
                v-if="checkPermission(['admin'])"
                field="age"
                title="Age"
                sortable
                :edit-render="{ name: 'input', defaultValue: 18 }"
            ></vxe-table-column>
        </vxe-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Table } from 'vxe-table';
import SwitchRoles from './components/SwitchRoles.vue';

export interface TableData {
    name: string;
    sex: string;
    age: number;
}

@Component({
    name: 'RolePermission',
    components: {
        SwitchRoles,
    },
})
export default class extends Vue {
    public tableData: TableData[];
    public sexList: string[];

    public get table(): Table {
        return this.$refs.xTable as any;
    }

    constructor() {
        super();
        this.tableData = [];
        this.sexList = [];
    }

    public created() {
        this.tableData = [{ name: '测试', sex: '未知属性', age: 26 }].slice(
            0,
            4
        );
        this.findSexList();
    }

    public async findSexList() {
        this.sexList = ['男', '女', '未知属性'];
    }

    public async insertEvent(row: TableData) {
        let record = {
            sex: '',
        };
        let { row: newRow } = await this.table.insertAt(record, row);
        await this.table.setActiveCell(newRow, 'sex');
    }

    public getInsertEvent() {
        let insertRecords: TableData[] = this.table.getInsertRecords() as any;
        this.$modal.alert(String(insertRecords.length));
    }

    public getSelectionEvent() {
        let selectRecords: TableData[] = this.table.getCheckboxRecords() as any;
        this.$modal.alert(String(selectRecords.length));
    }

    public saveEvent() {
        const {
            insertRecords,
            removeRecords,
            updateRecords,
        } = this.table.getRecordset();
        this.$modal.alert(
            `insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`
        );
    }
}
</script>

<style lang="scss" scoped>
.app-container {
    .roles-table {
        margin-top: 30px;
    }

    .permission-tree {
        margin-bottom: 30px;
    }
}
</style>
