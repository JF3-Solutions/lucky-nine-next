import {useState,type FormEvent} from "react";
import {useToastify} from "@/hooks/useToastify"
import {useRouter} from "next/navigation";
import axios from "axios";
import {resendCode,verify} from "../services/verify";

export const useVerifyForm=() => {
    // ------------- State ------------- //
    const [code,setCode]=useState<string[]>(Array(6).fill("")); // Estado para almacenar los dígitos del código
    const [error,setError]=useState<string>(""); // Estado para errores
    const {toastifyError,toastifyInfo}=useToastify()
    const [isSubmitting,setIsSubmitting]=useState<boolean>(false); // Estado para manejar el envío
    const router=useRouter(); // Para redireccionar si el código es correcto

    // Recuperar el email desde sessionStorage
    const email=sessionStorage.getItem("verify")||"";

    // ------------- Functions ------------- //

    // Manejar cambios en cada input de código
    const handleChange=async (index: number,value: string) => {
        if(isNaN(Number(value))||value.length>1) return; // Solo permitir un dígito numérico

        const newCode=[...code];
        newCode[index]=value;
        setCode(newCode);

        // Enfocar el siguiente input automáticamente si se ingresa un dígito
        if(value&&index<5) {
            const nextInput=document.getElementById(`input-${index+1}`);
            if(nextInput) nextInput.focus();
        }

        // Si estamos en el último dígito y todos están llenos, enviamos el formulario
        if(index===5&&newCode.every((digit) => digit!=="")) {
            await submitCode(newCode.join(""));
        }
    };

    // Enviar el código de verificación
    const submitCode=async (verificationCode: string) => {
        setError("");

        if(verificationCode.length!==6) {
            setError("Por favor, ingresa los 6 dígitos del código.");
            return;
        }

        try {
            const response=await verify({email,verificationCode});
            if(response.status===200) {
                const message: string=(response.data.message)
                toastifyInfo(
                    message,
                    'verifyToastify'
                )
                router.push('/')
                return
            }
            return
        } catch(error) {
            if(axios.isAxiosError(error)&&error.response) {
                const message: string=(error.response.data.message);
                toastifyError(message,'verifyToastify')
            }
        }
    };
    const handleResendCode=async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response=await resendCode({email});
            if(response.status===200) {
                toastifyInfo(
                    `El codigo de verificacion ha sido reenviado a ${email}.`,
                    'verifyToastify'
                )
                setIsSubmitting(true)
                return
            }
        } catch(error) {
            if(axios.isAxiosError(error)&&error.response) {
                const message: string=(error.response.data.message);
                toastifyError(message,'verifyToastify')
            }
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return {
        code,
        error,
        isSubmitting,
        handleChange,
        handleResendCode,
    };
};
