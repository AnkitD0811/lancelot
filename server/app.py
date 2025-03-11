from flask import Flask, send_from_directory, request
import paho.mqtt.client as mqtt
import constants as const
import threading
import logging


# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# App Creation
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")

# Serve React Web Pages for all paths
@app.route("/")
@app.route("/dashboard")
@app.route("/about")
@app.route("/profile")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")


#### Websocket configuration for realtime display of tracker status ####


from flask_socketio import SocketIO, emit
from flask import request

socketio = SocketIO(app, cors_allowed_origins="*") # Allow all origins for now; Change in prod

@socketio.on('connect')
def handle_connect():
    logging.info(f'Client Connected; ID: {request.sid}')
    emit('response', {'data' : 'Connected'})

@socketio.on('message')
def handle_message(data):
    print('Received: ', data)
    emit('response', {'data' : 'Got Message'})

@socketio.on('disconnect')
def test_disconnect(reason):
    logging.info(f'Client disconnected, ID: {request.sid}, reason: {reason}')


####################### MQTT HANDLER ############################
def on_connect(client, userdata, flags, reason_code, properties):
    if reason_code == 0:
        logging.info(f"Connected with result code {reason_code}")
    else:
        logging.error(f"Connection failed with result code {reason_code}")

def on_message(client, userdata, msg):
    logging.info(f"Received message on {msg.topic}, QoS: {msg.qos}: {msg.payload}")
    plot_realtime(msg)


client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.on_connect = on_connect
client.on_message = on_message

try:
    client.connect(const.HOST, const.PORT, 60)
    logging.info(f"Connecting to MQTT Broker: {const.HOST}:{const.PORT}")
except Exception as e:
    logging.error(f"Error connecting to MQTT broker: {e}")

def run_mqtt_loop():
    client.loop_forever()

mqtt_thread = threading.Thread(target=run_mqtt_loop)
mqtt_thread.daemon = True
mqtt_thread.start()

# ROUTES -----------------------------------
@app.route("/api/subscribeTo", methods=['POST'])
def subscribe_to():
    if 'deviceId' in request.form:
        deviceId = request.form['deviceId']
        topicStr = const.TOPIC_KEY + deviceId
        client.subscribe(topicStr)
        logging.info(f"Subscribed to Topic: {topicStr}")
        return 'Subscription request received'
    else:
        logging.warning("deviceId not provided")
        return 'deviceId not provided', 400

@app.route("/api/unsubscribeFrom", methods=['POST'])
def unsubscribe_from():
    if 'deviceId' in request.form:
        deviceId = request.form['deviceId']
        topicStr = const.TOPIC_KEY + deviceId
        client.unsubscribe(topicStr)
        logging.info(f"Unsubscribed from Topic: {topicStr}")
        return 'Unsubscription request received'
    else:
        logging.warning("deviceId not provided")
        return 'deviceId not provided', 400

##################################################################

if __name__ == "__main__":
    app.run(debug=True)
    socketio.run(app, debug=True)