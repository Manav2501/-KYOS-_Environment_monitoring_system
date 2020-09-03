var blynkLib = require('blynk-library');
var sensorLib = require('node-dht-sensor');
var opn = require('opn');

var AUTH = 'B0UB6oYbsD-WS8uQM7ktspOAw7pE1rwr';

// Setup Blynk
var blynk = new blynkLib.Blynk(AUTH);

// Setup sensor, exit if failed
var sensorType = 11; // 11 for DHT11, 22 for DHT22 and AM2302
var DHTPin  = 17;  // The GPIO pin number for sensor signal
if (!sensorLib.initialize(sensorType, DHTPin)) {
    console.warn('Failed to initialize sensor');
    process.exit(1);
}

// Automatically update sensor value every 2 seconds
setInterval(function() {
    var readout = sensorLib.read();
    blynk.virtualWrite(2, readout.temperature.toFixed(1));
    blynk.virtualWrite(3, readout.humidity.toFixed(1));
     opn('http://10.1.36.241/send_epd.php?temp='+readout.temperature.toString()+'&humid='+readout.humidity.toString());
    console.log('Temperature:', readout.temperature.toFixed(1) + 'C');
    console.log('Humidity:   ', readout.humidity.toFixed(1)    + '%');
    
    if(readout.humidity  > 70)
    { 
        console.log("high Humidity");
        blynk.notify("Humidity is high");
        blynk.email("manavchotalia@gmail.com","Alert","Humidity is high");
    } 
        
    if(readout.temperature  < 5)
    { 
        console.log("Low Temperature");
        blynk.notify("Low Temperature");
        blynk.email("manavchotalia@gmail.com","Alert","Temprature is too Low");
    } 
        
    if(readout.temperature  > 35)
    { 
        console.log("high Temperature");
        blynk.notify("high Temperature");
        blynk.email("manavchotalia@gmail.com","Alert","Temprature is too High");
    } 
}, 5000);

