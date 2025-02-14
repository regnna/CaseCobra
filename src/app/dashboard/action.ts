"use server"
import { db } from "@/db"
import { OrderStatus } from "@prisma/client"
// import { string } from "zod"

export const changeOrderStatus= async({id,newStatus}:{
        id:string,
        newStatus:OrderStatus
    })=>{
await db.order.update({
    where:{id},
    data:{status:newStatus},
})
    }
