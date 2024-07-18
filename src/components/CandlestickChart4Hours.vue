<template>
  <div id="candlestick-chart" style="width: 100%; height: 700px"></div>
</template>

<script>
import {defineComponent, setBlockTracking} from "vue";
import * as echarts from "echarts";
import {fetchFractals4Hour, fetchFvgs4Hour, fetchCandles4Hours} from "../api.js";
import {getMarkPoints, drawFvgAreas, getLinesData, drawFvgAreas1} from "../utils/chartData.js";
import {toolboxConfig} from "../utils/toolboxConfig.js";
import {tooltipConfig} from "../utils/tooltipConfig.js";
import {xAxisConfig} from "../utils/xAxisConfig.js";
import {yAxisConfig} from "../utils/yAxisConfig.js";
import {dataZoomConfig} from "../utils/dataZoomConfig.js";
import {getSeriesConfig} from "../utils/seriesConfig.js"; // Импорт функции для получения объекта series

export default defineComponent({
  props: {
    ticker: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    await fetchCandles4Hours(this, this.ticker);
    await fetchFractals4Hour(this, this.ticker);
    await fetchFvgs4Hour(this, this.ticker);
  },
  watch: {
    ticker: {
      immediate: true,
      handler(newTicker) {
        this.updateChart(newTicker);
      }
    }
  },

  data() {
    return {
      categoryData: [],
      values: [],
      fractals: [],
      fvgs: [],
    };
  },
  methods: {
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
        this.categoryData.push(newDateString);
        this.values.push([0, 0, 0, 0]);
      }
    },

    async updateChart(ticker) {
      await fetchCandles4Hours(this, ticker);
      await fetchFractals4Hour(this, ticker);
      await fetchFvgs4Hour(this, ticker);
    },

    drawChart() {
      if (!this.categoryData.length || !this.values.length) {
        return;
      }
      const chartDom = document.getElementById("candlestick-chart");
      const myChart = echarts.init(chartDom);
      const markPoints = getMarkPoints(this.fractals);
      const markAreas = drawFvgAreas(this.fvgs, this.categoryData);
      const markAreas1 = drawFvgAreas1(this.fvgs, this.categoryData);
      const linesData = getLinesData(this.fractals, this.categoryData);
      const config = getSeriesConfig(this.values, markPoints, markAreas, markAreas1, linesData);


      const option = {
        backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {offset: 0, color: "#e8f9fb"},
          {offset: 1, color: "#b6ecf3"},
        ]),
        tooltip: tooltipConfig,
        toolbox: toolboxConfig,
        xAxis: xAxisConfig(this.categoryData),
        yAxis: yAxisConfig(this.values),
        //series: getSeriesConfig(this.values, markPoints, markAreas, markAreas1, linesData),
        series: config,
        dataZoom: dataZoomConfig,
      };
      myChart.setOption(option);
      // Добавим обработчик событий для вертикального масштабирования
      myChart.getZr().on('mousedown', (params) => {
        if (params.target && params.target.x && params.target.y) {
          const startY = params.offsetY;
          const onMouseMove = (moveParams) => {
            const endY = moveParams.offsetY;
            const deltaY = endY - startY;
            // Определите направление и степень масштабирования
            const scaleChange = deltaY / chartDom.clientHeight * 100;
            // Изменим dataZoom для yAxis
            myChart.dispatchAction({
              type: 'dataZoom',
              yAxisIndex: 0,
              start: Math.max(0, Math.min(100, dataZoomConfig[2].start - scaleChange)),
              end: Math.max(0, Math.min(100, dataZoomConfig[2].end - scaleChange))
            });
          };
          const onMouseUp = () => {
            myChart.getZr().off('mousemove', onMouseMove);
            myChart.getZr().off('mouseup', onMouseUp);
          };
          myChart.getZr().on('mousemove', onMouseMove);
          myChart.getZr().on('mouseup', onMouseUp);
        }
      });
    },
  },
});
</script>
