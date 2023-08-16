import React, { useState, useEffect } from "react";
import mqtt from "mqtt";


const MqttComponent = ({ mqttServerIP, websocketPort }) => {
  const [msg, setMsg] = useState(<em>...</em>);

  useEffect(() => {
    const options = {
      protocol: "ws",
      username: "your-username",
      password: "your-password",
      keepalive: 20,
      clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
    };

    const client = mqtt.connect(`mqtt://${mqttServerIP}:${websocketPort}`, options);

    client.on("connect", () => {
      console.log("Client connected");
      client.subscribe("publishtopic");
      console.log("Client subscribed");
    });

    client.on("message", (topic, message) => {
      const note = message.toString();
      setMsg(note);
      console.log(note);
      client.end();
    });

    return () => {
      client.end();
    };
  }, [mqttServerIP, websocketPort]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello MQTT in React</h1>
        <p>The message payload is: {msg}</p>
      </header>
    </div>
  );
};

export default MqttComponent;
