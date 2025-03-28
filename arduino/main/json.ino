#include <ArduinoJson.h>

JsonDocument doc;

void CreateJSON() {
    static int attempt = 0;
    doc["attempt"] = ++attempt;

    doc["ldr"] = Light; 
    JsonObject dht11 = doc.createNestedObject("dht11");
    dht11["temperature"] = Temperature;
    dht11["humidity"] = Humidity;
    dht11["heatIndex"] = HeatIndex;

    serializeJson(doc, jsonOut);
}

void SendJSONToSerial() {
    serializeJson(doc, Serial);
    Serial.println();
}

void ReadJSON(String responseMsg) {
    DynamicJsonDocument doc(1024);

    DeserializationError error = deserializeJson(doc, responseMsg);

    if (error) {
        Serial.print("deserializeJson() failed: ");
        Serial.println(error.c_str());
        return;
    }

    if (doc.containsKey("error")) {
        Serial.println("Server error: " + String(doc["error"].as<const char*>()));
        return;
    }

    if (doc.containsKey("lights")) {
        int LED1 = doc["lights"]["LED1"];
        int LED2 = doc["lights"]["LED2"];
        int LED3 = doc["lights"]["LED3"];

        digitalWrite(D1, LED1);  // LED1
        digitalWrite(D2, LED2);  // LED2
        digitalWrite(D3, LED3);  // LED3

        Serial.println("LED1: " + String(LED1));
        Serial.println("LED2: " + String(LED2));
        Serial.println("LED3: " + String(LED3));
    }
}