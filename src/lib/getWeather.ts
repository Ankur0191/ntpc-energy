import axios from 'axios'

export async function fetchWeather(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  const response = await axios.get(url)
  const data = response.data

  return {
    temperature: data.main.temp,
    wind: data.wind.speed,
    solar_radiation: (100 - data.clouds.all) * 10 // approximate: clearer sky = more solar
  }
}
