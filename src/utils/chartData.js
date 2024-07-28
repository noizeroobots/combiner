export function getMarkPoints(fractals) {
    return fractals
        .filter(fractal => fractal.logMessage === "Local low" || fractal.logMessage === "Local high")
        .map(fractal => {
            let offsetPercent = 0.5; // Процентное смещение от extreme

            // Вычисляем процентное значение от extreme
            let offsetValue = fractal.extreme * (offsetPercent / 100);

            return {
                coord: [
                    fractal.time,
                    fractal.logMessage === "Local low" ? fractal.extreme - offsetValue : fractal.extreme + offsetValue,
                ],
                value: fractal.logMessage,
                itemStyle: {
                    color: fractal.logMessage === "Local low" ? "red" : "green",
                    opacity: 0.7,
                },
                symbol: "triangle",
                symbolRotate: fractal.logMessage === "Local low" ? 0 : 180,
                symbolSize: 8,
                label: {
                    show: false,
                },
            };
        });
}

export function drawFvgAreas(fvgs, categoryData) {
    return fvgs.map(fvg => {
        const startIndex = findCandleIndexByDate(categoryData, fvg.time);
        const endIndex = startIndex + 30; // Сдвиг на 10 свечей вправо
        const endTime = endIndex < categoryData.length ? categoryData[endIndex] : categoryData[categoryData.length - 1];
        return {
            name: 'FVG 4H',
            data: {
                0: [
                    {
                        xAxis: fvg.time,
                        yAxis: fvg.fvgLow,
                        itemStyle: {
                            color: "rgba(243,217,43,0.5)",
                            borderColor: "black",
                            borderWidth: 0.1,
                        },
                        label: {
                            show: true,
                            position: ['50%', '50%'],
                            color: "green",
                            fontSize: 12,
                            fontStyle: "bold",
                        },
                    },
                    {
                        xAxis: endTime,
                        yAxis: fvg.fvgHigh,
                    },

                ],
            },
        };
    });
}

export function drawFiboPremiumZone(fibo, categoryData) {
    return fibo.map(fibo => {
        const startIndex = findCandleIndexByDate(categoryData, fibo.time);
        const endIndex = startIndex + 170;
        const endTime = endIndex < categoryData.length ? categoryData[endIndex] : categoryData[categoryData.length - 1];
        return {
            name: 'Fibo',
            data: {
                0: [
                    {
                        xAxis: fibo.time,
                        yAxis: fibo.fibo_high,
                        itemStyle: {
                            color: "rgba(77,227,36,0.2)", // Пример стиля
                            borderColor: "black",
                            borderWidth: 0.1,
                        }
                    },
                    {
                        xAxis: endTime,
                        yAxis: fibo.fibo_middle,
                    },

                ],
            },
        };
    });
}

export function drawFiboDiscoundZone(fibo, categoryData) {
    return fibo.map(fibo => {
        const startIndex = findCandleIndexByDate(categoryData, fibo.time);
        const endIndex = startIndex + 170;
        const endTime = endIndex < categoryData.length ? categoryData[endIndex] : categoryData[categoryData.length - 1];
        return {
            name: 'Fibo',
            data: {
                0: [
                    {
                        xAxis: fibo.time,
                        yAxis: fibo.fibo_middle,
                        itemStyle: {
                            color: "rgba(238,61,61,0.2)", // Пример стиля
                            borderColor: "black",
                            borderWidth: 0.1,
                        }
                    },
                    {
                        xAxis: endTime,
                        yAxis: fibo.fibo_low,
                    },

                ],
            },
        };
    });
}

export function getLinesData(fractals, categoryData) {
    return fractals
        .filter(fractal => fractal.logMessage === "Local low" || fractal.logMessage === "Local high")
        .map(fractal => {
            const startIndex = findCandleIndexByDate(categoryData, fractal.time);
            const endIndex = startIndex + 30; // Сдвиг на 10 свечей вправо
            const endTime = endIndex < categoryData.length ? categoryData[endIndex] : categoryData[categoryData.length - 1];
            return {
                name: fractal.logMessage,
                type: "line",
                data: [
                    [fractal.time, fractal.extreme],
                    [endTime, fractal.extreme]
                ],
                lineStyle: {
                    color: fractal.logMessage === "Local low" ? "red" : "green",
                    width: 1,
                    type: "solid",
                    opacity: 0.9
                },
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        show: false
                    }
                }
            };
        });
}

export function getLinesData2(qm, categoryData) {
    return qm
        .map(f => {
            const startIndex = findCandleIndexByDate(categoryData, f.second_time);
            const endIndex = startIndex + 10; // Сдвиг на 10 свечей вправо
            const endTime = endIndex < categoryData.length ? categoryData[endIndex] : categoryData[categoryData.length - 1];
            return {
                type: "line",
                data: [
                    [f.first_time, f.middle_extreme],
                    [endTime, f.middle_extreme]
                ],
                lineStyle: {
                    color: "rgba(5,51,236,0.9)",
                    width: 2,
                    type: "solid",
                    opacity: 1
                },
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        show: false
                    }
                }
            };
        });
}

export function drawShiftArea(qm, categoryData) {
    return qm.map(f => {
        const startIndex = findCandleIndexByDate(categoryData, f.first_time);
        const endIndex = startIndex + 170;
        const endTime = endIndex < categoryData.length ? categoryData[endIndex] : categoryData[categoryData.length - 1];
        return {
            name: 'ShiftArea',
            data: {
                0: [
                    {
                        xAxis: f.first_time,
                        yAxis: f.first_extreme,
                        itemStyle: {
                            color: "rgba(179,9,217,0.8)", // Пример стиля
                            borderColor: "black",
                            borderWidth: 0.1,
                        }
                    },
                    {
                        xAxis: f.second_time,
                        yAxis: f.middle_extreme,
                    },

                ],
            },
        };
    });
}


export function drawGraphicQmBabyFunction(qm, categoryData) {
    //console.log("Input QM data: ", qm); // Логируем входные данные

    return qm.map(f => {
        //console.log("2-Input QM data: ", qm); // Логируем входные данные
        return {
            type: "polygon",
            shape: {
                ranges: [
                    [f.first_time, f.first_extreme],
                    [f.middle_time, f.middle_extreme],
                    [f.second_time, f.second_extreme]
                ]
            },
            style: {
                fill: '#5470c6',
                stroke: '#a4122d'
            },
            lineStyle: {
                color: "red"
            },
        };
    });
}

function fincFvgIndexByDate(fvgs, dateStr) {
    return fvgs.findIndex(date => date === dateStr);
}

function findCandleIndexByDate(categoryData, dateStr) {
    return categoryData.findIndex(date => date === dateStr);
}

