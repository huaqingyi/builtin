<template>
    <div class="container">
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
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({ components: { draggable } })
export default class extends Vue {

    public get components() {
        return [
            { tag: 'jz-flex', children: [], style: { width: '100%', minHeight: '20px', background: 'green' }, slot: true },
            { tag: 'jz-container', children: [], style: { width: '100%', minHeight: '20px', background: 'blue' }, slot: true },
            { tag: 'jz-button', children: [], slot: true },
            { tag: 'jz-checkbox', children: [], slot: false },
            { tag: 'jz-datepicker', children: [], slot: false },
            { tag: 'jz-icon', children: [], slot: false },
            { tag: 'jz-img', children: [], slot: false },
            { tag: 'jz-input', children: [], slot: false },
            { tag: 'jz-menu', children: [], slot: false },
            { tag: 'jz-radio', children: [], slot: false },
            { tag: 'jz-select', children: [], slot: false },
            { tag: 'jz-swiper', children: [], slot: false },
            { tag: 'jz-tabs', children: [], slot: true },
            { tag: 'jz-text', children: [], slot: false },
            { tag: 'jz-textarea', children: [], slot: false },
        ];
    }

    constructor() {
        super(arguments);
    }

    public cloneDog(data) {
        return { id: ''.uniqueId(), ...data };
    }

    public async created() {
    }
}
</script>
<style lang="less" scoped>
.container {
}
</style>