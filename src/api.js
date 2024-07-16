export async function fetchCandles(component, ticker) {
    try {
        const response = await fetch(`http://localhost:3000/candlesstick?ticker=${ticker}`);
        const data = await response.json();
        if (data.length === 0) {
            console.error("ERROR: Предоставлена пустая база данных...");
        }
        if (!Array.isArray(data)) {
            console.error("Data is not an array");
            return;
        }
        component.categoryData = data.map((item) => item.time);
        component.values = data.map((item) => [
            item.open,
            item.close,
            item.low,
            item.high,
        ]);
        component.extendXAxisByEmptyCandles(component.categoryData, component.values, 250);
        component.drawChart();
    } catch (error) {
        console.error("ERROR: Error fetching data...\n\n", error);
    }
}

export async function fetchTickers(component) {
    try {
        const response = await fetch("http://localhost:3000/tickers");
        const text = await response.text();
        // Парсим JSON из текста
        const data = JSON.parse(text);
        if (data.length === 0) {
            console.error("ERROR: Предоставлена пустая база данных...");
        }

        if (!Array.isArray(data)) {
            console.error("Data is not an array");
            return [];
        }
        return data.map((item) => item.ticker);
    } catch (error) {
        console.error("ERROR: Error fetching tickers...\n\n", error);
        return [];
    }
}

export async function fetchCandles4Hours(component, ticker) {
    try {
        const response = await fetch(`http://localhost:3000/candlesstick-4hours?ticker=${ticker}`);
        const data = await response.json();
        if (data.length === 0) {
            console.error("ERROR: Предоставлена пустая база данных...");
        }
        if (!Array.isArray(data)) {
            console.error("Data is not an array");
            return;
        }
        component.categoryData = data.map((item) => item.time);
        component.values = data.map((item) => [
            item.open,
            item.close,
            item.low,
            item.high,
        ]);
        component.extendXAxisByEmptyCandles(component.categoryData, component.values, 250);
        component.drawChart();
    } catch (error) {
        console.error("ERROR: Error fetching data...\n\n", error);
    }
}

export async function fetchFractals(component, ticker) {
    try {
        const response = await fetch(`http://localhost:3000/fractals-from-db?ticker=${ticker}`);
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error("Fractals data is not an array");
            return;
        }
        component.fractals = data;
        component.drawChart();
    } catch (error) {
        console.error("ERROR: Error fetching fractals...\n\n", error.toString());
    }
}

export async function fetchFractals4Hour(component, ticker) {
    try {
        const response = await fetch(`http://localhost:3000/fractals-from-db-4hours?ticker=${ticker}`);
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error("Fractals data is not an array");
            return;
        }
        component.fractals = data;
        component.drawChart();
    } catch (error) {
        console.error("ERROR: Error fetching fractals...\n\n", error.toString());
    }
}

export async function fetchFvgs(component, ticker) {
    try {
        const response = await fetch(`http://localhost:3000/fvg-from-db?ticker=${ticker}`);
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error("FVG data is not an array");
            return;
        }
        component.fvgs = data;
        component.drawChart();
    } catch (error) {
        console.log('ERROR: Какая-то ошибка с достованием FVG...\n\n', error);
    }
}

export async function fetchFvgs4Hour(component, ticker) {
    try {
        const response = await fetch(`http://localhost:3000/fvg-from-db-4hours?ticker=${ticker}`);
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error("FVG data is not an array");
            return;
        }
        component.fvgs = data;
        component.drawChart();
    } catch (error) {
        console.log('ERROR: Какая-то ошибка с достованием FVG...\n\n', error);
    }
}