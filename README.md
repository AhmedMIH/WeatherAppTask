# Weather App

## Introduction
The Weather App is a React Native application designed to provide users with up-to-date weather information. The app includes a modern UI, intuitive navigation, and utilizes various APIs to fetch weather data.

## Table of Contents
1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Dependencies](#dependencies)

## Installation

### Prerequisites
- Node.js
- npm or yarn
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/AhmedMIH/WeatherAppTask.git
    ```
2. Navigate to the project directory:
    ```sh
    cd WeatherAppTask
    ```
3. Install the dependencies:
    ```sh
    npm install --force
   
4. in ios
    ```sh
   pod install
   ```
5. Create a `.env` file in the root directory with the following content:
    ```plaintext
    BASE_API_URL=http://api.weatherapi.com/v1/
    API_KEY={Add your Key}
    ```
6. Run the application:
    ```sh
    npm run android-dev # for Android dev
    npm run android-prod-release # for Android release
    npm run ios # for iOS
    ```
    and then
     ```sh
    npm start
    ```


## Project Structure


## Dependencies
The project uses the following major dependencies:
- React
- React Native
- React Navigation
- Axios (for API calls)
- React Query

