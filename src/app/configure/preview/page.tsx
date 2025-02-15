import { db } from '@/db'
import { notFound } from 'next/navigation'
import React from 'react'
import DesignPreview from './DesignPreview'
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

interface PageProps{
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}
const page = async ({searchParams}:PageProps) => {
    const {getUser}=getKindeServerSession();
    const user=await getUser()
    // const alsoUser = getUser();
    console.log("#$$$$@# @#$ @$$ @$ User from Kinde:", user);
// console.log("#$$$$@# @#$ @$$ @$ Also User from Kinde:", alsoUser);
    const {id} =searchParams
    if(!id ||typeof(id)!='string'){
        return notFound();
    }
    const configuration=await db.configuration.findUnique({
        where:{id},

    })
    if(!configuration){
        return notFound();
    }

  return (
    <DesignPreview configuration={configuration}/>
  )
}

export default page