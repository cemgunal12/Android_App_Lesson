# Preferences & Auth App - React Native Lab 

**Student Name:** Cem Günal
**Student ID:** 210408036

## 📱 App Overview
This project is a multi-screen React Native application designed to demonstrate real-world state management patterns. It focuses on how state flows through a real app using Context API for global state and AsyncStorage for local persistence.

## ✨ Features
* **Authentication Flow:** Mock Login and Logout functionality.
* **Persistent Session:** User remains logged in even after restarting the application (using `AsyncStorage`).
* **Theme Preference:** Users can toggle between **Light** and **Dark** modes. The preference is saved locally.
* **Global State Management:** Uses React Context API to eliminate prop drilling.
* **Custom Hooks:** Implements `useTheme` and `useAuth` for logic reuse.

## 🛠 Tech Stack
* React Native (Expo)
* React Navigation (Native Stack)
* Context API
* AsyncStorage
* React Hooks (useState, useEffect)

## 🚀 Setup & Installation

1.  **Clone the repository** (or download the source code):
    ```bash
    git clone [REPO_LINKINIZ]
    cd PreferencesApp
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    npx expo install
    ```

3.  **Run the Application:**
    ```bash
    npx expo start
    ```

4.  **Test the App:**
    * Scan the QR code with **Expo Go** on your physical device or run on an emulator (Android/iOS).

## 📂 Project Structure
* **/screens**: Contains UI screens (Login, Home, Settings).
* **/context**: Contains `AuthContext` for global authentication state.
* **/hooks**: Contains custom hooks like `useTheme`.
* **App.js**: Main entry point with Navigation setup.