<template>
    <div>
        <div class="talefun panel">
            <el-card class="box-card panel-item">
                <div slot="header" class="clearfix">
                    <div class="talefun label">
                        <div class="label-title">红袖斋(<span class="label-desc">红袖是汉语词汇，拼音hóng xiù，是指古代女子襦裙长袖，后来就成了女子的代名词。出自南朝 齐 王俭 《白紵辞》之二：“情发金石媚笙簧，罗袿徐转红袖扬。”唐杜牧 《书情》诗：“摘莲红袖湿，窥渌翠蛾频。”后蜀 欧阳炯 《南乡子》词：“红袖女郎相引去，游南浦，笑倚春风相对语。”</span>)</div>
                    </div>
                </div>
                <adapter-table :columns="columns" :dataSource="loadData">
                    <template v-slot:address="{ value }">
                        <div style="color: red;">{{value}}</div>
                    </template>
                    <template v-slot:table-option="{  }">
                        <adapter-button type="info" size="small">修改</adapter-button>
                        <adapter-button type="danger" size="small">删除</adapter-button>
                    </template>
                </adapter-table>
            </el-card>
            <el-card class="box-card panel-item">
                <div slot="header" class="clearfix">
                    <div class="talefun label">
                        <div class="label-title">染音坊(<span class="label-desc">染坊，指中国旧时经营丝绸、棉布、纱线和毛织物染色及漂白业务的作坊。是一种十分古老的行业。起源很早，唐已盛行。旧时称为“查青邱”，江湖上谓之“悲丝朝阳”或“浸润朝阳”，称染匠为“赚趾”。永安本地民间，很早就以葛藤、黄麻、青麻、苎麻等织“夏布”染色为衣。</span>)</div>
                    </div>
                </div>
                <adapter-table :columns="columns" :dataSource="loadData">
                    <template v-slot:address="{ value }">
                        <div style="color: red;">{{value}}</div>
                    </template>
                    <template v-slot:table-option="{  }">
                        <adapter-button type="info" size="small">修改</adapter-button>
                        <adapter-button type="danger" size="small">删除</adapter-button>
                    </template>
                </adapter-table>
            </el-card>
        </div>
        <el-card class="box-card">
            <adapter-table :columns="columns" :dataSource="loadData">
                <template v-slot:table-search>
                    <el-form :inline="true" :model="formData" :rules="rules" ref="ruleForm1" label-width="6rem" class="search-form">
                        <el-form-item label="活动名称" prop="name">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域" prop="region">
                            <el-select style="width: 100%" v-model="formData.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="btn center search">
                            <div class="btn-item">
                                <adapter-button native-type="button" @click="submitForm('ruleForm1')" type="info" size="small">搜索</adapter-button>
                            </div>
                            <div class="btn-item">
                                <adapter-button native-type="button" @click="resetForm('ruleForm1')" type="danger" size="small">创建</adapter-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-slot:address="{ value }">
                    <div style="color: red;">{{value}}</div>
                </template>
                <template v-slot:table-option="{  }">
                    <adapter-button type="info" size="small">修改</adapter-button>
                    <adapter-button type="danger" size="small">删除</adapter-button>
                </template>
            </adapter-table>
        </el-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
	public columns: Array<any>;
	public formData: any;
	public rules: any;

	constructor(props: any) {
		super(props);
		this.columns = [
			{ title: '姓名', field: 'name' },
			{ title: '年龄', field: 'age' },
			{ title: '性别', field: 'sex' },
			{ title: '电话', field: 'phone' },
			{ title: '地址', field: 'address' },
		];
		this.formData = {
			name: '',
			region: '',
			date1: '',
			date2: '',
			delivery: false,
			type: [],
			resource: '',
			desc: '',
		};
		this.rules = {
			name: [
				{ required: true, message: '请输入活动名称', trigger: 'blur' },
				{
					min: 3,
					max: 5,
					message: '长度在 3 到 5 个字符',
					trigger: 'blur',
				},
			],
			region: [
				{
					required: true,
					message: '请选择活动区域',
					trigger: 'change',
				},
			],
			date1: [
				{
					type: 'date',
					required: true,
					message: '请选择日期',
					trigger: 'change',
				},
			],
			date2: [
				{
					type: 'date',
					required: true,
					message: '请选择时间',
					trigger: 'change',
				},
			],
			type: [
				{
					type: 'array',
					required: true,
					message: '请至少选择一个活动性质',
					trigger: 'change',
				},
			],
			resource: [
				{
					required: true,
					message: '请选择活动资源',
					trigger: 'change',
				},
			],
			desc: [
				{ required: true, message: '请填写活动形式', trigger: 'blur' },
			],
		};
	}

	public loadData() {
		return Promise.resolve([
			{
				name: '测试',
				age: 27,
				sex: '男',
				phone: '13211111111',
				address: '测试地址',
			},
			{
				name: '测试1',
				age: 27,
				sex: '男',
				phone: '13211111112',
				address: '测试地址2',
			},
		]);
	}
}
</script>
