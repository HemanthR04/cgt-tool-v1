"use client"

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
import Link from "next/link"
const formSchema = z.object({
    applicationName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    adminName:z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
  })



const ManageAdmin = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            applicationName: "",
            adminName:"",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    

  return (
    <div
    className="relative hidden flex-col items-start gap-8 md:flex"
  >
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
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
          name="adminName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adminstrator Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an application" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">Hemanth</SelectItem>
                  <SelectItem value="m@google.com">Sayan</SelectItem>
                  <SelectItem value="m@support.com">Bhanu</SelectItem>
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
        
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  </div>
  )
}

export default ManageAdmin