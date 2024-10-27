import {useEmptyInput} from "@/hooks/useEmptyInput"
import {useToastify} from "@/hooks/useToastify"
import {useUserInfoStore} from "@/store/useUserInfoStore"
import {useRouter} from "next/navigation"
import {useState,type ChangeEvent,type FormEvent} from "react"
import {useValidatePassword} from "./useValidatePassword"
import {register} from "../services/register"
import {setUserInfoAdapter} from "@/adapters/userInfo.adapter"
import Cookies from 'js-cookie'
import type {AxiosError} from "axios"
import type {UsersInterface} from "@/models/User.interface"

interface RegisterForm {
    name: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
    cedula: string,

}
export const useRegisterForm=() => {

    // -------------Store------------//
    const {setUserInfo}=useUserInfoStore()

    // -------------State------------//
    const [formData,setFormData]=useState<RegisterForm>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        cedula: ''
    })

    const [buttonLoading,setButtonLoading]=useState<boolean>(false)

    // -------------Hooks------------//
    // Verificamos el input del email no quede vacío
    const emptyEmail: boolean=useEmptyInput(formData.email)
    // Verificamos el input del password no quede vacío
    const emptyPassword: boolean=useEmptyInput(formData.password)
    // Aplicaremos un hook para prevalidaciones de contraseña y confirmacion de contraseñas
    const [passwordErrors,validatePassword]=useValidatePassword(formData.password,formData.passwordConfirm);
    // Aplicamos los componentes toast para pintar las respuestas que recibiremos
    const {toastifyError,toastifyInfo}=useToastify()
    // Manipulamos el redireccionamiento de las paginas con este hooks
    const router=useRouter();


    // Creamos una funcion para manipular los cambios de los inputs
    const handleChange=(e: ChangeEvent<HTMLInputElement>) => {
        const {name,value}=e.target;
        // Aplicaremos todas las prevalidaciones pertinentes en esta funcion
        // *----* //
        if(name==='email') {
            if(value.length>250) {
                return
            }

            setFormData({
                ...formData,
                [name]: value,
            });
        }
        if(name==='password'||name==='passwordConfirm') {
            setFormData({
                ...formData,
                [name]: value
            });
            validatePassword()
        }


    }

    //Creamos la funcion que enviara las peticiones del registro a la DDBB
    const handleSubmit=async (e: FormEvent<Element>): Promise<void> => {
        e.preventDefault();
        // Activamos el Loading del boton mientras se realiza la peticion
        setButtonLoading(true);

        // Llamamos la peticion directamente desde register
        await register(formData.name,formData.lastName,formData.email,formData.password,formData.cedula)
            .then((res): void => {
                // Manejamos la respuesta correcta

                // Adaptamos los datos recibidos
                const adaptedData: UsersInterface=setUserInfoAdapter(res.data.data);
                // Los atrapamos en el estado global
                console.log(adaptedData)
                setUserInfo(adaptedData)

                // Guardamos los token en las cookies
                Cookies.set('token',res?.data?.data?.token);
                Cookies.set('refresh',res?.data?.data?.token);
                //Al finalizar y si todo esta OK redireccionamos al home
                router.replace('/');
            })
            .catch((error: AxiosError) => {
                // Si tenemos algún error lo manejaremos en los siguientes condicionales
                if(error.status===401) {
                    // Si el usuario no esta verificado se redirecciona a la pagina de verificacion
                    toastifyInfo(
                        'Hemos enviado un correo de verificacion a tu correo electronico.',
                        //Mostramos el mensaje en el Toast global
                        'globalToastify'
                    )
                    // Guardamos el correo en el sessionStorage para utilizarlo en el /resendCode
                    sessionStorage.setItem('verify',formData.email);
                    // Aqui debe redireccionar a la pagina de verificacion
                    router.push('/verify')
                } else {
                    // Mostramos el toast con el mensaje que nos envie la DDBB
                    const message: string=(error.response?.data as {message: string})?.message;
                    toastifyError(message,'registerToastify')
                }
            })
            .finally((): void => setButtonLoading(false))

    }






    return {
        formData,
        buttonLoading,
        emptyEmail,
        emptyPassword,
        passwordErrors,
        handleChange,
        handleSubmit

    }


}
