export function getMarkPoints(fractals) {
    return fractals
        .filter(fractal => fractal.logMessage === "Local low" || fractal.logMessage === "Local high")
        .map(fractal => {
            let offsetPercent = 1; // Процентное смещение от extreme

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
            itemStyle: {
                show: true,
                color: "rgba(255, 255, 0, 0.2)", // Пример стиля
                borderColor: "green",
                borderWidth: 1,
            },
            label: {
                show: true,
                position: ['50%', '50%'],
                color: "green",
                fontSize: 12,
                fontStyle: "bold",
            },
            data: [
                [
                    {
                        xAxis: fvg.time,
                        yAxis: fvg.fvgLow
                    },
                    {
                        xAxis: endTime,
                        yAxis: fvg.fvgHigh
                    },
                ]
            ],
        };
    });
}

export function drawFibo(fibo) {
    return fibo.map(fibo => {
        // const startIndex = findFiboIndexByDate(fibo, fibo.time);
        // console.log("DEBUG: startIndex: ", startIndex);
        // console.log("DEBUG: fiboTime: ", fibo.time);
        // const endIndex = startIndex + 10; // Сдвиг на 10 свечей вправо
        // const endTime = endIndex < fibo.length ? fibo[endIndex] : fibo[fibo.length - 1];
        return {
            name: 'Fibo',
            data: [
                [
                    {
                        xAxis: fibo.time,
                        yAxis: fibo.fibo_high
                    },
                    {
                        xAxis: "2024-07-19T08:00:00Z",
                        yAxis: fibo.fibo_low
                    },
                ]
            ],
            itemStyle: {
                show: true,
                color: "rgba(162,5,34,0.2)", // Пример стиля
                borderColor: "green",
                borderWidth: 1,
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

function fincFvgIndexByDate(fvgs, dateStr) {
    return fvgs.findIndex(date => date === dateStr);
}

function findFiboIndexByDate(fibo, dateStr) {
    return fibo.findIndex(date => date === dateStr);
}

function findCandleIndexByDate(categoryData, dateStr) {
    return categoryData.findIndex(date => date === dateStr);
}

