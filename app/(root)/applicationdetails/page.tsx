"use client"
import FetchURLs from '@/components/FetchURLs'
import PageTitle from '@/components/PageTitle'
import React, { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import toast, { Toaster } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";


interface Application {
  _id: string;
  applicationName: string;
}

interface URLdata {
  link: string;
  type: string;
  environment: string;
  clientApps: [object];
}
const FormSchema = z.object({
  id: z
    .string({
      required_error: "Please select an Application.",
    }),
  name: z
    .string({
      required_error: "Please select an Environment.",
    }),

})
const page = () => {
  const [values, setValues] = useState<Application[]>([])
  const [options, setOptions] = useState<string | undefined>()
  const [fetchedData, setFetchedData] = useState<URLdata[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/applications/fetchApplications")
      .then((data) => data.json())
      .then((val) => setValues(val.apps))
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (data.name === 'BOTH') {
        const responseData: any = await (await fetch(`http://localhost:3000/api/urls/fetchUrl/${data.id}`)).json()
        setFetchedData(responseData);
        return
      }
      const responseData: any = await (await fetch(`http://localhost:3000/api/urls/fetchUrl?id=${data.id}&name=${data.name}`)).json()
      setFetchedData(responseData);
    } catch (err: any) {
      console.log(err.message)
    }
  }
  return (
    <>
      <div><Toaster /></div>
      <ContentLayout title="Manage">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Application Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div><Toaster /></div>
      <div className=' px-6 py-2 my-12'>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Application" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {values.map((opts, i) => (
                        <SelectItem key={i} value={opts._id}>{opts.applicationName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>

              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select an Enviroment</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ETE1" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          ETE1
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ETE2" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          ETE2
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BOTH" />
                        </FormControl>
                        <FormLabel className="font-normal">All  </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <div>
          <Table>
            <TableCaption>A list of Application URLs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">URL Type</TableHead>
                <TableHead>URL Link</TableHead>
                <TableHead>Environment</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {fetchedData && fetchedData.map((url, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{url.type}</TableCell>
                  <TableCell>{url.link}</TableCell>
                  <TableCell>{url.environment}</TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>

        </div>
      </div>
      </ContentLayout>

    </>
   
  )
}

export default page