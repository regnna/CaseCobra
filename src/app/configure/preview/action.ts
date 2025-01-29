'use server'

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Order } from "@prisma/client"
import { error } from "console"
import { isErrored } from "stream"

export const createCheckoutSession= async({configId}:{configId:string})=>{

    const configuration =await db.configuration.findUnique({
        where:{id:configId},
    })

    if(!configuration){
        throw new Error("No Such configuration found")
    }
    const {getUser}=getKindeServerSession();

    const user=await getUser()

    if(!user){
        throw new Error("You need to logged in")
    }

    const {finish,material}=configuration

    let price=BASE_PRICE

    if(material==="polycarbonate"){
        price+=PRODUCT_PRICES.material.polycarbonate
      }
      else if(material==="silicone"){
        price+=PRODUCT_PRICES.material.silicone
      }
  
      if(finish==="textured"){
        price+=PRODUCT_PRICES.finish.textured
      }
      else if(finish==="leather"){
        price+=PRODUCT_PRICES.finish.leather
      }

        // Validate price
  if (price < 50) {
    throw new Error("The total price must be at least ₹50 to meet Stripe's minimum requirement.");
  }
    
      let order:Order | undefined=undefined

      console.log("Your user ID:",user.id,configuration.id)
      const existingOrder = await db.order.findFirst({
        where: {
          userId: user.id,
          configurationId: configuration.id,
        },
      })
    

      if(existingOrder){
        order=existingOrder

      }
      else{
        order= await db.order.create({
          data:{
            amount:parseFloat(price.toFixed(2)),
            userId:user.id,
            configurationId:configuration.id,

          }
        })
      }

      const product=await stripe.products.create({
        name:"Custom Iphone Case",
        images: [configuration.imageUrl],
        default_price_data:{
          currency: "INR",
          unit_amount: Math.round(price * 100),
        }
      })


      const stripeSession= await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
        payment_method_types:["card"
          // ,"paypal"
        ],
        mode:"payment",
        shipping_address_collection: {allowed_countries:["IN","US","DE"]},
        metadata:{
          userId:user.id,
          orderId:order.id,
        },
        line_items:[{price:product.default_price as string,quantity:1}],
      })

      return {url:stripeSession.url}
    
}