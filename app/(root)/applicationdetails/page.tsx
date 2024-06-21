'use client'

import PageTitle from '@/components/PageTitle';
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"

interface Application {
  _id: string;
  applicationName: string;
  environments: [object]

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
      <PageTitle title="Application Details" />
      <div className='container flex flex-col items-center justify-center w-full h-screen '>
        <h1 className='text-3xl font-semibold my-4'>Search Application Details</h1>
        <div className='w-[90%] h-[60%] rounded-xl shadow-xl flex flex-col items-start gap-2 justify-start bg-white py-12 px-12'>
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
          <div className='flex '>
            <div className='flex items-center justify-between border-2 rounded-md  w-[300px] h-[40px]'>
              
              {appdetails?.applicationDetails?.environments.map((env: any, i: any) => (

                <div key={i} className="items-top flex space-x-2 px-8 py-4 ">
                  <Checkbox id="ete1" />

                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {env.environmentName}
                    </label>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
