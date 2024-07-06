<template>
  <div id="candlestick-chart" style="width: 100%; height: 600px"></div>
</template>

<script>
import { defineComponent, setBlockTracking } from "vue";
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
        //console.error("ERROR: Error fetching data.", error);
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
        //console.error("ERROR: Error fetching fractals.", error);
      }
    },
    addHoursToDate(dateStr, hours) {
      const date = new Date(dateStr);
      date.setHours(date.getHours() + hours);
      return date;
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
          coord: [
            fractal.time,
            fractal.log_message === "Local low"
              ? fractal.extreme - 10
              : fractal.extreme + 10,
          ],

          value: fractal.log_message,
          itemStyle: {
            color: fractal.log_message === "Local low" ? "red" : "green",
          },
          symbol: "triangle",
          symbolRotate: fractal.log_message === "Local low" ? 0 : 180,
          symbolSize: 8,
          label: {
            show: false,
          },
        }));

      // Формирование данных для линий над фракталами
      const markShortLines = this.fractals
        .filter(
          (fractal) =>
            fractal.log_message === "Local low" ||
            fractal.log_message === "Local high"
        )
        .map((fractal) => ({
          name: fractal.log_message,
          yAxis: fractal.extreme,
          lineStyle: {
            color: fractal.log_message === "Local low" ? "red" : "green",
            width: 0.9,
            type: "solid",
          },

          label: {
            show: true, // Скрыть метки для упрощения
            position: 'start'
          },
          data: [
            {
              coord: [fractal.time, fractal.extreme],
            },
            {
              coord: [fractal.time + 4 * 3600 * 1000, fractal.extreme], // Добавить 4 часа в миллисекундах
            },
          ],
        }));



      // Формирование данных для коротких линий
      const linesData = this.fractals
        .filter(
          (fractal) =>
            fractal.log_message === "Local low" ||
            fractal.log_message === "Local high"
        )
        .map((fractal) => ({

          name: fractal.log_message,
          type: "line",
          data: [
            [fractal.time, fractal.extreme], // Начальная точка линии
            //[new Date(fractal.time).getTime() + 4 * 3600 * 1000, fractal.extreme] // Конечная точка линии (добавить 4 часа в миллисекундах)
           //["2024-06-20T09:00:00Z", fractal.extreme] // Конечная точка линии (добавить 4 часа в миллисекундах)
            [this.addHoursToDate(fractal.time, 4).toISOString().replace(".000", ""), fractal.extreme] // Конечная точка линии (добавить 4 часа в миллисекундах)
          ],
          lineStyle: {
            color: fractal.log_message === "Local low" ? "red" : "green",
            width: 1,
            type: "solid" // Тип линии (например, сплошная)
          },
          markLine: {
            symbol: ['none', 'none'], // Убрать стрелки на концах линий
            label: {
              show: false // Скрыть метки
            }
          }
        }));
      console.log('Data for short lines formed_1:', linesData[2].data[0]);
      console.log('Data for short lines formed_2:', linesData[1].data[1]);




      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const option = {
        //backgroundColor: '#f5f5f5',
        backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#e8f9fb" }, // Цвет в начале
          { offset: 1, color: "#b6ecf3" }, // Цвет в конце
        ]),
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
          min: (value) =>
            Math.min(...this.values.flat()) -
            Math.min(...this.values.flat()) * 0.1,
          max: (value) =>
            Math.max(...this.values.flat()) +
            Math.max(...this.values.flat()) * 0.1,
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
            }
          },
          ...linesData// Добавляем линии к графику
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
