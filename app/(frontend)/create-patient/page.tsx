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
                toast('Patient created successfully', {
                    description: 'Patient has been created successfully',
                    action: {
                        label: 'View Patient',
                        onClick: () => {
                            console.log('Viewing patient')
                        }
                    }
                })
                
                form.reset()
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.error)
            } else {
                setError('An unexpected error occurred')
            }
            toast.error('An unexpected error occurred')
            console.error(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <section className='w-screen min-h-screen flex flex-col items-center justify-center gap-20 px-3'>
        <Card className='w-full lg:max-w-[800px]'>
            <CardHeader className='bg-primary/10'>
                <CardTitle className='text-3xl font-semibold text-primary'>Patient Form</CardTitle>
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

                        <div className='flex items-center justify-center w-full mt-9 lg:mt-20 gap-4'>
                            <Button variant='ghost' className='w-full' type='reset'>Cancel</Button>
                            <Button type="submit" disabled={loading} className='w-full '>Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                {loading && <p className='text-primary text-3xl font-semibold animate-pulse'>Loading... </p>}
                {error && <p className='text-red-500'>{error}</p>}
            </CardFooter>
        </Card>
    </section>
  )
}

export default CreatePatient