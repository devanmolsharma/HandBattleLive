# HandBattleLive

Watch a demo [here](https://www.linkedin.com/posts/devanmolsharma_webdev-ai-gesturerecognition-activity-7147444377047506944-0Y1S?utm_source=share&utm_medium=member_android).


## Introduction
Welcome to the HandBattleLive game with live hand gesture detection! This project combines the excitement of a classic game with the magic of machine learning for real-time gesture recognition.

## Why
HandBattleLive offers an innovative gaming experience by utilizing machine learning technology to detect hand gestures, enhancing interaction and engagement for players.

## Get Started
To set up HandBattleLive and start playing, follow these detailed instructions:

1. **Update Socket Connection:**  
   Open `Frontend/SocketConn.js` in your preferred code editor.

2. **Replace IP Address:**  
   Locate the following line:
   ```javascript
   ws = new WebSocket("ws://192.168.100.183:8080");
   ```

3. **Update IP Address:**  
   Replace `'192.168.100.183'` with your public IP address:
   ```javascript
   ws = new WebSocket("ws://YOUR_PUBLIC_IP:8080");
   ```

4. **Save Changes:**  
   Save the file after making the necessary modifications.

5. **Running the Game:**  
   - Execute `node app.js` to start the backend server.
   - Open your server's IP address in a web browser to launch the game.

## Contributing Guide
Contributions to HandBattleLive are encouraged and valued. Follow these guidelines to contribute:

- **Open Issues:** Report any bugs or suggest improvements by opening issues.
- **Pull Requests:** Submit pull requests with enhancements or fixes.

Your contributions help enhance the gaming experience for all players!

## TODOS
- Implement additional gestures for enhanced gameplay.
- Enhance user interface for better accessibility.
- Optimize gesture detection algorithms for improved accuracy.

## License
HandBattleLive is licensed under the Apache License. 
