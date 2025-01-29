"use client"
import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import NextImage from "next/image"
import {Rnd} from 'react-rnd'
// import {Field, Radio, RadioGroup,Label} from '@headlessui/react'
import { Description, Field,  Radio, RadioGroup } from '@headlessui/react'
import { useRef, useState } from "react";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import {Label as Lebb} from '@headlessui/react';
import { Label } from "@/components/ui/label";
// import { CheckCircledIcon } from "@radix-ui/react-icons";
import { ArrowRight, Check, CheckCircleIcon, ChevronDown, ChevronsUpDown } from "lucide-react";
// import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { saveConfig as _saveConfig,SaveConfigArgs } from "./action";
import { useRouter } from "next/navigation";
// import { Radio, RadioGroup } from '@headlessui/react'
// import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface DesignConfiguratorProps{
  configId: string
  imageUrl: string
  imageDimensions: {width:number; height:number}
}

const DesignConfigurator=({configId,imageUrl,imageDimensions}: DesignConfiguratorProps)=>{ 
 const {toast}= useToast();
 const router=useRouter();

 const {mutate:saveConfig}=useMutation({
  mutationKey:['save-config'],
  mutationFn: async (args:SaveConfigArgs) =>{
    await Promise.all([saveConfiguration(),_saveConfig(args)])
  },
  onError:() =>{
    toast({
      title:"Something went wrong",
      description:"There was a problem saving your configuration, Please try again",
      variant:'destructive',
    })
  },
  onSuccess:()=>{
    router.push(`/configure/preview?id=${configId}`)
  },
 })
  
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
    model: (typeof MODELS.options)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  })

  const [renderedDimension,setRenderedDimension]=useState({
    width:imageDimensions.width/4,
    height:imageDimensions.height/4,
  })

  const [renderedPosition,setRenderedPosition]=useState({
    x:150,
    y:205,
  })
const phoneCaseRef=useRef<HTMLDivElement>(null)
const containerRef=useRef<HTMLDivElement>(null)


const {startUpload} =useUploadThing("imageUploader")
  async function saveConfiguration(){
    try{
      const {left: caseLeft,top: caseTop,width,height} =phoneCaseRef.current!.getBoundingClientRect()

      const {left: containerLeft,top: containerTop}=containerRef.current!.getBoundingClientRect()


      const leftOffset=caseLeft-containerLeft
      const topOffset=caseTop-containerTop

      const actualx=renderedPosition.x-leftOffset
      const actualy=renderedPosition.y-topOffset

      const canvas=document.createElement("canvas")
      canvas.width=width
      canvas.height= height

      const ctx=canvas.getContext("2d")     //for modifying the canvas

      const userImage=new Image()
      userImage.crossOrigin="anonymous"   // sometimes we get cors issue fetching outside image urls
      userImage.src=imageUrl
      
      await new Promise((resolve)=>(userImage.onload=resolve))

      ctx?.drawImage(
        userImage,
        actualx,
        actualy,
        renderedDimension.width,
        renderedDimension.height,
        
      )
      const base64=canvas.toDataURL()
      const base64Data= base64.split(',')[1]

      const blob=base64ToBlob(base64Data,"image/png")

      const file =new File([blob],'filename.png',{type:'image/png'}) 

        await startUpload([file],{configId})
    }
    catch(err){
        toast({
          title:"Something went wrong",
          description:"There was a problem saving your configuration, Please try again",
          variant:'destructive',
        })
    }
  }

  function base64ToBlob(base64Data:string,mimeType:string){
    const byteCharacter=atob(base64Data)
    const byteNumbers=new Array(byteCharacter.length)
    for(let i=0;i<byteCharacter.length;i++){
      byteNumbers[i]=byteCharacter.charCodeAt(i)
    }
    const byteArray =new Uint8Array(byteNumbers)

    return new Blob([byteArray],{type: mimeType})
  }

  // console.log(options)

  return(
  <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
    <div ref={containerRef} className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
      <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
        <AspectRatio ratio={896/1831}
        ref={phoneCaseRef}

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
      onResizeStop={(_, __, ref, ___, {x,y})=>{
        setRenderedDimension({
          height: parseInt(ref.style.height.slice(0,-2)),
          width: parseInt(ref.style.width.slice(0,-2)),
        })

        setRenderedPosition({
          x,
          y
        })
      }}

      onDragStop={(_,data)=>{
        const {x,y}=data
        setRenderedPosition({
          x,
          y
        })
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
      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white" >
        <ScrollArea className="relative flex-1 overflow-auto">
          <div aria-hidden className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"/>
          <div className="px-8 pb-12 pt-8 ">
            <h2 className="tracking-tight font-bold text-3xl">Customize Your Case</h2>
            <div className="w-full h-px bg-zinc-200 my-6">
              <div className="relative mt-4 h-fulll flex flex-col justify-between">
                <div className="flex flex-col gap-6">
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
                        className={cn(
                          "group relative flex cursor-pointer rounded-lg  py-4 px-5 shadow-md transition focus:outline-none data-[focus]:outline-8",`text-${color.tw}  data-[focus]:outline-${color.tw} data-[checked]:bg-${color.tw}  data-[checked]:outline-${color.tw}:`
                        )}
                        >
                   <span
                          className={cn(
                            ' h-8 w-8 rounded-full border-8 group-data-[checked]:ring-offset-4 group-data-[checked]:ring-4 ',
                            ` bg-${color.tw} border-${color.tw} group-data-[checked]:ring-${color.tw}  `
                          )}
                        />
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
                <div className="flex flex-col gap-3 w-full">
                  <Label>Model:</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' role='combobox' className="w-full justify-between">
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model)=>(
                        <DropdownMenuItem key={model.label} className={cn("flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",{
                          "bg-zinc-100":model.label===options.model.label,
                        })}
                        onClick={()=>{
                          setOptions((prev)=>({...prev,model}))
                        }}>
                          <Check className={cn('mr-2 h-4 w-4',
                            model.label=== options.model.label?'opacity-100':'opacity-0'
                          )}/>
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS,FINISHES].map(({name,options:selectableOptions})=>(
                  <RadioGroup key={name} value={options[name as keyof typeof options]} onChange={(val)=>{
                    setOptions((prev)=>({
                     ...prev,
                      [name]:val,
                    }))
                  }}>
                    <Label>{name.slice(0,1).toUpperCase() +name.slice(1)}</Label>
                    <div className="mt-3 mb-5 space-y-4">
                        {selectableOptions.map((option)=>(
                          <Radio
                            key={option.label}
                            value={option}
                           className={(({ checked, disabled })=>
                          cn(
                            'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-4 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                             checked ? 'border-primary' : 'bg-white',
                  disabled && 'bg-gray-100'
                          ))}
                          >
                         <span className="flex items-center">
                          <span className="flex flex-col text-sm">
                            <Lebb className="font-medium text-gray-900 " as='span'>{option.label}</Lebb>
                            {option.description?<Description as='span' className="text-gray-500">
                              <span className="block sm:inline">{option.description}</span>
                            </Description>:null}

                          </span>
                         </span>
                         <Description as='span' className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                          <span className="font-medium text-gray-900">
                            {formatPrice(option.price)}
                          </span>
                         </Description>
                          </Radio>
                        ))}
                    </div>
                  </RadioGroup>
                ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-slate-800"/>
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(BASE_PRICE+options.finish.price+options.material.price)}
              </p>
              <Button 
              onClick={()=>saveConfig(
                {
                configId,
                color: options.color.value,
                finish: options.finish.value,
                material:options.material.value,
                model:options.model.value
                
                }
              )}
            
              size='sm' className="w-full">Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
  </div>
  ) 

}

export default DesignConfigurator