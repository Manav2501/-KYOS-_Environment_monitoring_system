const gpio = require('pi-gpio').Gpio;

var ldr = 22;
var led = 7;

console.log("exporting ports with gpio-admin");
gpio.open(ldr,"in", function() {
	gpio.open(led, "out", function() {
		console.log("ports are exported, starting read/write cycle");
		doRead();
	});
});

function doRead() {
	gpio.read(ldr, function(err, value) {
		if(err) throw err;
		if(value == 0) {
			gpio.write(led, 1, delayNext);
		}
		else {
			gpio.write(led, 0, delayNext);
		}	        
	});
}

function delayNext() {
	setTimeout(doRead, 10);
}

process.stdin.resume();
process.on("SIGINT", function() {
        console.log("received SIGINT, unexporting ports");
        gpio.close(led);
        gpio.close(ldr);
        process.exit(0);
});
