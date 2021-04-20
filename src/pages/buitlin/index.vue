<template>
    <div>
        <Button @click="onClick">按钮</Button>
        <div v-for="(href, i) in hrefs" :key="href">
            <a :href="href" :download="String(i)">{{ i }}</a>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div ref="shot" class="container">
            <!-- <div class="comp">
                <jz-button>按钮</jz-button>
            </div>
            <div class="comp">
                <jz-checkbox
                    :options="[{ label: '选项1', value: '选项1' }, { label: '选项2', value: '选项2' }]"
                />
            </div>
            <div class="comp">
                <jz-collapse class="with-wc">
                    <div slot="选项卡 1">选项卡 内容 1</div>
                    <div slot="选项卡 2">选项卡 内容 2</div>
                    <div slot="选项卡 3">选项卡 内容 3</div>
                </jz-collapse>
            </div>
            <div class="comp">
                <jz-container class="with-w">
                    <div class="with-wi"></div>
                </jz-container>
            </div>
            <div class="comp">
                <jz-datepicker type="date" />
            </div>
            <div class="comp">
                <jz-flex class="with-w">
                    <div class="with-wi"></div>
                    <div class="with-wi"></div>
                    <div class="with-wi"></div>
                </jz-flex>
            </div>
            <div class="comp">
                <jz-icon />
            </div> -->
            <div class="comp">
                <jz-img />
            </div>
            <!-- <div class="comp">
                <jz-input />
            </div>
            <div class="comp">
                <jz-menu
                    class="with-wc"
                    :options="[
                        { name: '菜单1' },
                        { name: '菜单2', children: [{ name: '子菜单1' }] },
                        { name: '菜单3', children: [{ name: '子菜单1', children: [{ name: '子子菜单1' }, { name: '子子菜单2' }] }] },
                    ]"
                />
            </div>
            <div class="comp">
                <jz-radio
                    :options="[{ label: '选项1', value: '选项1' }, { label: '选项2', value: '选项2' }]"
                />
            </div>
            <div class="comp">
                <jz-select />
            </div>
            <div class="comp">
                <jz-swiper class="with-wc" :autoplay="false">
                    <div slot="轮播 1">
                        <img
                            width="100%"
                            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                        />
                    </div>
                    <div slot="轮播 2">
                        <img
                            width="100%"
                            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                        />
                    </div>
                    <div slot="轮播 3">
                        <img
                            width="100%"
                            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                        />
                    </div>
                </jz-swiper>
            </div>
            <div class="comp">
                <jz-tabs class="with-wc">
                    <div class="slot" slot="选项卡 1">选项卡 内容 1</div>
                    <div class="slot" slot="选项卡 2">选项卡 内容 2</div>
                    <div class="slot" slot="选项卡 3">选项卡 内容 3</div>
                </jz-tabs>
            </div>
            <div class="comp">
                <jz-text>编辑文字</jz-text>
            </div>
            <div class="comp">
                <jz-textarea />
            </div> -->
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button } from 'element-ui';
import components from '../../core/middlewares/components/components';
import html2canvas from 'html2canvas';

@Component({ components: { Button, ...components } })
export default class extends Vue {

    public hrefs: string[];

    constructor() {
        super(...arguments);
        this.hrefs = [];
    }

    public async onClick(e) {
        e.stopPropagation();
        console.log(111, this.$refs.shot);
        const comps = (this.$refs.shot as HTMLElement).querySelectorAll('.comp');
        comps.forEach(async (comp, i) => {
            const canvas = await html2canvas(comp as any, { useCORS: true, logging: true });
            const imgUri = canvas.toDataURL('image/png');
            this.hrefs.push(imgUri);
            await new Promise(r => setTimeout(r, 1000));
        });
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 375px;
    .comp {
        display: flex;
        &:before {
            content: "";
            flex: 1;
        }
        &:after {
            content: "";
            flex: 1;
        }
        .with-wc {
            width: 100%;
        }
        .with-w {
            width: 100%;
            display: flex;
            .with-wi {
                position: relative;
                flex: 1;
                height: 36px;
                &:before {
                    content: "";
                    position: absolute;
                    top: 0.15rem;
                    right: 0.15rem;
                    bottom: 0.15rem;
                    left: 0.15rem;
                    background-color: rgba(0, 0, 0, 0.2);
                }
            }
        }
        .slot {
            min-height: 300px;
            text-align: center;
        }
    }
}
</style>
