# Weather Dashboard 🌤️

A beautiful, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## Features

✨ **Current Weather Display**
- Real-time temperature, weather conditions, and "feels like" temperature
- Humidity, wind speed, pressure, and visibility information
- Weather icons and descriptions
- City and country information with current date

📅 **5-Day Forecast**
- Daily weather predictions
- Max/min temperatures
- Weather conditions with icons
- Interactive forecast cards

🎨 **User Interface**
- Beautiful gradient background
- Responsive design (works on desktop, tablet, and mobile)
- Smooth animations and transitions
- Loading spinner and error handling
- Search functionality with Enter key support

🌍 **Geolocation**
- Optional automatic weather detection based on user's location
- Manual city search with autocomplete

## Getting Started

### Prerequisites

1. A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hkare3-beep/weather-dashboard.git
   cd weather-dashboard
   ```

2. Add your API key:
   - Open `script.js`
   - Replace `YOUR_API_KEY_HERE` with your actual OpenWeatherMap API key:
     ```javascript
     const API_KEY = 'your_api_key_here';
     ```

3. Open `index.html` in your web browser

### Getting an API Key

1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your API keys section
4. Copy your API key
5. Paste it into `script.js`

## Usage

1. **Automatic Detection** (optional):
   - Allow geolocation permission to automatically load weather for your location

2. **Manual Search**:
   - Enter a city name in the search box
   - Press Enter or click the Search button
   - View current weather and 5-day forecast

## Project Structure

```
weather-dashboard/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # Weather API integration and DOM manipulation
└── README.md       # Project documentation
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **JavaScript (ES6+)** - Async/await, Fetch API
- **OpenWeatherMap API** - Weather data

## API Endpoints Used

- `GET /geo/1.0/direct` - Get coordinates from city name
- `GET /data/2.5/weather` - Current weather data
- `GET /data/2.5/forecast` - 5-day forecast data

## Features to Add

- [ ] Temperature unit toggle (Celsius/Fahrenheit)
- [ ] Search history/favorites
- [ ] Hourly forecast
- [ ] Air quality index
- [ ] UV index calculation
- [ ] Local storage for user preferences
- [ ] Dark mode toggle
- [ ] Weather alerts

## Known Limitations

- API Key is visible in client-side code (consider using a backend for production)
- Free tier API has rate limits
- UV index not available from free API tier

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### "Please add your API key" error
- Make sure you've added your API key to `script.js`
- Verify the API key is valid and has not expired

### "City not found" error
- Check the spelling of the city name
- Try using a city name without country codes

### No data displayed
- Check browser console for errors (F12)
- Verify API key is correct
- Check your API rate limits

## Support

If you encounter any issues, please:
1. Check the [OpenWeatherMap documentation](https://openweathermap.org/api)
2. Review the browser console for error messages
3. Create an issue in the GitHub repository

## Author

**hkare3-beep**

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- Weather icons from OpenWeatherMap
