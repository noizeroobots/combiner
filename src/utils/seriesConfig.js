// src/utils/seriesConfig.js


export const getSeriesConfig15M = (values, markPoints, markAreasFvgZone, markAreaFiboPremiumZone, markAreaFiboDiscountZone, linesData, linesData2, markQmShiftArea, markGraphicQmBaby) => [
    {
        type: "candlestick",
        data: values,
        itemStyle: {
            color: "white",
            color0: "black",
            borderColor: "black",
            borderColor0: "black",
        },
        markPoint: {
            data: markPoints,
        },
        markLine: {
            // data: markShortLines,
        },
        markArea: {
            silent: false,
            data: [
                ...markAreasFvgZone.map((area) => area.data[0]),
                ...markAreaFiboPremiumZone.map((area) => area.data[0]),
                ...markAreaFiboDiscountZone.map((area) => area.data[0]),
                ...markQmShiftArea.map((area) => area.data[0])
            ],
        },
    },
    //...linesData,
    ...linesData2,
   // ...markGraphicQmBaby,
];

export const getSeriesConfig4H = (values, markPoints, markAreasFvgZone, markAreaFiboPremiumZone, markAreaFiboDiscountZone, linesData) => [
    {
        type: "candlestick",
        data: values,
        itemStyle: {
            color: "white",
            color0: "black",
            borderColor: "black",
            borderColor0: "black",
        },
        markPoint: {
            data: markPoints,
        },
        markLine: {
            // data: markShortLines,
        },
        markArea: {
            silent: false,
            data: [
                ...markAreasFvgZone.map((area) => area.data[0]),
                ...markAreaFiboPremiumZone.map((area) => area.data[0]),
                ...markAreaFiboDiscountZone.map((area) => area.data[0]),
            ],
        },
    },
    ...linesData,
];
