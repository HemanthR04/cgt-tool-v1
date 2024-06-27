
 
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


const page = () => {

 
    
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