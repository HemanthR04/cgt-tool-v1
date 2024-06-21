import PageTitle from '@/components/PageTitle'
import NewURL from '@/components/forms/NewURL'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <PageTitle title='Add URL'/>
        <NewURL/>
        <div className='flex gap-4 m-12'>     
        <Button><Link href={'/manage/clientApplication'}>Add Client Application</Link></Button>
        <Button><Link href={'/applicationdetails'}>View Application Details</Link></Button>
        </div>
    </div>
  )
}

export default page