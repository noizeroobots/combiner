// src/utils/yAxisConfig.js
export const yAxisConfig = (values) => ({
    id: 'y-axis-zoom',  // Уникальный идентификатор элемента управления
    yAxisId: 'y-axis-1',  // Идентификатор оси Y, к которой применяется элемент управления
    scaleRange: {  // Диапазон масштабирования
        minPercent: 10,  // Минимальный процент масштабирования
        maxPercent: 100,  // Максимальный процент масштабирования
    },
    type: "value",
    name: "RUB",
    scale: true,



    position: "right",

    axisLabel: {
        formatter: function (value) {
            return `${value.toFixed(2)}`; // Пример форматирования с двумя знаками после запятой
        },
        inside: false,
    },
    min: function (value) {
        return Math.min(...values.flat()) - Math.min(...values.flat()) * 0.1;
    },
    max: function (value) {
        return Math.max(...values.flat()) * 1.5;
    },

    axisLine: {
        lineStyle: {
            color: "black",
            width: 2,
            type: "solid",
            symbol: "sd"
        },
    },
    axisTick: {
        show: "auto",
        inside: true,
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

    axisPointer: {
        show: true,
        type: 'line',
        snap: true,
        label: {
            show: true,
            formatter: '{value} RUB',
        },
        triggerTooltip: true,
        triggerOn: 'mousemove',
    }
});
