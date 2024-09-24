"use client"

import { Patient } from '@prisma/client';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from "@/components/ui/button"

function GetPatient() {

    const params = useParams();
    const { id } = params;
    
    const [patient, setPatient] = React.useState<Patient | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const fetchPatient = useCallback(async() => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/patient?id=${id}`);
            const data = await response.data;
            console.log(data);
            setPatient(data);
            toast.success('Patient found'); 

        } catch (error) {
            console.error(error);
            setError('Patient not found');
            toast.error('Patient not found');
        }finally{
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchPatient();
    }, [fetchPatient])

  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center '>
        {
            patient ? (
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
                <CardFooter className='flex items-center justify-center gap-20'>
                        <Button variant='ghost' onClick={fetchPatient} disabled={loading} className='w-full'>
                            Retry
                        </Button>
                        <Button  onClick={() => window.history.back()} className='w-full'>
                            Go Back
                        </Button>
                    </CardFooter>
            </Card>
            ) : (
                <Card className="w-full lg:max-w-[1000px] mt-5">
                    <CardHeader className='w-full bg-primary/10'>
                        <CardTitle className='text-3xl text-primary font-semibold w-full'>Patient Details</CardTitle>
                        <CardDescription>Details of the patient</CardDescription>
                    </CardHeader>
                    <CardContent className='px-10'>
                        <p>{error}</p>
                        <h1 className='text-2xl animate-pulse'>
                            Loading..
                        </h1>
                    </CardContent>
                    <CardFooter className='flex items-center justify-center gap-20'>
                        <Button className='w-full' variant='ghost'  onClick={fetchPatient} disabled={loading}>
                            Retry
                        </Button>
                        <Button className='w-full' onClick={() => window.history.back()}>
                            Go Back
                        </Button>
                    </CardFooter>
                </Card>
            )
        }
    </section>
  )
}

export default GetPatient