"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
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
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Patient } from '@prisma/client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'
import * as z from 'zod'
import { toast } from 'sonner'


const selectOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'age', label: 'Age' },
    { value: 'address', label: 'Address' },
]

const formSchema = z.object({
    id: z.preprocess((val) => Number(val), z.number().nonnegative()),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    age: z.number().optional(),
    address: z.string().optional(),
}).refine((data) => data.name || data.email || data.phone || data.age || data.address, {
    message: "At least one of the fields (name, email, phone, age, address) must be filled",
    path: ["name", "email", "phone", "age", "address"],
})

function GetPatient() {
    const [selectedField, setSelectedField] = React.useState<'name' | 'email' | 'phone' | 'age' | 'address'>('name');
    const [patient, setPatient] = React.useState<Patient | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 0,
            name: "",
            email: "",
            phone: "",
            age: 0,
            address: "",
        }
    })

  return (
    <section className='w-screen min-h-screen flex flex-col items-center justify-center'>
        <Card className="">
            <CardHeader>
                <CardTitle>Patient Details</CardTitle>
                <CardDescription>Enter the details to get a Patient</CardDescription>
                <Select onValueChange={
                    (value) => {
                        setSelectedField(value as 'name' | 'email' | 'phone' | 'age' | 'address')
                    }
                }
                 value={selectedField}
                >
                    <SelectTrigger>
                        <SelectValue>{selectedField}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {selectOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className='w-full'>
                
              <Form {...form}>
                <form onSubmit={form.handleSubmit(async (values) => {
                    setLoading(true)
                    try {
                        console.log(values)
                        const response = await axios.get(`/api/patient?id=${values.id}&${selectedField}=${values[selectedField]}`)
                        if(response.status == 200){
                            toast.success('Patient Found')
                            setPatient(response.data)
                        }
                    } catch (error) {
                        if (axios.isAxiosError(error)) {
                            setError(error.message)
                        } else {
                            setError('An unexpected error occurred')
                        }
                        console.error(error)
                        toast.error('Patient not found')
                    }finally{
                        setLoading(false)
                    }
                })} className="w-full">
                     <FormField
                        control={form.control}
                        name='id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} {...field} type='number' />
                                </FormControl>
                                <FormDescription>
                                    This is the ID of the patient
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={selectedField}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{selectedField.toUpperCase()}</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder={selectedField} {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the {selectedField} of the patient
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='w-full' disabled={loading}>Get Patient</Button>
                </form>
                </Form>
            </CardContent>

            <CardFooter>
                {patient && (
                    <div className="p-4 border rounded-md shadow-md">
                        <p><strong>ID:</strong> {patient.id}</p>
                        <p><strong>Name:</strong> {patient.name}</p>
                        <p><strong>Email:</strong> {patient.email}</p>
                        <p><strong>Phone:</strong> {patient.phone}</p>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Address:</strong> {patient.address}</p>
                    </div>
                )}
            </CardFooter>
        </Card>
    </section>
  )
}

export default GetPatient