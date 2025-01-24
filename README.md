
# Unit Converter Library

Welcome to the Unit Converter Library! 🎉  
This library helps developers perform unit conversions for a wide range of categories such as distance, weight, temperature, area, volume, pressure, data, power, fuel economy, and more. It even includes advanced scientific conversions for specialized applications.

---

## 🚀 Installation

Install the library via npm:

```bash
npm install unit-convertor-js
```

---

## 🛠️ Usage

First, import the library into your project:

```javascript
const { convert } = require('unit-convertor-js');
```

Then, start converting! 🚀

---

## 📚 Supported Categories

### **Distance**
- Units: meters, kilometers, miles, yards, feet, inches

### **Weight**
- Units: grams, kilograms, pounds, ounces, tons

### **Temperature**
- Units: celsius, fahrenheit, kelvin

### **Area**
- Units: squareMeters, squareKilometers, hectares, acres

### **Volume**
- Units: liters, milliliters, cubicMeters, gallons

### **Pressure**
- Units: pascal, bar, psi

### **Data**
- Units: bytes, kilobytes, megabytes, gigabytes, terabytes

### **Power**
- Units: watts, kilowatts, horsepower

### **Fuel Economy**
- Units: kilometersPerLiter, milesPerGallon

### **Advanced**
- Examples: liters ↔ square meters, kilograms ↔ liters, and more

---

## 🧮 Examples

### Basic Conversion
Perform a simple conversion between two units of the same category:

```javascript
// Convert 100 meters to kilometers
console.log(convert(100, "meters", "kilometers")); 
// Output: 0.1

// Convert 50 grams to pounds
console.log(convert(50, "grams", "pounds")); 
// Output: 0.110231
```

### Temperature Conversion
Convert between Celsius, Fahrenheit, and Kelvin:

```javascript
// Convert 25 Celsius to Fahrenheit
console.log(convert(25, "celsius", "fahrenheit")); 
// Output: 77

// Convert 300 Kelvin to Celsius
console.log(convert(300, "kelvin", "celsius")); 
// Output: 26.85
```

### Advanced Conversion
Use additional parameters for specialized calculations:

#### Liters to Square Meters
Specify the thickness in meters for accurate area calculation.

```javascript
console.log(convert(20, "liters", "squareMeters", { thickness: 0.05 })); 
// Output: 400
```

#### Weight to Volume
Specify the density (kg/L):

```javascript
console.log(convert(10, "kilograms", "liters", { density: 0.8 })); 
// Output: 12.5
```

#### Fuel Economy
Convert between kilometers per liter and miles per gallon:

```javascript
console.log(convert(5, "kilometersPerLiter", "milesPerGallon")); 
// Output: 11.76
```

---

## 🛡️ Error Handling

The library provides clear error messages for invalid conversions:

```javascript
try {
  console.log(convert(100, "grams", "meters")); // Invalid conversion
} catch (error) {
  console.error(error.message); 
  // Output: Conversion from "grams" to "meters" is not supported.
}
```

---

## 🧪 Testing the Library

### 1. Install Jest for Testing
Use Jest for easy testing:

```bash
npm install jest --save-dev
```

### 2. Create a Test File
Create a file called `unitConverter.test.js`:

```javascript
const { convert } = require('./unitConverter');

// Test basic conversions
test("Convert meters to kilometers", () => {
  expect(convert(1000, "meters", "kilometers")).toBe(1);
});

test("Convert grams to pounds", () => {
  expect(convert(1000, "grams", "pounds")).toBeCloseTo(2.20462);
});

// Test temperature conversions
test("Convert Celsius to Fahrenheit", () => {
  expect(convert(0, "celsius", "fahrenheit")).toBe(32);
});

test("Convert Kelvin to Celsius", () => {
  expect(convert(300, "kelvin", "celsius")).toBeCloseTo(26.85);
});

// Test advanced conversions
test("Convert liters to square meters (thickness)", () => {
  expect(convert(20, "liters", "squareMeters", { thickness: 0.05 })).toBe(400);
});

test("Convert kilograms to liters (density)", () => {
  expect(convert(10, "kilograms", "liters", { density: 0.8 })).toBe(12.5);
});

// Test invalid conversions
test("Invalid conversion", () => {
  expect(() => convert(100, "grams", "meters")).toThrow();
});
```

### 3. Run the Tests
Run the tests using:

```bash
npx jest unitConverter.test.js
```

---

## 🔮 Future Features (Coming Soon)

- 🌍 **Currency Converter**: Convert between currencies using real-time exchange rates.
- 📡 **Astronomical Units**: Light years, parsecs, and more.
- 🚀 **Speed**: Kilometers per hour ↔️ Miles per hour ↔️ Meters per second.

---

## ❤️ Feedback and Contributions

We love contributions! Feel free to fork the repository, suggest features, or submit issues. 🛠️
