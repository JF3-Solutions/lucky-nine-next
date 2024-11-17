import publicApi from "../../../adapters/publicApi.adapter";
import axios from "axios"

interface VerifyProps {
    email: string,
    verificationCode: string
}
interface ResendProps {
    email: string
}
export const verify=async (data: VerifyProps) => {
    try {
        const response=await publicApi.post(`${process.env.NEXT_PUBLIC_API_URL}auth/verify`,data
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

export const resendCode=async (data: ResendProps) => {
    try {
        const response=await publicApi.post(`${process.env.NEXT_PUBLIC_API_URL}auth/resendCode`,data)
        return response;
    } catch(error: unknown) {
        if(axios.isAxiosError(error)) {
            throw error
        } else {
            throw new Error('Error desconocido')
        }
    }
}