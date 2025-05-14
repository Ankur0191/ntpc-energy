'use client'
import {
  Container, Typography, MenuItem, FormControl, Select, Grid, TextField, Card, CardContent, Button
} from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const siteMapping = {
  "Dadri": 0,
  "Vindhyachal": 1,
  "Korba": 2,
  "Ramagundam": 3,
  "Talcher": 4,
  "Kahalgaon": 5,
  "Simhadri": 6
}

export default function Dashboard() {
  const [site, setSite] = useState("Dadri")
  const [temperature, setTemperature] = useState(30)
  const [solar, setSolar] = useState(200)
  const [wind, setWind] = useState(3)
  const [predicted, setPredicted] = useState<number | null>(null)
  const [history, setHistory] = useState<any[]>([])

  const handlePredict = async () => {
    const response = await axios.post('https://fastapi-model-deployment-irwq.onrender.com/predict/', {
      temperature,
      solar_radiation: solar,
      wind_speed: wind,
      site_encoded: siteMapping[site]
    })
    const value = response.data.energy_generated
    setPredicted(value)
    setHistory(prev => [...prev, {
      time: new Date().toLocaleTimeString(),
      energy: value
    }])
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <Grid container spacing={2}>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <Select value={site} onChange={e => setSite(e.target.value)}>
              {Object.keys(siteMapping).map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth label="Temperature (°C)"
            type="number"
            value={temperature}
            onChange={e => setTemperature(parseFloat(e.target.value))}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth label="Solar Radiation"
            type="number"
            value={solar}
            onChange={e => setSolar(parseFloat(e.target.value))}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth label="Wind Speed"
            type="number"
            value={wind}
            onChange={e => setWind(parseFloat(e.target.value))}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handlePredict}>
            Predict Energy Generation
          </Button>
        </Grid>

        {predicted !== null && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Predicted Energy: {predicted.toFixed(2)} kWh</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {history.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Prediction History</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history}>
                <Line type="monotone" dataKey="energy" stroke="#1976d2" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
