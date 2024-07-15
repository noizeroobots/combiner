export function getMarkPoints(fractals) {
    return fractals
        .filter(fractal => fractal.log_message === "Local low" || fractal.log_message === "Local high")
        .map(fractal => {
            let offsetPercent = 1; // Процентное смещение от extreme

            // Вычисляем процентное значение от extreme
            let offsetValue = fractal.extreme * (offsetPercent / 100);

            return {
                coord: [
                    fractal.time,
                    fractal.log_message === "Local low"
                        ? fractal.extreme - offsetValue
                        : fractal.extreme + offsetValue,
                ],
                value: fractal.log_message,
                itemStyle: {
                    color: fractal.log_message === "Local low" ? "red" : "green",
                    opacity: 0.7,
                },
                symbol: "triangle",
                symbolRotate: fractal.log_message === "Local low" ? 0 : 180,
                symbolSize: 8,
                label: {
                    show: false,
                },
            };
        });
}

export function getMarkAreas(fvgs) {
    return fvgs.map(fvg => ({
        data: [
            [
                {
                    xAxis: fvg.time,
                    yAxis: fvg.fvg_low
                },
                {
                    xAxis: fvg.end_time,
                    yAxis: fvg.fvg_high
                },
            ]
        ]
    }));
}

export function getMarkShortLines(fractals, addHoursToDate) {
    return fractals
        .filter(fractal => fractal.log_message === "Local low" || fractal.log_message === "Local high")
        .map(fractal => ({
            name: fractal.log_message,
            yAxis: fractal.extreme,
            lineStyle: {
                color: fractal.log_message === "Local low" ? "red" : "green",
                width: 0.9,
                type: "solid",
            },
            label: {
                show: true,
                position: 'start'
            },
            data: [
                {
                    coord: [fractal.time, fractal.extreme],
                },
                {
                    coord: [addHoursToDate(fractal.time, 5), fractal.extreme],
                },
            ],
        }));
}


export function getLinesData(fractals, categoryData) {
    return fractals
        .filter(fractal => fractal.log_message === "Local low" || fractal.log_message === "Local high")
        .map(fractal => {
            const startIndex = findCandleIndexByDate(categoryData, fractal.time);
            const endIndex = startIndex + 30; // Сдвиг на 10 свечей вправо
            const endTime = endIndex < categoryData.length ? categoryData[endIndex] : categoryData[categoryData.length - 1];

            return {
                name: fractal.log_message,
                type: "line",
                data: [
                    [fractal.time, fractal.extreme],
                    [endTime, fractal.extreme]
                ],
                lineStyle: {
                    color: fractal.log_message === "Local low" ? "red" : "green",
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
