'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";



const NewIssuePage = () => {
  return (
    <div className='max-w-xl p-5 space-y-3'>
        <h2 className='text-xl font-semibold'>Create New Issue</h2>
        <Input placeholder='Title'/>
        <SimpleMDE placeholder='Description' />
        <Button>Submit Issue</Button>
      
    </div>
  )
}

export default NewIssuePage
