<template>
  <div id="candlestick-chart" style="width: 100%; height: 600px"></div>
</template>

<script>
import { defineComponent } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  mounted() {
    this.fetchData();
    this.fetchFractals();
  },
  data() {
    return {
      categoryData: [],
      values: [],
      fractals: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("http://localhost:3000/candlesstick");
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Data is not an array");
          return;
        }

        this.categoryData = data.map((item) => item.time);
        this.values = data.map((item) => [
          item.open,
          item.close,
          item.low,
          item.high,
        ]);

        this.drawChart();
      } catch (error) {
        console.error("ERROR: Error fetching data.", error);
      }
    },
    async fetchFractals() {
      try {
        const response = await fetch("http://localhost:3000/fractals-from-db");
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Fractals data is not an array");
          return;
        }

        this.fractals = data;
        this.drawChart();
      } catch (error) {
        console.error("ERROR: Error fetching fractals.", error);
      }
    },
    drawChart() {
      if (!this.categoryData.length || !this.values.length) {
        return;
      }

      const chartDom = document.getElementById("candlestick-chart");
      const myChart = echarts.init(chartDom);

      // Формирование данных для фракталов
      const markPoints = this.fractals
        .filter(
          (fractal) =>
            fractal.log_message === "Local low" ||
            fractal.log_message === "Local high"
        )
        .map((fractal) => ({

          coord: [fractal.time, fractal.log_message === "Local low" ? fractal.extreme - 10 : fractal.extreme + 10 ],
          value: fractal.log_message,
          itemStyle: {
            color: fractal.log_message === "Local low" ? "red" : "green",
          },
          symbol: "triangle",
          symbolRotate: fractal.log_message === "Local low" ? 0 : 180,
          symbolSize: 8,
          label: {
            show: false
          }
        }));

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: this.categoryData,
          name: "time",
          scale: true,
        },
        yAxis: {
          type: "value",
          name: "RUB",
          scale: true,
          position: "left",
          min: (value) =>
            Math.min(...this.values.flat()) -
            Math.min(...this.values.flat()) * 0.1,
          max: (value) =>
            Math.max(...this.values.flat()) +
            Math.max(...this.values.flat()) * 0.1,
        },
        series: [
          {
            type: "candlestick",
            data: this.values,
            markPoint: {
              data: markPoints,
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0,
            end: 100,
          },
          {
            xAxisIndex: [0],
            start: 0,
            end: 100,
          },
          {
            type: "inside",
            yAxisIndex: [0],
            start: 0,
            end: 100,
          },
          {
            yAxisIndex: [0],
            start: 0,
            end: 100,
          },
          {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 100,
          },
          {
            type: "slider",
            yAxisIndex: 0,
            start: 0,
            end: 100,
          },
        ],
      };

      myChart.setOption(option);
    },
  },
});
</script>
