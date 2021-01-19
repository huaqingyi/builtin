import { createApp } from "vue";
import { defineComponent, h } from 'vue';
import App from "./App.vue";

export const Compvar = defineComponent({
    props: {
        component: { required: true }
    },
    render() {
        const Comp: any = this.component;
        // return Comp ? <Comp /> : <div />
        return h(Comp ? Comp : 'div');
    }
});


const app = createApp(App);

app.component('comp-var', Compvar);

app.mount("#app");
