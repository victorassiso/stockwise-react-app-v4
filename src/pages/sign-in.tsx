import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    const { email, password } = data

    api
      .post('/users/auth', {
        email,
        password,
      })
      .then(() => {
        toast.success('Enviamos um link de autenticação para seu e-mail.', {
          action: {
            label: 'Reenviar',
            onClick: () => handleSignIn(data),
          },
        })
      })
      .catch((error) => {
        toast.error('Credenciais inválidas. ' + error.response.data.error)
      })
  }

  return (
    <>
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up" className="">
            Novo estabelecimento
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
            <form
              id="form"
              className="space-y-4"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" {...register('email')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
              </div>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Acessar Painel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
