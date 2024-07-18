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
                    fractal.logMessage === "Local low"
                        ? fractal.extreme - offsetValue
                        : fractal.extreme + offsetValue,
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
            ]
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

function findCandleIndexByDate(categoryData, dateStr) {
    return categoryData.findIndex(date => date === dateStr);
}
