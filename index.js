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
    time: {
      seconds: 1,
      minutes: 1 / 60,
      hours: 1 / 3600,
      days: 1 / 86400,
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
    speed: {
      metersPerSecond: 1,
      kilometersPerHour: 3.6,
      milesPerHour: 2.23694,
      knots: 1.94384,
    },
    energy: {
      joules: 1,
      kilojoules: 0.001,
      calories: 0.239006,
      kilocalories: 0.000239006,
      wattHours: 0.000277778,
    },
  };
  
  // Conversões especiais entre categorias (como volume ↔️ área ou peso ↔️ volume)
  const specialConversions = {
    litersToSquareMeters: (liters, thicknessInMeters = 0.01) => {
      return liters / thicknessInMeters; // Exemplo: Volume distribuído sobre uma espessura
    },
    weightToVolume: (weightInKg, densityKgPerL = 1) => {
      return weightInKg / densityKgPerL; // Exemplo: Converte peso em volume com densidade
    },
    volumeToWeight: (volumeInLiters, densityKgPerL = 1) => {
      return volumeInLiters * densityKgPerL; // Exemplo: Volume convertido em peso com densidade
    },
  };
  
  function convert(value, fromUnit, toUnit, options = {}) {
    // Verificar se é uma conversão especial
    if (fromUnit === "liters" && toUnit === "squareMeters") {
      const thickness = options.thickness || 0.01; // Espessura padrão: 1 cm
      return specialConversions.litersToSquareMeters(value, thickness);
    }
    if (fromUnit === "kilograms" && toUnit === "liters") {
      const density = options.density || 1; // Densidade padrão: 1kg/L (água)
      return specialConversions.weightToVolume(value, density);
    }
    if (fromUnit === "liters" && toUnit === "kilograms") {
      const density = options.density || 1;
      return specialConversions.volumeToWeight(value, density);
    }
  
    // Conversões normais
    for (const category in unitConversions) {
      const units = unitConversions[category];
      if (units[fromUnit] && units[toUnit]) {
        if (typeof units[fromUnit] === "function") {
          return units[fromUnit](value, toUnit);
        }
        return (value * units[fromUnit]) / units[toUnit];
      }
    }
    throw new Error(`Conversion from "${fromUnit}" to "${toUnit}" is not supported.`);
  }
  
  module.exports = { convert };
  