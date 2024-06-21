import PageTitle from '@/components/PageTitle'
import ManageAdmin from '@/components/forms/ManageAdmin'
import React from 'react'

const page = () => {
  return (
    <div>
        <PageTitle title='Add Secondary Admin'/>
        <ManageAdmin/>
    </div>
  )
}

export default page