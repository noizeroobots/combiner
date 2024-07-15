// src/utils/dataZoomConfig.js
export const dataZoomConfig = [
    {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100,
        show: false,
    },
    {
        xAxisIndex: [0],
        start: 0,
        end: 100,
        startValue: 0,
        show: false,
    },
    {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 100,
        show: false,
    },
    {
        yAxisIndex: [0],
        start: 0,
        end: 100,

        show: true,  // Это основной yAxis dataZoom элемент
        handleIcon: 'M8.5,1.5v21h-3v-21h3m4.5,21v-21h-3v21h3M19,1.5v21h-3v-21h3M2,1.5v21h-3v-21h3M16.5,1.5v21h-3v-21h3M11,1.5v21h-3v-21h3z',
        handleSize: '50%',
        handleStyle: {
            color: '#fff',
            //shadowBlur: 3,
            //shadowColor: 'rgba(0, 0, 0, 0.6)',
            //shadowOffsetX: 2,
            shadowOffsetY: 10,
        },
        moveHandleSize: '50%',
    }
];
