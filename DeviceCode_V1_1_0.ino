
// Import Libraries
#include <WiFi.h>
#include <PubSubClient.h>
#include <NTPClient.h>
#include <HTTPClient.h>

// Macros
#define TRY_AGAIN 20
#define TRY_AGAIN_INTERVAL 5000 //Time is in milliseconds 

// Keys
const char* ssid = "YmatsWifi";
const char* password = "yash5678";
const char* mqttServer = "broker.mqtt.cool";
const int mqttPort = 1883;
const char* mqttTopic = "esp32/62946/5678";

// Assist Now Keys
const char* assistNowUrl = "https://online-live1.services.u-blox.com/GetOnlineData.ashx";
const char* assistkey = 
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
  while(WiFi.status() != WL_CONNECTED) { delay(500); Serial.println("Waiting for Wifi Connection"); }
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
  struct tm *timeinfo;
  timeinfo = localtime(&rawtime);

  char dateTimeStr[15];
  sprintf(dateTimeStr, "%04d%02d%02d%02d%02d%02d",
          timeinfo->tm_year + 1900, timeinfo->tm_mon + 1, timeinfo->tm_mday,
          timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec);

  return String(dateTimeStr);
}

// MAIN SETUP FUNCTION
void setup() {
  // Set Serial
  Serial.begin(115200);


  // Create connection to Wifi
  ConnectToWifi();

  // Set MQTT Broker
  client.setServer(mqttServer, mqttPort);

  // Initialize ans Set Time
  timeClient.begin();
  timeClient.update();
}

// MAIN LOOP FUNCTION
void loop() {

  if (!client.connected()) {
    Reconnect();
  }
  client.loop();

  String gpsData = "";
  if (Serial.available() > 0) {
    gpsData = Serial.readStringUntil('\n');
    gpsData.trim();
  }

  if (gpsData.startsWith("$GNGGA")) {
    String dateTime = getCurrentDateTime();
    String message = "{\"gps\":" + gpsData + ",\"DateTime\":" + dateTime + "}";

    if (client.publish(mqttTopic, message.c_str())) {
      Serial.println("Published: " + message);
    } else {
      Serial.println("Publish failed");
    }
  }
}
