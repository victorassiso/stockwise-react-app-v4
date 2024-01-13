import { api } from '@/lib/axios'

interface createUserProps {
  name: string
  email: string
  password: string
}

export async function createUser(data: createUserProps) {
  const { name, email, password } = data

  try {
    await api.post('/users', {
      name,
      email,
      password,
      role: 'user',
    })
  } catch (error) {
    console.error('API Create User failed!', error)

    throw new Error('API Create User failed!')
  }
}
