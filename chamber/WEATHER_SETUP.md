# Weather API Setup Guide

## Quick Setup Instructions:

### 1. Get Your API Key
1. Go to: https://openweathermap.org/api
2. Click "Sign up for free" 
3. Create account with your email
4. Verify your email address
5. Go to your account dashboard
6. Click on "API keys" tab
7. Copy your default API key

### 2. Add Your API Key
1. Open `scripts/home.js`
2. Find this line:
   ```javascript
   const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const WEATHER_API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
   ```

### 3. Test the Weather
1. Save the file
2. Refresh your page in the browser
3. Check the browser console (F12) for any errors
4. Weather data should now load for Roy City, UT

## API Information:
- **Location**: Roy City, Utah (41.1616, -112.0263)
- **Current Weather API**: Returns current temperature, description, and icon
- **Forecast API**: Returns 5-day forecast (we use next 3 days)
- **Units**: Imperial (Fahrenheit)
- **Update Frequency**: Every 10 minutes from OpenWeatherMap

## Troubleshooting:
- **"401 Unauthorized"**: API key is incorrect or not activated yet
- **"Loading..." stuck**: Check browser console for network errors
- **No weather data**: API key might not be activated (takes up to 10 minutes)

## Fallback:
If the API key is not set, the page will show placeholder weather data with "(demo)" label.