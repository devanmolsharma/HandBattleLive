# Rock-Paper-Scissors with Hand Gesture Detection

Welcome to the Rock-Paper-Scissors game with live hand gesture detection! This project combines the excitement of a classic game with the magic of machine learning for real-time gesture recognition.

## Project Structure

### 1. Backend

The `backend` folder contains the Node.js server responsible for handling game logic and communication with the frontend.

#### Setup Instructions:

1. Navigate to the `backend` folder using your terminal.
2. Install dependencies by running:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

4. The server will run on `http://localhost:8080` by default.

### 2. Frontend

The `frontend` folder consists of a simple HTML interface for the Rock-Paper-Scissors game. Adjustments might be needed in `SocketConn.js` to set the public IP address for testing on a local WiFi network.

#### Setup Instructions:

1. Open `frontend/SocketConn.js` in a code editor.

2. Locate the following line:

   ```javascript
   ws = new WebSocket('ws://192.168.100.183:8080');
   ```

3. Replace `'http://localhost:3000'` with the public IP address of your backend server (if you want to test locally on your wifi, use 'ipconfig' command in command prompt to get IPV4 ADDRESS) :

   ```javascript
   ws = new WebSocket('ws://YOUR_PUBLIC_IP:8080');
   ```

4. Save the file.

#### Running the Frontend:

1. Open `frontend/index.html` in a web browser.

2. Enjoy playing Rock-Paper-Scissors with hand gesture detection!

## Real-Life Applications

This project is not just a game; it showcases the potential of gesture recognition technology in real-life applications. Consider experimenting with sign language communication or exploring other ways gestures can enhance human-computer interaction.

## Technologies Used

- **TensorFlow:** Powers the live hand gesture detection.
- **Node.js:** Backend server for game logic.
- **Websockets:** Facilitates real-time communication between the frontend and backend.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your ideas and improvements are highly valued!
