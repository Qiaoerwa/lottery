import Home from '@/views/home/Home'
import { Navigate, useRoutes } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  }
]

export default function MyRouter() {
  return useRoutes(routes)
}
