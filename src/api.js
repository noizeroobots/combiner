export async function fetchCandles(component) {
    try {
        const response = await fetch("http://localhost:3000/candlesstick");
        const data = await response.json();
        console.log("DEBUG: Кол-во свечек из БД - ", data.length);

        if(data.length === 0 ){
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


export async function fetchCandles4Hours(component) {
    try {
        const response = await fetch("http://localhost:3000/candlesstick-4hours");
        const data = await response.json();
        console.log("DEBUG: Кол-во свечек из БД - ", data.length);

        if(data.length === 0 ){
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

export async function fetchFractals(component) {
    try {
        const response = await fetch("http://localhost:3000/fractals-from-db");
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
export async function fetchFractals4Hour(component) {
    try {
        const response = await fetch("http://localhost:3000/fractals-from-db-4hours");
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

export async function fetchFvgs(component, limitFvg) {
    try {
        const response = await fetch('http://localhost:3000/fvg-from-db?limit=${limit}');
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