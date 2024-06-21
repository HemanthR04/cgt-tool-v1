import ManageApp from '@/components/ManageApp'
import PageTitle from '@/components/PageTitle'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
            <PageTitle title="Manage Application" />
            <ManageApp/>
    </div>
  )
}

export default page