import React, { useState } from 'react';
import mqtt from 'mqtt';

const MqttConnector = () => {
  const [host, setHost] = useState('broker.emqx.io');
  const [port, setPort] = useState('1883');
  const [topic, setTopic] = useState('robisin');
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [messageData, setMessageData] = useState('');

  const handleConnect = () => {
    const mqttUrl = `ws://${host}:${1883}`;
    const mqttClient = mqtt.connect(mqttUrl);

    mqttClient.on('connect', () => {
      console.log('MQTT sunucusuna bağlandı');
      setConnected(true);
      setClient(mqttClient);
      mqttClient.subscribe(topic);
    });

    mqttClient.on('message', (receivedTopic, message) => {
      console.log(`Konu üzerinde mesaj alındı: ${receivedTopic}, mesaj: ${message.toString()}`);
      setMessageData(message.toString());
    });
  };

  const handleDisconnect = () => {
    if (client) {
      client.end();
      setConnected(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <label>Host:</label>
          <input type="text" className="form-control" value={host} onChange={(e) => setHost(e.target.value)} />
        </div>
        <div className="col">
          <label>Port:</label>
          <input type="text" className="form-control" value={port} onChange={(e) => setPort(e.target.value)} />
        </div>
        <div className="col">
          <label>Topic:</label>
          <input type="text" className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          {connected ? (
            <button className="btn btn-danger" onClick={handleDisconnect}>
              Disconnect
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleConnect}>
              Connect
            </button>
          )}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <input type="text" className="form-control" value={messageData} disabled />
        </div>
      </div>
    </div>
  );
};

export default MqttConnector;
