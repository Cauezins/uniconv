const unitConversions = {
    distance: {
        meters: 1,
        kilometers: 0.001,
        miles: 0.000621371,
        yards: 1.09361,
        feet: 3.28084,
        inches: 39.3701,
    },
    weight: {
        grams: 1,
        kilograms: 0.001,
        pounds: 0.00220462,
        ounces: 0.035274,
        tons: 0.000001,
    },
    temperature: {
        celsius: (value, toUnit) => {
        if (toUnit === "fahrenheit") return value * 9 / 5 + 32;
        if (toUnit === "kelvin") return value + 273.15;
        return value;
        },
        fahrenheit: (value, toUnit) => {
        if (toUnit === "celsius") return (value - 32) * 5 / 9;
        if (toUnit === "kelvin") return (value - 32) * 5 / 9 + 273.15;
        return value;
        },
        kelvin: (value, toUnit) => {
        if (toUnit === "celsius") return value - 273.15;
        if (toUnit === "fahrenheit") return (value - 273.15) * 9 / 5 + 32;
        return value;
        },
    },
    area: {
        squareMeters: 1,
        squareKilometers: 0.000001,
        hectares: 0.0001,
        acres: 0.000247105,
        squareFeet: 10.7639,
    },
    volume: {
        liters: 1,
        milliliters: 1000,
        cubicMeters: 0.001,
        cubicFeet: 0.0353147,
        gallons: 0.264172,
    },
    pressure: {
        pascal: 1,
        bar: 0.00001,
        psi: 0.000145038,
    },
    data: {
        bytes: 1,
        kilobytes: 1 / 1024,
        megabytes: 1 / (1024 ** 2),
        gigabytes: 1 / (1024 ** 3),
        terabytes: 1 / (1024 ** 4),
        petabytes: 1 / (1024 ** 5),
    },
    power: {
        watts: 1,
        kilowatts: 0.001,
        horsepower: 0.00134102,
    },
    fuelEconomy: {
        kilometersPerLiter: 1,
        milesPerGallon: 2.35215,
    },
    flow: {
        litersPerSecond: 1,
        cubicMetersPerSecond: 0.001,
        gallonsPerMinute: 15.8503,
    },
};

const specialConversions = {
litersToSquareMeters: (liters, thicknessInMeters = 0.01) => {
    return liters / thicknessInMeters;
},
weightToVolume: (weightInKg, densityKgPerL = 1) => {
    return weightInKg / densityKgPerL;
},
volumeToWeight: (volumeInLiters, densityKgPerL = 1) => {
    return volumeInLiters * densityKgPerL;
},
fuelEfficiency: (value, fromUnit, toUnit) => {
    if (fromUnit === "kilometersPerLiter" && toUnit === "milesPerGallon") {
    return value * 2.35215;
    }
    if (fromUnit === "milesPerGallon" && toUnit === "kilometersPerLiter") {
    return value / 2.35215;
    }
    throw new Error("Invalid fuel efficiency units.");
},
};

function convert(value, fromUnit, toUnit, options = {}) {
// Validação de entrada
if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Value must be a valid number.");
}
if (!fromUnit || !toUnit) {
    throw new Error("Both 'fromUnit' and 'toUnit' must be provided.");
}

// Conversões especiais
if (fromUnit === "liters" && toUnit === "squareMeters") {
    const thickness = options.thickness || 0.01;
    return specialConversions.litersToSquareMeters(value, thickness);
}
if (fromUnit === "kilograms" && toUnit === "liters") {
    const density = options.density || 1;
    return specialConversions.weightToVolume(value, density);
}
if (fromUnit === "liters" && toUnit === "kilograms") {
    const density = options.density || 1;
    return specialConversions.volumeToWeight(value, density);
}
if (["kilometersPerLiter", "milesPerGallon"].includes(fromUnit)) {
    return specialConversions.fuelEfficiency(value, fromUnit, toUnit);
}

// Conversões gerais
for (const category in unitConversions) {
    const units = unitConversions[category];
    if (units[fromUnit] && units[toUnit]) {
    // Conversão de temperaturas
    if (typeof units[fromUnit] === "function") {
        return units[fromUnit](value, toUnit);
    }
    // Conversão normal
    return (value * units[fromUnit]) / units[toUnit];
    }
}

throw new Error(`Conversion from "${fromUnit}" to "${toUnit}" is not supported.`);
}

module.exports = { convert };
