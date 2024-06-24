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

const page = () => {
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