# Rock-Paper-Scissors with Hand Gesture Detection

Welcome to the Rock-Paper-Scissors game with live hand gesture detection! This project combines the excitement of a classic game with the magic of machine learning for real-time gesture recognition.
## Setup Instructions:

1. Open `Frontend/SocketConn.js` in a code editor.

2. Find this line:
   ```javascript
   ws = new WebSocket("ws://192.168.100.183:8080");
   ```

3. Replace `'192.168.100.183'` with your public IP address:
   ```javascript
   ws = new WebSocket("ws://YOUR_PUBLIC_IP:8080");
   ```

4. Save the file.

## Running:

- Run `node app.js`.
- Open your server's IP address in a browser.

## Real-Life Applications:

This project demonstrates how gesture recognition can be used beyond games, such as in sign language communication or improving human-computer interaction.

## Technologies Used:

- **TensorFlow:** Powers hand gesture detection.
- **Node.js:** Backend server.
- **Websockets:** Facilitates real-time communication.

## Demo:

Watch a demo [here](https://www.linkedin.com/posts/devanmolsharma_webdev-ai-gesturerecognition-activity-7147444377047506944-0Y1S?utm_source=share&utm_medium=member_android).

## Contributing:

Feel free to contribute by opening issues or submitting pull requests. Your ideas are welcome!