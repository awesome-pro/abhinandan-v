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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'
import * as z from 'zod'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'


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
    const [patientList, setPatientList] = React.useState<Patient[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 1,
            name: "",
            email: "",
            phone: "",
            age: 0,
            address: "",
        }
    })


    const getPatients = async () => {
        setPatient(null)
        setLoading(true)
        try {
            const response = await axios.get('/api/patient')
            if(response.status == 200){
                setPatientList(response.data)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message)
            } else {
                setError('An unexpected error occurred')
            }
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

  return (
    <section className='relative w-screen min-h-screen flex flex-col items-center justify-center px-3 h-full py-16'>
        <Card className="w-full lg:max-w-[500px] h-full">
            <CardHeader className='mb-5'>
                <CardTitle className='text-3xl text-primary font-semibold'>Get Patient Details</CardTitle>
                <CardDescription>Enter the details to get a Patient</CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
                
              <Form {...form}>
                <form onSubmit={form.handleSubmit(async (values) => {
                    setLoading(true)
                    setPatientList([])
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

                    <Label className='mt-4 text-primary'>Select any one of the field</Label>
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

                    <FormField
                        control={form.control}
                        name={selectedField}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='mt-5'>{selectedField.toUpperCase()}</FormLabel>
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
                   <div className='w-full mt-10 flex items-center justify-center gap-5'>
                        <Button 
                            type='reset' 
                            className='w-full text-primary' 
                            disabled={loading} 
                            variant={'ghost'}
                            onClick={() => {
                                getPatients();
                            }}
                            >
                                Get All Patients
                            </Button>
                        <Button type='submit' className='w-full' disabled={loading}>Get Patient</Button>   
                   </div>
                </form>
                </Form>
            </CardContent>
            <CardFooter className='w-full flex items-center justify-center '>
                {error && <p className='text-destructive'>{error}</p>}
                {loading && <p className='text-primary text-2xl font-semibold animate-pulse'>Loading...</p>}
            </CardFooter>
        </Card>
       {
        patient && (
            <Card className="w-full lg:max-w-[1000px] mt-5 ">
                <CardHeader className='w-full bg-primary/10'>
                    <CardTitle className='text-3xl text-primary font-semibold w-full'>Patient Details</CardTitle>
                    <CardDescription>Details of the patient</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-3'>
                        <p><span className='font-semibold'>ID:</span> {patient.id}</p>
                        <p><span className='font-semibold'>Name:</span> {patient.name}</p>
                        <p><span className='font-semibold'>Email:</span> {patient.email}</p>
                        <p><span className='font-semibold'>Phone:</span> {patient.phone}</p>
                        <p><span className='font-semibold'>Age:</span> {patient.age}</p>
                        <p><span className='font-semibold'>Address:</span> {patient.address}</p>
                    </div>
                </CardContent>
            </Card>
        )
       }
       {
            patientList.length > 0 && (
                <div className='w-full flex  flex-col items-center justify-center '>
                    <div className='w-full bg-primary/20 text-primary text-center text-3xl py-10'>
                        <h1 className='text-2xl text-primary font-semibold'>All Patients</h1>
                    </div>
                    {
                        patientList.map((patient) => (
                        <Card key={patient.id} className="w-full lg:max-w-[1000px] mt-5 ">
                            <CardHeader className='w-full'>
                                <CardTitle className='text-3xl text-primary font-semibold'>Patient Details</CardTitle>
                                <CardDescription>Details of the patient</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
                                    <p><span className='font-semibold'>ID:</span> {patient.id}</p>
                                    <p><span className='font-semibold'>Name:</span> {patient.name}</p>
                                    <p><span className='font-semibold'>Email:</span> {patient.email}</p>
                                    <p><span className='font-semibold'>Phone:</span> {patient.phone}</p>
                                    <p><span className='font-semibold'>Age:</span> {patient.age}</p>
                                    <p><span className='font-semibold'>Address:</span> {patient.address}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
                </div>
            )
       }

       <p className='text-sm text-primary/80 absolute bottom-3'>
         Thanks for using Patient AI
       </p>
    </section>
  )
}

export default GetPatient