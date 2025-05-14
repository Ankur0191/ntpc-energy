// app/page.tsx
'use client'
import { Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <Container maxWidth="sm" sx={{ mt: 12, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>NTPC Energy Predictor</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Get real-time energy predictions for NTPC plants using AI.
      </Typography>
      <Button variant="contained" onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </Button>
    </Container>
  )
}
