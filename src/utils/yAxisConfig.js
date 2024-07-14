// src/utils/yAxisConfig.js
export const yAxisConfig = (values) => ({
    type: "value",
    name: "RUB",
    scale: true,
    position: "right",
    axisLabel: {
        formatter: "{value}",
        inside: false,
    },
    min: (value) => Math.min(...values.flat()) - Math.min(...values.flat()) * 0.1,
    max: (value) => Math.max(...values.flat()) * 1.5,
    axisLine: {
        lineStyle: {
            color: "black",
        },
    },
    axisTick: {
        lineStyle: {
            color: "black",
        },
    },
    splitLine: {
        show: true,
        lineStyle: {
            color: "black",
            opacity: 0.05,
        },
    },
});
