import React, { useState, useEffect } from "react";

// const mqtt = require("mqtt/dist/mqtt");

const Mqtt = ({ navigation }) => {
  var PORT = 1883;
  var HOST = "broker.mqttdashboard.com";

  var options = {
    port: PORT,
    host: HOST,
  };

  var client = mqtt.connect(options);
  client.publish("bar/status", "open2");
};
export default Mqtt;
