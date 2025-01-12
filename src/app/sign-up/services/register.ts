import publicApi from "@/adapters/publicApi.adapter";
import axios from "axios";
interface RegisterData {
    name: string;
    lastName: string;
    username: string;
    email: string;
    cedula: string;
    password: string;
}

export const register=async (data: RegisterData) => {
    try {
        const response=await publicApi.post(
            `${process.env.NEXT_PUBLIC_API_URL}auth/register`,data
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