import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout'
import { ThemeProvider } from './components/theme-provider'
import WeatherDashBoard from './pages/weather-dashboard'
import CityPage from './pages/city-pages'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {

  return (
    <div>
      <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
