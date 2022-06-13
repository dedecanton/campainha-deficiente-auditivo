#include <Arduino.h>
#include <WiFi.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

int porta_rele2 = 5;
int button = 7;

const char* ssid = "vassoler"; // Nome da rede
const char* password =  "vassoler123"; // Senha da rede

void setup() {
  //Define pinos para o rele como saida
  pinMode(porta_rele2, OUTPUT);
  pinMode(button, INPUT);
  Serial.begin(9600);

  // Conection WiFi
  Serial.begin(115200);
  delay(4000);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");
}

void piscar() {
  for(int i = 0; i < 10; i++) {
    digitalWrite(porta_rele2, LOW); //lampada ligada
    delay(1000);
    digitalWrite(porta_rele2, HIGH); //lampada desligada
    delay(1000);
  }
}

void enviaSms() {
  if ((WiFi.status() == WL_CONNECTED)) { // Verifique o status da conexão atual
    HTTPClient http;

    char *url = "http://localhost:8080/sms"; // Url do Request
  
    http.begin(url);
    int resCode = http.GET();
  
    USE_SERIAL.println(resCode);
    
    String res = http.getString();
    USE_SERIAL.println(res);
  
    parserMessage(res);
  
    http.end();
  }

  delay(10000);
}

void loop() {
  if (digitalRead(button) == HIGH) {
    enviaSms();
    piscar();
  } else {
    digitalWrite(porta_rele2, HIGH); //lampada desligada
  }
}
