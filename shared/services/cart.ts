import { Cart } from "@prisma/client"
import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"
import { CartDTO } from "./dto/cart.dto"

export const fetchCart = async (): Promise<CartDTO> => {
    const {data} =  await axiosInstance.get<CartDTO>(ApiRoutes.CART)

    return data
}

export const updateCart = async (id: number, quantity: number): Promise<CartDTO> => {
    const {data} =  await axiosInstance.patch<CartDTO>(ApiRoutes.CART + `/${id}`, { quantity })

    return data
}

export const deleteCartItem = async (id: number): Promise<CartDTO> => {
    const {data} =  await axiosInstance.delete<CartDTO>(ApiRoutes.CART + `/${id}`)

    return data
} 