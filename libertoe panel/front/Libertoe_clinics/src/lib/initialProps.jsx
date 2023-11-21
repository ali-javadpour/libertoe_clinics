import { netCall } from "./netcall"

export const getAllOrders = async () =>{
    const res = await netCall("order","get")
    return res
}