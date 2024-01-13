import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './layouts/app'
import { AuthLayout } from './layouts/auth'
import { Dashboard } from './pages/dashboard'
import { SignIn } from './pages/sign-in'
import { SignUp } from './pages/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Dashboard /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-up', element: <SignUp /> },
      { path: '/sign-in', element: <SignIn /> },
    ],
  },
])
