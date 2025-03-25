
// Import Libraries
#include <WiFi.h>
#include <PubSubClient.h>
#include <NTPClient.h>
#include <HTTPClient.h>
#include <HardwareSerial.h>
#include <Wire.h>
#include "DHT.h"

// Macros
#define TRY_AGAIN 20
#define TRY_AGAIN_INTERVAL 5000  //Time is in milliseconds
#define GPS_RX 16
#define GPS_TX 17
#define DHTPIN 4
#define DHTTYPE 11
#define BUZZERPIN 23
#define GYRO_SCL 22
#define GYRO_SDA 21
#define HMC5883L_ADDR 0x1E
#define HMC5883L_MODE 0x02
#define HMC5883L_DATAX_MSB 0x03

// Keys
const char* ssid = "YmatsWifi";
const char* password = "yash5678";
const char* mqttServer = "broker.mqtt.cool";
const int mqttPort = 1883;
const char* mqttTopic = "esp32/62946/5678";
const char* gpsTopic = "esp32/62946/5678/gps";
const char* dhtTopic = "esp32/62946/5678/dht";
const char* buzzerTopic = "esp32/63946/5678/buzzer";

// Assist Now Keys
const char* assistNowUrl = "https://online-live1.services.u-blox.com/GetOnlineData.ashx";
const char* assistkey = "6qXpZRkLSUi9Z8iEPdK5Bg";
const char* agpsfetch = "https://online-live1.services.u-blox.com/GetOnlineData.ashx?token=6qXpZRkLSUi9Z8iEPdK5Bg;gnss=gps,glo;datatype=eph,alm,aux;";

// Hardware Serial for GPS
HardwareSerial gpsSerial(1);

// DHT Tempertaure and Humidity Sensor Initialization
DHT dht(DHTPIN, DHTTYPE);

// Wifi, Time and MQTT Handlers
WiFiClient espClient;
PubSubClient client(espClient);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 19800, 60000);

/***********************************************************
Name: ConnectToWifi
Return Type:  Void
Description: Simple funciton to connect to the given wifi using credentials
***********************************************************/
void ConnectToWifi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Waiting for Wifi Connection");
  }
  Serial.print("Connected to Wifi ");
  Serial.println(ssid);
}

/***********************************************************
Name: Reconnect
Return Type: Void
Description: Makes Connection to the MQTT Broker, keeps trying in a loop till it runs out of retry's
After retry's are exhausted it resets the device
***********************************************************/
void Reconnect() {
  int retry = TRY_AGAIN;

  while (!client.connected() && retry != 0) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client-01")) {
      Serial.println("connected");
      client.subscribe(buzzerTopic);
      Serial.print("Subscribed to: ");
      Serial.println(buzzerTopic);
    } else {
      Serial.print("failed, rc = ");
      Serial.print(client.state());
      Serial.println(" Will retry after Interval");
      delay(TRY_AGAIN_INTERVAL);
      retry--;
    }
  }

  if (!client.connected() && retry == 0) {
    Serial.println("MQTT connection failed after retries.");
  }
}


/***********************************************************
Name: getCurrentDateTime
Return Type: String
Description: Retrieves Current DateTime and returns it as a String
***********************************************************/
String getCurrentDateTime() {
  timeClient.update();
  unsigned long epochTime = timeClient.getEpochTime();

  time_t rawtime = epochTime;
  struct tm* timeinfo;
  timeinfo = localtime(&rawtime);

  char dateTimeStr[15];
  sprintf(dateTimeStr, "%04d%02d%02d%02d%02d%02d",
          timeinfo->tm_year + 1900, timeinfo->tm_mon + 1, timeinfo->tm_mday,
          timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec);

  return String(dateTimeStr);
}

/***********************************************************
Name: enableAGPS_AT6558
Return Type: void
Description: 
***********************************************************/
void enableAGPS_AT6558() {
  Serial.println("Enabling AGPS mode for AT6558...");
  gpsSerial.println("$PUBX,41,1,0007,0003,9600,0*14");  // Set protocol to UBX
  delay(500);
  gpsSerial.println("$PCAS01,1*1E");  // Enable AGPS
  delay(500);
}


/***********************************************************
Name: fetchAndSendAGPSData
Return Type: void
Description: 
***********************************************************/
void fetchAndSendAGPSData() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected!");
    return;
  }

  Serial.println("Fetching AGPS data...");
  HTTPClient http;
  http.begin(agpsfetch);
  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    Serial.printf("HTTP Response code: %d\n", httpResponseCode);

    // Get content length
    int contentLength = http.getSize();
    Serial.printf("AGPS UBX file size: %d bytes\n", contentLength);

    WiFiClient* stream = http.getStreamPtr();
    uint8_t buffer[512];  // Buffer to store chunks of UBX data
    int bytesSent = 0;

    Serial.println("Previewing first 50 bytes of AGPS data:");
    int previewCount = 0;

    Serial.println("Sending AGPS data to GPS module...");
    while (bytesSent < contentLength) {
      int bytesRead = stream->read(buffer, sizeof(buffer));  // Read chunk

      if (bytesRead > 0) {
        // Print first 50 bytes of AGPS data in HEX format
        for (int i = 0; i < bytesRead && previewCount < 50; i++, previewCount++) {
          Serial.printf("%02X ", buffer[i]);
        }

        gpsSerial.write(buffer, bytesRead);  // Send chunk to GPS
        bytesSent += bytesRead;
        Serial.printf("\nSent %d/%d bytes\n", bytesSent, contentLength);
      } else {
        Serial.println("No more data to read.");
        break;
      }
    }

    Serial.println("\nAGPS data fully sent!");

    // Read GPS response after AGPS data is sent
    delay(2000);  // Wait for GPS to process data
    Serial.println("Checking GPS response...");
    while (gpsSerial.available()) {
      Serial.write(gpsSerial.read());  // Print GPS response
    }

  } else {
    Serial.printf("HTTP Request failed: %s\n", http.errorToString(httpResponseCode).c_str());
  }

  http.end();
  gpsSerial.flush();  // Clear GPS buffer after sending AGPS data
}


/***********************************************************
Name: forceHotStart
Return Type: void
Description: 
***********************************************************/
void forceHotStart() {
  Serial.println("Forcing GPS hot start...");
  gpsSerial.println("$PCAS10,1*1F");  // Force hot start
}

/***********************************************************
Name: waitForUBX_ACK
Return Type: void
Description: 
***********************************************************/
void waitForUBX_ACK() {
    Serial.println("Waiting for UBX-ACK...");
    unsigned long startTime = millis();
    while (millis() - startTime < 5000) {  // Wait for 5 seconds
        if (gpsSerial.available()) {
            byte data = gpsSerial.read();
            Serial.printf("%02X ", data);  // Print in HEX
        }
    }
    Serial.println("\nDone waiting for UBX-ACK.");
}


// Global Variables
bool buzzerEnable;
bool buzzerState;
unsigned long buzzerStartTime;
unsigned long currentTime;


// MQTT Callback
void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  String msg = "";
  for (int i = 0; i < length; i++) {
    msg += (char)message[i]; // Append to msg string
  }

  Serial.println(msg); // Print message only after it's completely received

  if (msg.equals("buzzerOn")) {
    buzzerEnable = true;
    Serial.println("Buzzer Enabled");
  } else if (msg.equals("buzzerOff")) {
    buzzerEnable = false;
    Serial.println("Buzzer Disabled");
  }
}


// MAIN SETUP FUNCTION
void setup() {
  // Set Serial
  Serial.begin(115200);
  gpsSerial.begin(115200, SERIAL_8N1, GPS_RX, GPS_TX);


  // Create connection to Wifi
  ConnectToWifi();

  // Set MQTT Broker
  client.setServer(mqttServer, mqttPort);

  // Subscribe to Buzzer Topic
  client.setCallback(callback);
  client.subscribe(buzzerTopic, 0);
  

  // Initialize ans Set Time
  timeClient.begin();
  timeClient.update();

  // Initialize DHT Sensor
  dht.begin();

  // Initialize Buzzer
  pinMode(BUZZERPIN, OUTPUT);
  buzzerEnable = false;
  buzzerState = false;
  buzzerStartTime = 0;
  currentTime = 0;

  // Initialize GPS
  enableAGPS_AT6558();
  fetchAndSendAGPSData();

  // Call this function after AGPS data is sent
  waitForUBX_ACK();
  forceHotStart();
}

// MAIN LOOP FUNCTION
void loop() {



  // MQTT Client Handling  ------------------------------

  if (!client.connected()) { Reconnect(); }
  client.loop();




  // DHT ---------------------

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  String dateTime = getCurrentDateTime();
  String dhtMessage = "{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + ",\"DateTime\":" + dateTime + "}";
  if (client.publish(dhtTopic, dhtMessage.c_str())) { /* Do Nothing */ } else { Serial.println("Failed to publish DHT message"); }



  // GPS ---------------------

  String gpsData = "";
  if (gpsSerial.available()) {
    gpsData = gpsSerial.readStringUntil('\n');
    gpsData.trim();
  }
  if (gpsData.startsWith("$GNGGA")) {
    String dateTime = getCurrentDateTime();
    String message = "{\"gps\":" + gpsData + ",\"DateTime\":" + dateTime + "}";

    if (client.publish(gpsTopic, message.c_str())) {
      Serial.println("Published: " + message);
    } else {
      Serial.println("Publish failed");
    }
  }




  // Buzzer ------------------------

  if(buzzerEnable)
  {
    currentTime = millis();

    if(buzzerState)
    {
      if(currentTime - buzzerStartTime >= 500)
      {
        Serial.println("going low");
        digitalWrite(BUZZERPIN, LOW);
        buzzerState = false;
        buzzerStartTime = currentTime;
      }
    }
    else
    {
      if(currentTime - buzzerStartTime >= 500)
      {
        Serial.println("going high");
        digitalWrite(BUZZERPIN, HIGH);
        buzzerState = true;
        buzzerStartTime = currentTime;
      } 
    }
  }

}
