// src/utils/seriesConfig.js


export const getSeriesConfig15M = (values, markPoints, markAreas, markAreasFibo, linesData) => [
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
            // itemStyle: {
            //     color: "rgba(255, 255, 0, 0.2)",
            //     borderColor: "black",
            //     borderWidth: 0.2,
            // },
            data: [
                ...markAreas.map((area) => ({
                        ...area.data[0],
                    itemStyle: {
                        color: "rgba(222,3,54,0.2)",
                        borderColor: "black",
                        borderWidth: 0.2,
                    },
                    })),
                ...markAreasFibo.map((area) => area.data[0]),
                ],
        },
    },
    ...linesData,
];

export const getSeriesConfig4H = (values, markPoints, markAreas, markAreasFibo, linesData) => [
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
            // itemStyle: {
            //     color: "rgba(255, 255, 0, 0.2)",
            //     borderColor: "black",
            //     borderWidth: 0.2,
            // },
            data: [
                ...markAreas.map((area) => ({
                    ...area.data[0],
                    itemStyle: {
                        color: "rgba(222,3,54,0.2)",
                        borderColor: "black",
                        borderWidth: 0.2,
                    },
                })),
                ...markAreasFibo.map((area) => area.data[0]),
            ],
        },
    },
    ...linesData,
];
