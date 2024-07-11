export function getMarkPoints(fractals) {
    return fractals
        .filter(fractal => fractal.log_message === "Local low" || fractal.log_message === "Local high")
        .map(fractal => ({
            coord: [
                fractal.time,
                fractal.log_message === "Local low"
                    ? fractal.extreme - 10
                    : fractal.extreme + 10,
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
        }));
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

export function getLinesData(fractals, addHoursToDate) {
    return fractals
        .filter(fractal => fractal.log_message === "Local low" || fractal.log_message === "Local high")
        .map(fractal => ({
                name: fractal.log_message,
                type: "line",
                data: [
                    [fractal.time, fractal.extreme],
                    [addHoursToDate(fractal.time, 50).toISOString().replace(".000", ""), fractal.extreme]
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
                },
            }
        ));
}
