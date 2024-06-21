'use client'

import PageTitle from '@/components/PageTitle';
import React, { useEffect, useState } from 'react'

interface Application {
  _id: string;
  applicationName: string;
}

interface Owner {
  name: string;
  email: string;
  role: string;
}

const Page: React.FC = () => {
  const [values, setValues] = useState<Application[]>([])
  const [options, setOptions] = useState<string | undefined>()
  const [appdetails, SetAppdetails] = useState<any>()

  useEffect(() => {
    fetch("http://localhost:3000/api/applications/fetchApplications")
      .then((data) => data.json())
      .then((val) => setValues(val.apps))
  }, [])

  const handleClick = async () => {
    try {
      if (!options) return;
      const data = await (await fetch(`http://localhost:3000/api/applications/fetchApplications/${options}`)).json()
      SetAppdetails(data);

      console.log(data)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  return (
    <>
    <PageTitle title="Administrators"/>
    <div className='container flex flex-col items-center justify-center w-full h-screen '>
      
      <h1 className='text-3xl font-semibold my-4'>Search Application Administrators</h1>
      <div className='w-[90%] h-[60%] rounded-xl border-2 shadow-xl flex flex-col items-start gap-2 justify-start bg-white py-12 px-12'>
        <div>
          <select
            className='w-[300px] border-2 p-2 rounded-lg'
            onChange={(e) => setOptions(e.target.value)}
          >
            <option>Select an Application</option>
            {values.map((opts, i) => (
              <option key={i} value={opts._id}>{opts.applicationName}</option>
            ))}
          </select>
          <button
            className='w-[100px] text-center border-2 p-[6px] shadow-lg rounded-lg mx-4 hover:bg-black hover:text-white'
            type="submit"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
        <div className='admin-table w-full h-full bg-white border-2 rounded-lg p-4'>      
           <div className='flex items-start justify-between border-b-2 font-bold'>
            <p className='w-[200px]'>Name</p> 
            <p className='w-[200px]'>Email</p>
            <p className='w-[200px]'>Role</p>
          </div>
          {appdetails?.applicationDetails?.admins.map((admin:any, i:any) => (
            <div key={i} className='flex items-start justify-between border-b-2 py-2'>
              <p className='w-[200px]'>{admin.name}</p> 
              <p className='w-[200px]'>{admin.email}</p>
              <p className='w-[200px]'>{admin.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Page
