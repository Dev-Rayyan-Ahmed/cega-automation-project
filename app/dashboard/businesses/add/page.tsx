import React from 'react'
import BusinessForm from '@/components/forms/businessForm'
import { getLocationOptions } from '@/lib/auth-utils'

async function page() {
      const locationOptions = await getLocationOptions()
      return (
            <div><BusinessForm locationOptions={locationOptions} /></div>
      )
}

export default page