"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"


interface Application {
  _id: string;
  applicationName: string;
}

const FormSchema = z.object({
  applicationName: z
    .string({
      required_error: "Please select an application.",
    })
    .email(),
    environmentName: z
    .string({
      required_error: "Please select an application.",
    }),
    clientAppName: z.string().min(2).max(50),
    clientAppURL: z.string().min(2).max(50),
})

export function ClientApp() {
  const [values, setValues] = useState<Application[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/applications/fetchApplications")
      .then((data) => data.json())
      .then((val) => setValues(val.apps))
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="w-[800px] border-2 rounded-md p-12 mt-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="applicationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an application" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {values.map((opts, i) => (
                      <SelectItem key={i} value={opts._id}>{opts.applicationName}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can add new application in{" "}
                <Link href="/manage">Manage Applications</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="environmentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Environment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Environment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ETE1">ETE1</SelectItem>
                  <SelectItem value="ETE2">ETE2</SelectItem>
                  
                </SelectContent>
              </Select>
              <FormDescription>
                You can add new application in{" "}
                <Link href="/manage">Manage Applications</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientAppName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Application Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is your client application name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientAppURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Application URL</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is your client application URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
    </div>
  )
}
