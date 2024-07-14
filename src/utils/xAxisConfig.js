// src/utils/xAxisConfig.js
export const xAxisConfig = (categoryData) => ({
    type: "category",
    data: categoryData,
    name: "time",
    scale: true,
    boundaryGap: [0, "100%"],
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
    axisLabel: {
        formatter: function (value) {
            const date = new Date(value);
            const hours = ("0" + date.getHours()).slice(-2);
            const minutes = ("0" + date.getMinutes()).slice(-2);
            return `${hours}:${minutes}`;
        },
    },
});
