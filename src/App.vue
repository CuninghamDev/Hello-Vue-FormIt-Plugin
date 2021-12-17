<template>
  <v-app>
    <v-app-bar app color="grey darken-2" dark>
      <div class="d-flex align-center">
        <h2 class="roboto-mono">Hello Vue + FormIt</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <HelloVue />
      <d-3-based-component />
    </v-main>
  </v-app>
</template>

<script>
import HelloVue from "./components/HelloVue.vue";
import d3BasedComponent from "./components/d3BasedComponent.vue";

export default {
  name: "App",

  components: {
    HelloVue,
    d3BasedComponent,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.roboto-mono {
  font-family: roboto mono;
}
.roboto {
  font-family: roboto;
}
</style>
