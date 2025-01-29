// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
// bg-orange-600 border-orange-600

import { PRODUCT_PRICES } from "@/config/products"
import { Label } from "@headlessui/react"


export const COLORS =[
    {
        label:"Black",
        value:"black",
        tw:'zinc-900'

    },
    {
        label:"Blue",
        value:"blue",
        tw:'blue-950'
    },
    {
        label:"Rose",
        value:"rose",
        tw:'rose-950'
    },
    {
        label:"Orange",
        value:"orange",
        tw:'orange-600'
    },
] as const

export const MODELS={
    name: 'models',
    options:[
        {
            label: 'iphone X',
            value: "iphonex",
        },
        {
            label: 'iphone 11',
            value: "iphone11",
        },
        {
            label: 'iphone 12',
            value: "iphone11",
        },
        {
            label: 'iphone 13',
            value: "iphone13",
        },
        {
            label: 'iphone 14',
            value: "iphone14",
        },
        {
            label: 'iphone 15',
            value: "iphone15",
        },

    ]
}as const

export const MATERIALS={
    name:"material",
    options:[
        {
            label:'Silicone',
            value:"silicone",
            description: "Made out of Silicone",
            price: PRODUCT_PRICES.material.silicone,
        },
        {
            label:'Soft Polycarbonate',
            value:"polycarbonate",
            description: "Scratch-Resistance coating",
            price: PRODUCT_PRICES.material.polycarbonate,
        },
        {
            label:'Plastic',
            value:"plastic",
            description: "Cheapest Material",
            price: PRODUCT_PRICES.material.plastic,
        }
    ],
}as const

export const FINISHES = {
    name: 'finish',
    options: [
      {
        label: 'Smooth Finish',
        value: 'smooth',
        description: undefined,
        price: PRODUCT_PRICES.finish.smooth,
      },
      {
        label: 'Textured Finish',
        value: 'textured',
        description: 'Soft grippy texture',
        price: PRODUCT_PRICES.finish.textured,
      },
      {
        label:'Leather Finish',
        value:'leather',
        description:"Made out of vegan Leather",
        price:PRODUCT_PRICES.finish.leather
      }
    ],
  } as const