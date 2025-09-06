# **React Native Frontend Overview**
As a software engineer passionate about modern mobile development, I'm building a React Native frontend that consumes the task management API I created. This frontend represents the mobile experience that connects seamlessly with the TypeScript/Express backend, demonstrating full-stack development capabilities across web and mobile platforms.

The current implementation features a clean, responsive interface that successfully fetches and displays the "Hello World" response from my backend API. I've configured the networking layer to handle API calls efficiently, with proper error handling and state management for optimal user experience on both Android emulators and physical devices.

# **Frontend Purpose**
I created this React Native frontend to complement the backend API and understand the complete flow of data between mobile applications and server infrastructure. There's something incredibly satisfying about seeing the "Hello World" message appear on a mobile screen, knowing it traveled from my Express server through the network to a React Native application.

What excites me most is building the foundation for the complete user experience - from the touch interactions on mobile devices to the API responses from the server. I've been particularly focused on getting the networking configuration just right, ensuring that both Android emulators and physical devices can communicate reliably with the backend. The challenge of configuring different network environments (localhost for emulator, LAN IP for physical devices) was especially rewarding to solve.

This isn't just about displaying data - it's about creating a responsive, native-feeling experience that will eventually handle user authentication, task management, and real-time updates. I want to understand how to build mobile applications that are not only functional but also deliver polished, professional user experiences.

# **Frontend Development Environment**
I developed the mobile application using the following tools and technologies:
- **React Native:** Framework for building native mobile apps using React
- **Expo:** Development platform for React Native applications
- **TypeScript:** Typed superset of JavaScript for improved development experience
- **Fetch API:** For making HTTP requests to the backend API
- **Visual Studio Code:** Primary code editor with React Native extensions
- **Android Studio:** For Android emulation and device testing
- **Node.js:** JavaScript runtime environment for development tools

# **Frontend Programming Language**
The primary programming language used is TypeScript with React Native, providing static typing, excellent editor support, and improved code maintainability. The frontend leverages modern React hooks for state management and functional components.

# **Frontend Useful Websites**
**React Native Documentation:** https://reactnative.dev/docs/getting-started
**Expo Documentation:** https://docs.expo.dev/
**React Native Networking:** https://reactnative.dev/docs/network
**Using TypeScript with React Native:** https://reactnative.dev/docs/typescript
**MDN Web Docs – Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

# **Frontend Notes**
- The mobile app successfully consumes the API running locally and displays responses on both Android emulators and physical devices
- Network configuration handles both localhost (emulator) and LAN IP addresses (physical devices)

# **Test Project**
### Backend: 
**npm run dev**
**Web:** http://localhost:3000/api/hello

### Android Mobile Device:
**Android Emulator and Device:** http://192.168.0.197:3000/api/hello
- Replace **192.168.0.197** with your IP address. 
- Run **ipconfig** on your Command Prompt terminal CMD to get your IP address 
- Use same network (Wi-Fi / hotspot) on your PC and android device

# **Backend Project Url **
https://github.com/sancy1/task-app-backend.git
