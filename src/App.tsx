import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout'
import { ThemeProvider } from './components/theme-provider'
import WeatherDashBoard from './pages/weather-dashboard'
import CityPage from './pages/city-pages'

function App() {

  return (
    <div>
      <BrowserRouter> 
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Layout>
            <Routes>
              <Route path='/' element={<WeatherDashBoard/>} />
              <Route path='/city/:cityName' element={<CityPage/>} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
