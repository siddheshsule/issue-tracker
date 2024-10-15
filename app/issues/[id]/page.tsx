import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params:{id:string};
}

const IssueDetailPage = async ({params}:Props) => {
    const issue = await prisma.issue.findUnique({
        where: {id:parseInt(params.id)}
    })

    if(!issue) {
        notFound();
    }


  return (
    <div>
        <p>{issue.id}</p>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.createdAt.toDateString()}</p>
        <p>{issue.updatedAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage
