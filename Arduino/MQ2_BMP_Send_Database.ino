#include <SPI.h>
#include <Ethernet.h>
#include <SFE_BMP180.h>
#include <Wire.h>

int AirQualitySensorValue;

SFE_BMP180 pressure;

double baseline; // baseline pressure


byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(10,20,24,116);

// initialize the library instance:
EthernetClient client;

char server[] = "10.1.36.241";
const size_t maxSize = 512;
char response[512];  // variable to store the value coming from the sensor
void setup() {
  // start serial port:
  Serial.begin(9600);
  
  Serial.println("--- Start ---");
  
  // give the ethernet module time to boot up:
  delay(1000);
  // start the Ethernet connection using a fixed IP address and DNS server:
  Serial.println(Ethernet.begin(mac));
  // print the Ethernet board/shield's IP address:
  Serial.print("My IP address: ");
  Serial.println(Ethernet.localIP());

 if (pressure.begin())
    Serial.println("BMP180 init success");
  else
  {
    // Oops, something went wrong, this is usually a connection problem,
    // see the comments at the top of this sketch for the proper connections.

    Serial.println("BMP180 init fail (disconnected?)\n\n");
    while(1); // Pause forever.
  }

  // Get the baseline pressure:
  
  baseline = getPressure();
  
  Serial.print("baseline pressure: ");
  Serial.print(baseline);
  Serial.println(" mb");  
}

void loop() {
  //sensorValue = analogRead(pin);
  //Serial.println(sensorValue);
 httpRequest();
}

// this method makes a HTTP connection to the server:
void httpRequest() {
  double a,P;
  
  P = getPressure();
  a = pressure.altitude(P,baseline);
  
  Serial.print("relative altitude: ");
  if (a >= 0.0) Serial.print(" "); // add a space for positive numbers
  Serial.print(a,1);
  Serial.print(" meters, ");
  if (a >= 0.0) Serial.print(" "); // add a space for positive numbers
  Serial.print(a*3.28084,0);
  Serial.println(" feet");
  
  delay(1000);

  AirQualitySensorValue = analogRead(A8);       // read analog input pin 0
  Serial.print("AirQua= ");
  Serial.print(AirQualitySensorValue, DEC);               // prints the value read
  Serial.println(" PPM");
  
  delay(1000);

  
    client.stop();
  if (client.connect(server, 80)) {
    Serial.println("connected");
    String s ="GET /send_epd1.php?aqi="+String(AirQualitySensorValue)+"&altitude="+String(P);
    Serial.println(s);
    client.println(s);
    
    client.println("Host: 10.20.37.53");
    delay(1000);
    size_t len = client.readBytes(response, 512);
    response[len] = 0;
    client.println("Connection: close");
    client.println();
    Serial.println(response);
  }
  else
    Serial.println("connection failed");
}

double getPressure()
{
  char status;
  double T,P,p0,a;

  
  status = pressure.startTemperature();
  if (status != 0)
  {
    // Wait for the measurement to complete:

    delay(status);

    // Retrieve the completed temperature measurement:
    // Note that the measurement is stored in the variable T. 
    // Use '&T' to provide the address of T to the function.
    // Function returns 1 if successful, 0 if failure.

    status = pressure.getTemperature(T);
    if (status != 0)
    {

      status = pressure.startPressure(3);
      if (status != 0)
      {
        // Wait for the measurement to complete:
        delay(status);

        status = pressure.getPressure(P,T);
        if (status != 0)
        {
          return(P);
        }
        else Serial.println("error retrieving pressure measurement\n");
      }
      else Serial.println("error starting pressure measurement\n");
    }
    else Serial.println("error retrieving temperature measurement\n");
  }
  else Serial.println("error starting temperature measurement\n");
}
