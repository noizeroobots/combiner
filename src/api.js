export async function fetchData(component) {
    try {
        const response = await fetch("http://localhost:3000/candlesstick");
        const data = await response.json();

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

        component.extendData(component.categoryData, component.values, 250);
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

export async function fetchFvgs(component) {
    try {
        const response = await fetch('http://localhost:3000/fvg-from-db');
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