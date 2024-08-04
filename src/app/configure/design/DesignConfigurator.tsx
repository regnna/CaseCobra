"use client"
import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import NextImage from "next/image"
import {Rnd} from 'react-rnd'
import {Field, Radio, RadioGroup} from '@headlessui/react'
import { useState } from "react";
import { COLORS } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
// import { CheckCircledIcon } from "@radix-ui/react-icons";
import { CheckCircleIcon } from "lucide-react";
// import { Radio, RadioGroup } from '@headlessui/react'
// import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface DesignConfiguratorProps{
  configId: string
  imageUrl: string
  imageDimensions: {width:number; height:number}
}

const DesignConfigurator=({configId,imageUrl,imageDimensions}: DesignConfiguratorProps)=>{ 
  const [options,setOptions]=useState<{
    color: (typeof COLORS)[number]
  }>({
    color: COLORS[1]
  })

  return(
  <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
    <div className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
      <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
      <AspectRatio ratio={896/1831}
      className="pointer-events-none relative z-50 aspect-[896/1831] w-full"> 
      <NextImage
      fill
      alt='phone image'
      src='/phone-template.png'
      className="pointer-events-none z-50 select-none "
      />
      </AspectRatio>
      <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px]
       bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.8)]"/>
       <div className={cn('absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] ',`bg-${options.color.tw}`)}/>

      </div>
      <Rnd default={{
        x:150,
        y:205,
        height:imageDimensions.height/4,
        width:imageDimensions.width/4,
       
      }}
      className="absolute z-20 border-[3px] border-primary"
      lockAspectRatio
      resizeHandleComponent={{
        bottomLeft:<HandleComponent/>,
        bottomRight:<HandleComponent/>,
        topLeft:<HandleComponent/>,
        topRight:<HandleComponent/>,
        // top:<HandleComponent/>,
        // bottom:<HandleComponent/>,
        // left:<HandleComponent/>,
      }}
      >
      <div className="relative w-full h-full">
        <NextImage 
        src={imageUrl}
        fill
        alt='Your Image'
        className="pointer-events-none"

        />
          </div>
        </Rnd>
    </div>
      <div className="h-[37.5rem] flex flex-col bg-white" >
        <ScrollArea className="relative flex-1 overflow-auto">
          <div aria-hidden className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"/>
          <div className="px-8 pb-12 pt-8 ">
            <h2 className="tracking-tight font-bold text-3xl">Customize Your Case</h2>
            <div className="w-full h-px bg-zinc-200 my-6">
              <div className="relative mt-4 h-fulll flex flex-col justify-between">
                <RadioGroup value={options.color} onChange={(val)=>{
                  setOptions((prev)=>({
                    ...prev,
                    color:val,
                  }))
                }}>
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color)=>(
                      <Radio
                        key={color.label}
                        value={color}
                        // className='relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 '
                        className={cn(
                          "group relative flex cursor-pointer rounded-lg  py-4 px-5 shadow-md transition focus:outline-none data-[focus]:outline-8",`text-${color.tw}  data-[focus]:outline-${color.tw} data-[checked]:bg-${color.tw}  data-[checked]:outline-${color.tw}:`
                        )}
                        >
                   <span
                          className={cn(
                            
                            // 'h-8 w-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2'
                            // "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            ' h-8 w-8 rounded-full border-8 group-data-[checked]:ring-offset-4 group-data-[checked]:ring-4 ',
                            ` bg-${color.tw} border-${color.tw} group-data-[checked]:ring-${color.tw}  `
                          )}
                        />
                         {/* <CheckCircleIcon className={cn("size-6  opacity-0 transition group-data-[checked]:opacity-100",`fill-white bg-${color.tw}`)} /> */}
               
                {/* <CheckCircleIcon className={cn("",`${color.tw}   border-${color.tw}`)}/> */}
              {/* </div> */}
                       

                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
  </div>
  ) 

}

export default DesignConfigurator