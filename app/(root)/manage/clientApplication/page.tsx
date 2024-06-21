
 
import PageTitle from '@/components/PageTitle';
import { ClientApp } from '@/components/forms/ClientApp';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



const page = () => {
    
  return (
    <div className=''>
        <PageTitle title='Add Client Applications'/>
        <ClientApp/>
        <Button className='mt-8'><Link href={'/applicationdetails'}>View Application Details</Link></Button>
    </div>
  )
}

export default page