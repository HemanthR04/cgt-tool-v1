'use client'
import PageTitle from '@/components/PageTitle'
import ManageAdmin from '@/components/forms/ManageAdmin'
import React from 'react'
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
    <div>
      <ContentLayout title="Add Adminstrator">
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
              <BreadcrumbPage>Add New Adminstrators</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>

        </Breadcrumb>
        <ManageAdmin/>
        </ContentLayout>
    </div>
  )
}

export default page