import { Service } from '@/core';
import { ResponseImpl } from '@/impls/response.impl';

export interface ComponentsData {
    [x: string]: any;
    tag: string;
    cover: string;
    name: string;
}

export class ComponentsResponse extends ResponseImpl {
    public data: Array<{ name: string; components: ComponentsData[]; }>;
    constructor() {
        super();
        this.data = [];
    }
}

export class EditorService extends Service {

    public async getComponents() {
        // return await this.http.get('').then(resp => resp.data);
        return Promise.resolve<ComponentsResponse>({
            err: '', errmsg: '', errno: 0, data: [
                {
                    name: 'builtin',
                    components: [
                        { tag: 'jz-container', name: '垂直容器', cover: require(`../../../components/jz-container/cover.png`), children: [], style: { width: '100%', minHeight: '20px', background: 'green' }, slot: true },
                        { tag: 'jz-flex', name: '水平容器', cover: require(`../../../components/jz-flex/cover.png`), children: [], style: { width: '100%', minHeight: '20px', background: 'blue' }, slot: true },
                        { tag: 'jz-button', name: '按钮', cover: require(`../../../components/jz-button/cover.png`), children: [], slot: true },
                        { tag: 'jz-checkbox', name: '复选', cover: require(`../../../components/jz-checkbox/cover.png`), children: [], slot: false },
                        { tag: 'jz-datepicker', name: '时间选择', cover: require(`../../../components/jz-datepicker/cover.png`), children: [], slot: false },
                        { tag: 'jz-icon', name: '图标', cover: require(`../../../components/jz-icon/cover.png`), children: [], slot: false },
                        { tag: 'jz-img', name: '图片', cover: require(`../../../components/jz-img/cover.png`), children: [], slot: false },
                        { tag: 'jz-input', name: '输入框', cover: require(`../../../components/jz-input/cover.png`), children: [], slot: false },
                        { tag: 'jz-menu', name: '菜单', cover: require(`../../../components/jz-menu/cover.png`), children: [], slot: false },
                        { tag: 'jz-radio', name: '单选', cover: require(`../../../components/jz-radio/cover.png`), children: [], slot: false },
                        { tag: 'jz-select', name: '下拉框', cover: require(`../../../components/jz-select/cover.png`), children: [], slot: false },
                        { tag: 'jz-swiper', name: '轮播', cover: require(`../../../components/jz-swiper/cover.png`), children: [], slot: false },
                        { tag: 'jz-tabs', name: '选项卡', cover: require(`../../../components/jz-tabs/cover.png`), children: [], slot: true },
                        { tag: 'jz-text', name: '文本', cover: require(`../../../components/jz-text/cover.png`), children: [], slot: false },
                        { tag: 'jz-textarea', name: '文本输入', cover: require(`../../../components/jz-textarea/cover.png`), children: [], slot: false },
                    ]
                }
            ]
        });
    }
}
