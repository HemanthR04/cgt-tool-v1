import PageTitle from '@/components/PageTitle'
import NewApp from '@/components/forms/NewApp'
import React from 'react'

const page = () => {
  return (
    <div>
      <PageTitle title='Create a new Application'/>
      <NewApp/>
    </div>
  )
}

export default page