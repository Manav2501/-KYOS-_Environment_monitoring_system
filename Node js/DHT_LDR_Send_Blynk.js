var blynkLib = require('blynk-library');
var sensorLib = require('node-dht-sensor');
var gpio = require('pi-gpio');

var AUTH = 'B0UB6oYbsD-WS8uQM7ktspOAw7pE1rwr';

// Setup Blynk
var blynk = new blynkLib.Blynk(AUTH);

// Setup sensor, exit if failed
var sensorType = 11; // 11 for DHT11, 22 for DHT22 and AM2302
var DHTPin  = 17;  // The GPIO pin number for sensor signal
var ldr = 22;

if (!sensorLib.initialize(sensorType, DHTPin)) {
    console.warn('Failed to initialize sensor');
    process.exit(1);
}

// Automatically update sensor value every 2 seconds
setInterval(function() {
    var readout = sensorLib.read();
    blynk.virtualWrite(2, readout.temperature.toFixed(1));
    blynk.virtualWrite(3, readout.humidity.toFixed(1));
    blynk.virtualWrite(4, ldr);
    
    console.log('Temperature:', readout.temperature.toFixed(1) + 'C');
    console.log('Humidity:   ', readout.humidity.toFixed(1)    + '%');
	console.log('LDR:   ', ldr);
}, 2000);
