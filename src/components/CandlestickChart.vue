<template>
  <div id="candlestick-chart" style="width: 600px; height: 400px;"></div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3000/candlesstick');
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Data is not an array');
          return;
        }

        const categoryData = data.map(item => item.time);
        const values = data.map(item => [item.open, item.close, item.low, item.high]);

        const chartDom = document.getElementById('candlestick-chart');
        const myChart = echarts.init(chartDom);
        const option = {
          xAxis: {
            type: 'category',
            data: categoryData,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'candlestick',
              data: values,
            },
          ],
        };

        myChart.setOption(option);
      } catch (error) {
        console.error('ERROR: Error fetching data.', error);
      }
    },
  },
});
</script>
