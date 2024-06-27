'use client'
import Link from "next/link";


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


export default function page() {
  const [fetchedData, setFetchedData] = useState<Userdata>();


  useEffect(() => {
    fetch("http://localhost:3000/api/users/profile")
      .then((data) => data.json())
      .then((val) => setFetchedData(val.data))
  }, [])

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-5xl font-bold text-center mt-24">Welcome to Connectivity Grid tool - Beta</h1>
      <p className="text-center text-xl mt-12">Developed by TDM-IBM</p>
    </ContentLayout>
  );
}
