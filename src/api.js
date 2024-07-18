export async function fetchCandles(component, ticker) {
    try {
        // Делаем запрос к новому серверу напрямую
        const response = await fetch(`http://localhost:8089/api/candles/get-candles-fifteen-minutes?ticker=${ticker}`);
        const data = await response.json();


        if (data.length === 0) {
            console.error("ERROR: Предоставлена пустая база данных...");
        }
        if (!Array.isArray(data)) {
            console.error("Data is not an array");
            return;
        }

        // Обновляем данные компонента
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

export async function fetchTickers() {
    try {
        const response = await fetch(`http://localhost:8089/api/tickers/get-tickers`);
        const data = await response.json();
        if (data.length === 0) {
            console.error("ERROR: Предоставлена пустой массив JSON..");
        }

        if (!Array.isArray(data)) {
            console.error("ERROR: Предоставленные данные не являются массивом JSON...");
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
        const response = await fetch(`http://localhost:8089/api/candles/get-candles-four-hours?ticker=${ticker}`);
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
        const response = await fetch(`http://localhost:8089/api/fractal/get-fractal-fifteen-minutes?ticker=${ticker}`);
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
        const response = await fetch(`http://localhost:8089/api/fractal/get-fractal-four-hours?ticker=${ticker}`);
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
        const response = await fetch(`http://localhost:8089/api/fvg/get-fvg-fifteen-minutes?ticker=${ticker}`);
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
        const response = await fetch(`http://localhost:8089/api/fvg/get-fvg-four-hours?ticker=${ticker}`);
        const data = await response.json();
        //console.log("DEBUG: Данные из АПИ для FVG: ", data)
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