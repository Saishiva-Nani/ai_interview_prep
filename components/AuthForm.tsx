"use client"
import React from "react"
import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp } from "@/lib/actions/auth.action"
import { signIn } from "@/lib/actions/auth.action"

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8),

    }) 
}

const AuthForm = ( { type } : { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email:"",
            password:"",
        },
    })

  async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if(type === 'sign-up'){
                const {name, email, password} = values;
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const result = await signUp({
                  uid: userCredentials.user.uid,
                  name: name!, 
                  email,
                  password,
                })
                if(!result?.success){
                  toast.error(result?.message);
                  return;
                }
                toast.success('Account created successfully. Please Sign in.')
                router.push('/sign-in')
            }else{
              const {email, password} = values;

              const userCredential = await signInWithEmailAndPassword(auth, email, password);

              const idToken = await userCredential.user.getIdToken();

              if(!idToken){
                toast.error('Sign in failed');
                return;
              }

              await signIn({
                email, idToken
              })



              toast.success('Sign in successfully.')
              router.push('/');
            }
        } catch(error){
            console.log(error);
            toast.error(`There was an error: ${error}`)
        }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-gradient-to-b from-neutral-800 to-neutral-950 rounded-2xl p-8 shadow-xl">
        {/* Header: Logo + Title + Subtitle */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-white text-2xl font-bold">PrepWise</h2>
          </div>
          <h3 className="text-white text-sm font-medium text-center">
            Practice job interviews with AI
          </h3>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            { !isSignIn && (
                <FormField 
                    control={form.control} 
                    name="name" 
                    label="Name" 
                    placeholder="Your Name"
                /> 
            )}
            <FormField 
                    control={form.control} 
                    name="email" 
                    label="Email" 
                    placeholder="Your Email Address"
                    type="email"
            /> 
            <FormField 
                    control={form.control} 
                    name="password" 
                    label="Password" 
                    placeholder="Enter your password"
                    type="password"
            /> 
            <Button type="submit" className="w-full bg-white text-black">
              {isSignIn ? 'Sign in' : 'Create an Account'}
            </Button>
          </form>
        </Form>
        <p className="text-center">
            {isSignIn ? 'No account yet?' : 'Have an account already?'}
            <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary m1-1">
                {!isSignIn ? "Sign in" : "Sign up"}
            </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
