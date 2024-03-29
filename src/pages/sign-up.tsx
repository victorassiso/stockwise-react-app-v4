import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
// import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'

const signUpFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function handleSignUp(data: SignUpForm) {
    console.log(data)
    const { name, email, password } = data

    await api
      .post('/users', {
        name,
        email,
        password,
        role: 'user',
      })
      .then(() => {
        toast.success('Usuário cadastrado com sucesso', {
          action: {
            label: 'Login',
            onClick: () => navigate('/sign-in'),
          },
        })
      })
      .catch((error) => {
        if (error.response) {
          const { status, data: responseData } = error.response

          if (
            status === 409 &&
            responseData.message === 'E-mail already exists'
          ) {
            toast.error(
              'E-mail já cadastrado. Por favor, escolha outro ou faça login.',
            )
          } else {
            toast.error('Ops... Ocorreu um erro! Tente novamente mais tarde.')
          }
        } else {
          toast.error('Ops... Ocorreu um erro! Tente novamente mais tarde.')
        }
      })
  }

  return (
    <>
      {/* <Helmet title="Cadastro" /> */}
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in" className="">
            Fazer Login
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
            <form
              id="form"
              className="space-y-4"
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" {...register('name')} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  minLength={6}
                  required
                />
              </div>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Finalizar Cadastro
              </Button>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar, você concorda com nossos{' '}
                <a className="underline underline-offset-4" href="">
                  termos de serviço
                </a>{' '}
                e{' '}
                <a className="underline underline-offset-4" href="">
                  políticas de privacidade
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
