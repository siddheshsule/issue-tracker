'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios"
import { useRouter } from 'next/navigation';


interface IssueForm {
    title: string,
    description : string
}

const NewIssuePage = () => {
    const {register, control,  handleSubmit} = useForm<IssueForm>();
    const router = useRouter();
    const onSubmit = handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
    });

  return (
    <form className='max-w-xl p-5 space-y-3' onSubmit={onSubmit}>
        <h2 className='text-xl font-semibold'>Create New Issue</h2>
        <Input placeholder='Title' {...register('title')}/>
        <Controller name='description' control={control} 
        render={({field})=><SimpleMDE {...field} placeholder='Description' />}/>        
        <Button type='submit'>Submit Issue</Button>
      
    </form>
  )
}

export default NewIssuePage
