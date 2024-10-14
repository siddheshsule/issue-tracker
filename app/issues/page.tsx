import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const IssuesPage = () => {
  return (
    <div className='mt-5 ml-2'>
        <Button><Link href='/issues/new'>New Issue</Link></Button>
      
    </div>
  )
}

export default IssuesPage
