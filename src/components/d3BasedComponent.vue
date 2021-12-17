<template>
  <svg id="d3-canvas" style="width: 100%">
    <g id="margin-offset">
      <g id="x-axis" />
      <g id="y-axis" />
      <g id="bars" />
    </g>
  </svg>
</template>

<script>
import { mapState } from "vuex";
import * as d3 from "d3";
export default {
  name: "d3BasedComponent",
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  data: () => ({
    svgDim: undefined,
    margin: 30,
  }),
  computed: {
    ...mapState(["width", "length", "height"]),
    structuredData() {
      let widthData = { name: "width", value: this.width };
      let lengthData = { name: "length", value: this.length };
      let heightData = { name: "height", value: this.height };
      return [widthData, lengthData, heightData];
    },
  },
  watch: {
    width: {
      handler: function () {
        this.drawUpdate();
      },
    },
    length: {
      handler: function () {
        this.drawUpdate();
      },
    },
    height: {
      handler: function () {
        this.drawUpdate();
      },
    },
  },
  methods: {
    resize() {
      this.svgDim = window.innerWidth;
      d3.select("#d3-canvas").attr("height", this.svgDim / 1.5);
      this.drawUpdate();
    },
    drawUpdate() {
      //a method for drawing then updating the svg graphics created by d3
      //call this method after any substantive change takes place
      let self = this;
      let data = self.structuredData;
      // let svg = d3.select('#d3-canvas')
      d3.select("#margin-offset").attr(
        "transform",
        `translate(${self.margin}, ${self.margin})`
      );
      let x = d3
        .scaleBand()
        .range([0, self.svgDim - self.margin * 2 - 20])
        .domain(data.map((d) => d.name))
        .padding(0.2);
      d3.select("#x-axis")
        .attr(
          "transform",
          `translate(20, ${self.svgDim / 1.5 - self.margin * 4})`
        )
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,5)rotate(-45)")
        .style("font-size", "15px")
        .style("text-anchor", "end");
      let y = d3
        .scaleLinear()
        .domain([0, 100])
        .range([self.svgDim / 1.5 - self.margin * 4, 0]);
      d3.select("#y-axis")
        .attr("transform", "translate(20,0)")
        .call(d3.axisLeft(y))
        .style("font-size", "15px");
      d3.select("#bars")
        .attr("transform", "translate(20,0)")
        .selectAll(".bar-elements")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => self.svgDim / 1.5 - self.margin * 4 - y(d.value))
        .attr("fill", "#FFC72C")
        .classed("bar-elements", true);
    },
  },
};
</script>

<style></style>
