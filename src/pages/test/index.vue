<template>
    <div class="containerender">
        <div class="data">
            <pre>{{ ast }}</pre>
        </div>
        <draggable class="context" v-bind="dragOptions" v-model="ast">
            <renodes v-for="el in ast" v-model="el.children" :parent="el" :key="el.id" />
        </draggable>
        <div class="components">
            <draggable
                :list="components"
                :group="{ name: 'ctx', pull: 'clone', put: false }"
                :clone="cloneDog"
            >
                <div
                    class="list-group-item"
                    v-for="element in components"
                    :key="element.tag"
                >{{ element.tag }}</div>
            </draggable>
        </div>
    </div>
</template>
  
<script lang="ts">
import { map } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import Axios from 'axios';
import { ComponentConfiguration } from 'jz-component-types';

export interface PackEVAL {
    Config: ComponentConfiguration;
    Component: Vue;
}

@Component({ components: { draggable } })
export default class extends Vue {

    public asts: any[];

    public ast: any[];

    public get dragOptions() {
        return {
            animation: 200,
            group: 'ctx',
            disabled: false,
            ghostClass: 'ghost'
        };
    }

    public components: any[];

    constructor() {
        super(arguments);
        this.asts = [];
        this.ast = [];
        this.components = [];
    }

    public cloneDog(data) {
        return { id: ''.uniqueId(), ...data };
    }

    public async created() {
        this.components = await Promise.all(map([
            { tag: 'jz-flex' },
            { tag: 'jz-container' },
            { tag: 'jz-button' },
            { tag: 'jz-checkbox' },
            { tag: 'jz-datepicker' },
            { tag: 'jz-icon' },
            { tag: 'jz-img' },
            { tag: 'jz-input' },
            { tag: 'jz-menu' },
            { tag: 'jz-radio' },
            { tag: 'jz-select' },
            { tag: 'jz-swiper' },
            { tag: 'jz-tabs' },
            { tag: 'jz-text' },
            { tag: 'jz-textarea' },
        ], async component => {
            // const script = document.createElement('script');
            // script.id = `${component.tag}/oss-component`;
            // script.type = `text/javascript`;
            // script.src = `http://127.0.0.1:8081/${component.tag}/index.js?${Date.now()}`;
            // script.addEventListener('load', async () => {
            //     console.log(await import(`oss-component/${component.tag}`));
            // });
            // document.head.appendChild(script);

            // const link = document.createElement('link');
            // link.rel = 'stylesheet';
            // link.type = 'text/css';
            // link.href = `http://127.0.0.1:8081/${component.tag}/index.css?${Date.now()}`;
            // document.head.appendChild(link);

            // // const { data } = await Axios.create({}).get(`http://127.0.0.1:8081/${component.tag}/index.js?${Date.now()}`);
            // // console.log(eval(data));
            // // const { Config, Component } = eval(data);
            // let { Config, Component }: any = {};
            // if (component.tag === 'jz-flex' || component.tag === 'jz-container') {
            //     const pack = await import(`../../../components/${component.tag}`);
            //     Config = pack.Config;
            //     Component = pack.Component;
            // } else {
            //     const link = document.createElement('link');
            //     link.rel = 'stylesheet';
            //     link.type = 'text/css';
            //     link.href = `http://127.0.0.1:8081/${component.tag}/index.css?${Date.now()}`;
            //     document.head.appendChild(link);
            //     await new Promise(r => link.addEventListener('load', r));
            //     const { data } = await Axios.create({}).get(`http://127.0.0.1:8081/${component.tag}/index.js?${Date.now()}`);
            //     const pack = eval(data);
            //     Config = pack.Config;
            //     Component = pack.Component;
            // }

            const { Config, Component } = await import(`../../../components/${component.tag}`);
            const { styles, slots, slot = false } = Config;
            const style: any = {};
            const children: any[] = [];
            map(styles, (f, attr) => {
                if (f && f.value) {
                    style[attr] = f.value;
                }
            });
            if (slots) {
                map(slots, slot => children.push({
                    tag: slot.tag, content: slot.content?.default
                }))
            }
            // console.log({ ...component, style, children, Config, Component, slot });
            return { ...component, style, children, Config, Component, slot };
        }));
    }
}
</script>
<style lang="less" scoped>
.containerender {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    .data {
        width: 20%;
    }
    .context {
        flex: 1;
        height: 100%;
    }
}
</style>