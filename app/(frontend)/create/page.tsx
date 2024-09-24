"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  
import { patientFormSchema } from '@/schema/patient-form-schema'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function CreatePatient() {

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);


    const form = useForm({
        resolver: zodResolver(patientFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            age: 30,
            address: "",
        }
    })

    async function onSubmit(values: z.infer<typeof patientFormSchema>) {
        setLoading(true)
        try {
            console.log(values)
            const response = await axios.post('/api/patient', values)
            if(response.status == 200){
                toast.success('Patient created successfully')
                form.reset()
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.error)
            } else {
                setError('An unexpected error occurred')
            }
            toast.error(error?.message as string)
            console.error(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <section className='w-screen min-h-screen flex flex-col items-center justify-center gap-20'>
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Patient Form</CardTitle>
                <CardDescription>Enter the details to create a Patient</CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} disabled={loading}/>
                            </FormControl>
                            <FormDescription>
                                This is the name of the patient
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} type='email' disabled={loading}/>
                            </FormControl>
                            <FormDescription>
                                This is the email of the patient
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} disabled={loading}/>
                            </FormControl>
                            <FormDescription>
                                This is the phone number of the patient
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="30" {...field} disabled={loading}/>
                            </FormControl>
                            <FormDescription>
                                This is the age of the patient
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} disabled={loading}/>
                                </FormControl>
                                <FormDescription>
                                    This is the address of the patient
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <Button type="submit" disabled={loading}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                {error && <p className='text-red-500'>{error}</p>}
            </CardFooter>
        </Card>

    </section>
  )
}

export default CreatePatient