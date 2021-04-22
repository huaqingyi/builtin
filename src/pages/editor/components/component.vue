<template>
    <div class="compontainer">
        <draggable
            class="compontainer-drag"
            :list="components"
            :group="{ name: 'ctx', pull: 'clone', put: false }"
            :clone="cloneDog"
        >
            <!-- <div class="compontainer-item" v-for="element in components" :key="element.tag">
            <div class="compontainer-card">
                <img class="card-img" :src="element.cover" />
            </div>
            </div>-->
            <div class="compontainer-item" v-for="element in components" :key="element.tag">
                <img class="item-img" :src="element.cover" />
            </div>
        </draggable>
    </div>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { State, Mutation } from 'vuex-class';
import { ComponentsResponse, ComponentsData } from '../service';
import { EditorStore } from '../store';

@Component({ components: { draggable } })
export default class extends Vue {

    @State(state => {
        const { data }: ComponentsResponse = state[EditorStore.id].components;
        return (data[0] || {}).components || [];
    })
    public components!: ComponentsData[];

    @Mutation(EditorStore.action((props: EditorStore) => props.getComponents))
    public getComponents!: () => Promise<void>;

    constructor() {
        super(arguments);
    }

    public cloneDog(data) {
        return { id: ''.uniqueId(), ...data };
    }

    public async created() {
        await this.getComponents();
    }
}
</script>
<style lang="less" scoped>
.compontainer {
    // display: flex;
    // flex-wrap: wrap;
    width: 100%;
    height: 100%;
    .compontainer-drag {
        .compontainer-item {
            .item-img {
                width: 100%;
            }
        }
        // .compontainer-item {
        //     position: relative;
        //     min-width: 65px;
        //     width: 25%;
        //     &:before {
        //         content: "";
        //         padding-top: 100%;
        //         display: block;
        //     }
        //     .compontainer-card {
        //         position: absolute;
        //         top: 0.25rem;
        //         right: 0.25rem;
        //         bottom: 0.25rem;
        //         left: 0.25rem;
        //         width: 100%;
        //         height: 100%;
        //         border-radius: 4px;
        //         border: 1px solid #ebeef5;
        //         background-color: #fff;
        //         overflow: hidden;
        //         color: #303133;
        //         transition: 0.3s;

        //         &:hover {
        //             box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        //         }
        //         .card-img {
        //             position: absolute;
        //             top: 0;
        //             left: 0;
        //             transform: translate(0, -50%);
        //             width: 100%;
        //         }
        //     }
        // }
    }
}
</style>