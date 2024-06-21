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
import { Input } from "@/components/ui/input"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import Link from "next/link"



const formSchema = z.object({
  urltype: z.string().min(2).max(10),
  urlLink:z.string().min(2).max(50),
  environmentName:z.string().min(2).max(50)

})

const NewURL = () => {
  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      environmentName:"",
        urltype: "",
      urlLink:"",
    },
  })
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    console.log(data);
    router.push('/manage/newApp/addURL ')
  }
  return (
    
    <div className="max-w-[600px] border-2 p-8 rounded-md mt-[100px]">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="urltype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Type</FormLabel>
              <FormControl>
                <Input placeholder="HTTP" {...field} />
              </FormControl>
              <FormDescription>
                This is the URL Type.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /><FormField
        control={form.control}
        name="urlLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL Link</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com" {...field} />
            </FormControl>
            <FormDescription>
              This is the URL.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
        <Button type="submit">Add URL</Button>
      </form>
    </Form>
      </div>
  )
}

export default NewURL