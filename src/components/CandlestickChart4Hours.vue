<template>

  <div id="candlestick-chart" style="width: 100%; height: 700px"></div>
</template>

<script>
import {defineComponent, setBlockTracking} from "vue";
import * as echarts from "echarts";
import {fetchFractals4Hour, fetchFvgs, fetchCandles4Hours} from "../api.js";
import {getMarkPoints, getMarkAreas, getMarkShortLines, getLinesData,} from "../utils/chartData.js";

export default defineComponent({
  async mounted() {
    await fetchCandles4Hours(this);
    await fetchFractals4Hour(this);
    await fetchFvgs(this);
  },
  props: {
    limit: {
      type: Number,
      required: true,
    },
  },
  watch: {
    limit: {
      immediate: true,
      handler(newLimit) {
        this.updateChart();
      }
    }
  },
  data() {
    return {
      categoryData: [],
      values: [],
      fractals: [],
      fvgs: [],
      limitFvg: 5,
    };
  },
  methods: {
    async updateChart() {
      fetchFvgs(this.limitFvg);
    },
    addHoursToDate(dateStr, hours) {
      const date = new Date(dateStr);
      date.setHours(date.getHours() + hours);
      return date;
    },

    extendXAxisByEmptyCandles(categoryData, values, numNewDataPoints) {
      var lastDate = new Date(categoryData[categoryData.length - 1]);
      for (var i = 1; i <= numNewDataPoints; i++) {
        var newDate = new Date(lastDate);
        newDate.setHours(lastDate.getHours() + i);
        var newDateString = newDate.toISOString();
        categoryData.push(newDateString);
        values.push([0, 0, 0, 0]);
      }
    },

    drawChart() {
      if (!this.categoryData.length || !this.values.length) {
        return;
      }

      const chartDom = document.getElementById("candlestick-chart");
      const myChart = echarts.init(chartDom);

      const markPoints = getMarkPoints(this.fractals);
      const markAreas = getMarkAreas(this.fvgs);
      const markShortLines = getMarkShortLines(this.fractals, this.addHoursToDate);
      const linesData = getLinesData(this.fractals, this.addHoursToDate);

      console.log('LinesData: ', linesData);
      console.log('LinesData: ', linesData[2]);

      const option = {
        backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {offset: 0, color: "#e8f9fb"}, // Цвет в начале
          {offset: 1, color: "#b6ecf3"}, // Цвет в конце
        ]),
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        toolbox: {
          feature: {
            magicType: [{
              type: ['bar'],
              title: ['ll'],
              show: true
            }],
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
          boundaryGap: [0, '100%'],
          axisLine: {
            lineStyle: {
              color: "black", // Цвет линии оси X
            },
          },
          axisTick: {
            lineStyle: {
              color: "black", // Цвет меток оси X
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "black", // Цвет сетки оси X
              opacity: 0.05,
            },
          },
          axisLabel: {
            formatter: function (value) {
              const date = new Date(value);
              const hours = ("0" + date.getHours()).slice(-2);
              const minutes = ("0" + date.getMinutes()).slice(-2);
              return `${hours}:${minutes}`;
            },
          },
        },
        yAxis: {
          type: "value",
          name: "RUB",
          scale: true,
          position: "right",
          axisLabel: {
            formatter: "{value}", // форматирование значений
            inside: false, // чтобы оси не накладывались на график
          },
          min: (value) => Math.min(...this.values.flat()) - Math.min(...this.values.flat()) * 0.1,
          //max: (value) => Math.ceil(value / 1000) * 1000,
          max: (value) => Math.max(...this.values.flat()) * 1.5,
          //max: (value) => Math.max(...this.values.flat()) + Math.max(...this.values.flat()) * 0.1,
          axisLine: {
            lineStyle: {
              color: "black", // Цвет линии оси Y
            },
          },
          axisTick: {
            lineStyle: {
              color: "black", // Цвет меток оси Y
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "black", // Цвет сетки оси X
              opacity: 0.05,
            },
          },
        },
        series: [
          {
            type: "candlestick",
            data: this.values,
            itemStyle: {
              color: "white", // Цвет для свечек, закрытие которых выше открытия
              color0: "black", // Цвет для свечек, закрытие которых ниже открытия
              borderColor: "black", // Цвет границы для свечек, закрытие которых выше открытия
              borderColor0: "black", // Цвет границы для свечек, закрытие которых ниже открытия
            },
            markPoint: {
              data: markPoints,
            },
            markLine: {
              //data: markShortLines,
            },
            markArea: {
              name: 'FVG',
              label: {
                show: true,
                color: 'black', // Черный цвет текста метки
                fontSize: 12, // Размер шрифта 12 пикселей
                fontStyle: 'bold' // Жирный стиль шрифта
              },
              itemStyle: {
                color: "rgba(255, 255, 0, 0.2)", // Полупрозрачный жёлтый цвет
                borderColor: "black", // Чёрный цвет границы
                borderWidth: 1 // Ширина границы
              },
              data: markAreas.map(area => area.data[0])
            }
          },
          ...linesData,   // Добавляем линии к графику
        ],

        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0, //Start и End: Определяют начальный и конечный процент масштабирования.
            end: 100,
            show: false, //Show: Определяет, будет ли отображаться контроллер масштабирования.
          },
          {
            xAxisIndex: [0],
            start: 0, //Start и End: Определяют начальный и конечный процент масштабирования.
            end: 100,
            startValue: 0,
            show: false, //Show: Определяет, будет ли отображаться контроллер масштабирования.
          },
          {
            type: "inside",
            yAxisIndex: [0],
            start: 0, //Start и End: Определяют начальный и конечный процент масштабирования.
            end: 100,
            show: false, //Show: Определяет, будет ли отображаться контроллер масштабирования.
          },
          {
            yAxisIndex: [0],
            start: 0, //Start и End: Определяют начальный и конечный процент масштабирования.
            end: 100,
            show: false, //Show: Определяет, будет ли отображаться контроллер масштабирования.
          },
          {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 100,
            show: false, //Show: Определяет, будет ли отображаться контроллер масштабирования.
          },
          {
            type: "slider",
            yAxisIndex: 0,
            start: 0,
            end: 100,
            show: false, //Show: Определяет, будет ли отображаться контроллер масштабирования.
          },
        ],
      };

      myChart.setOption(option);
    },
  },
});
</script>
