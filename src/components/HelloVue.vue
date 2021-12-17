<template>
  <v-container class="px-6">
    <v-row class="my-0 py-0">
      <v-col cols="12" class="my-0 py-0">
        <h3 class="my-1 py-0">What is this plugin?</h3>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col cols="12" class="my-0 py-0">
        <p>
          This plugin is a template. It is a proof of concept demonstration how
          Vue / Vuex / Vuetify / d3 can be combined and used inside of a FormIt
          plugin. This template recreates the basic Hello World cube creation
          plugin from the Plugin Playground in FormIt.
        </p>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col cols="12" class="my-1 py-0">
        <p>
          The advantage to using Vue or other frontend frameworks in developing
          these plugins is to significantly reduce the time required to style
          elements and link interface elements to data. The rapid implementation
          of material design UI elements provided by Vuetify is accompanied by
          the benefits of the data model provided by Vuex which allows for
          building multiple graphics and pages that can interact with each
          other's underlying data. The benifits of d3 include its amazing
          ability to create virtually any graphic representation of data, and
          its stylish / engaging aesthetics.
        </p>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col cols="12" class="my-1 py-0">
        <p>
          Feel free to fork this repo and use it as a basis for building your
          own plugins!
        </p>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col cols="12" class="my-1 py-0">
        <h3>Creating a Cube</h3>
      </v-col>
    </v-row>
    <v-row class="text-left">
      <v-col cols="12">
        <v-slider
          :value="width"
          max="100"
          min="1"
          label="Width"
          color="#035C67"
          track-color="grey"
          thumb-label="always"
          @input="setState('width', $event)"
        >
          <template v-slot:append>
            <v-text-field
              filled
              shaped
              dense
              :value="width"
              class="mt-n7 pt-0"
              type="number"
              style="width: 60px"
              @input="setState('width', $event)"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="text-left">
      <v-col cols="12">
        <v-slider
          :value="length"
          max="100"
          min="1"
          label="Length"
          color="#0095CB"
          track-color="grey"
          thumb-label="always"
          @input="setState('length', $event)"
        >
          <template v-slot:append>
            <v-text-field
              filled
              dense
              shaped
              :value="length"
              class="mt-n7 pt-0"
              type="number"
              style="width: 60px"
              @input="setState('length', $event)"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="text-left">
      <v-col cols="12">
        <v-slider
          :value="height"
          max="100"
          min="1"
          label="Height"
          color="#A80051"
          track-color="grey"
          thumb-label="always"
          @input="setState('height', $event)"
        >
          <template v-slot:append>
            <v-text-field
              filled
              shaped
              dense
              :value="height"
              class="mt-n7 pt-0"
              type="number"
              style="width: 60px"
              @input="setState('height', $event)"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="text-right">
      <v-col cols="12">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              v-blur
              dark
              v-on="on"
              @click="buttonClickedTest(width, length, height)"
              fab
              color="#988600"
            >
              <v-icon large>mdi-cube-outline</v-icon>
            </v-btn>
          </template>
          <span>Add Cube to Model</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
let WSM = window.WSM;
let FormIt = window.FormIt;

export default {
  name: "HelloWorld",
  computed: {
    ...mapState(["testData", "width", "height", "length"]),
  },
  data: () => ({ someData: "local data can be kept here" }),
  methods: {
    buttonClickedTest(w, l, h) {
      console.log("button was clicked");
      this.createBlock(w, l, h);
    },
    createBlock: async (w, l, h) => {
      let pt1 = await WSM.Geom.Point3d(w / -2, l / -2, 0);
      let pt2 = await WSM.Geom.Point3d(w / 2, l / 2, h);
      let histID = await FormIt.GroupEdit.GetEditingHistoryID();
      console.log(histID, pt1, pt2);

      let test = await WSM.APICreateBlock(histID, pt1, pt2);
      console.log(test);
    },
    setState(key, value) {
      console.log(key, value);
      this.$store.commit("setState", { storeKey: key, newValue: value });
    },
  },
};
</script>
