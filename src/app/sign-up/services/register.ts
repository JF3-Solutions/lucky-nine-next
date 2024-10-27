import publicApi from "@/adapters/publicApi.adapter";
import axios from "axios";

export const register=async (name:string, lastName:string,email:string, cedula:string, password:string) => {
    try {
        const response=await publicApi.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/register`,
            {
                name,
                lastName,
                email,
                cedula,
                password,
            }
        )
        return response;
    } catch(error: unknown) {
        if(axios.isAxiosError(error)) {
            throw error
        } else {
            throw new Error('Error desconocido')
        }
    }
}