'use client'
 
import PageTitle from '@/components/PageTitle';
import { ClientApp } from '@/components/forms/ClientApp';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { useEffect, useState } from "react";

interface Userdata {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}


const page = () => {

  const [fetchedData, setFetchedData] = useState<Userdata>();
  useEffect(() => {
    fetch("http://localhost:3000/api/users/profile")
      .then((data) => data.json())
      .then((val) => setFetchedData(val.data))
  }, [])
  if (fetchedData?.role === 'user') {
    return <>
      <h1>You are not the Admin</h1>
    </>;
  }
    
  return (
    <div className=''>
      <ContentLayout title="New URL">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/manage">Manage</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add New URL</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>

        </Breadcrumb>
      <div className='flex w-full'>
           <ClientApp/>
        <div className='flex flex-col gap-4 m-12'>
          <Button><Link href={'/manage/clientApplication'}>Add Client Application</Link></Button>
          <Button><Link href={'/applicationdetails'}>View Application Details</Link></Button>
        </div>
        </div>
      </ContentLayout>
       
    </div>
  )
}

export default page