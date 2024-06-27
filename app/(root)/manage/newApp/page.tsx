'use client'
import PageTitle from '@/components/PageTitle'
import NewApp from '@/components/forms/NewApp'
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
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
  if (fetchedData?.role != 'primaryadmin') {
    return <>
      <h1>You are not the Primary Admin</h1>
    </>;
  }

  return (
    <ContentLayout title="New Application">
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
            <BreadcrumbPage>Create New Application</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
        
      </Breadcrumb>
      
      <NewApp/>
    </ContentLayout>
   
  )
}

export default page