// src/utils/seriesConfig.js
export const getSeriesConfig = (values, markPoints, markAreas, linesData) => [
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
            name: "FVG",
            silent: true,
            label: {
                show: true,
                position: ['50%', '50%'],
                color: "black",
                fontSize: 12,
                fontStyle: "bold",
            },
            itemStyle: {
                color: "rgba(255, 255, 0, 0.2)",
                borderColor: "black",
                borderWidth: 1,
            },
            data: markAreas.map((area) => area.data[0]),
        },
    },
    ...linesData,
];
