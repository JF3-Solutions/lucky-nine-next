import LuckyInfo from "@/components/LuckyInfo/LuckyInfo"
import PrimaryTitle from "@/components/PrimaryTitle/PrimaryTitle"
import {ToastContainer} from "react-toastify"
import RegisterForm from "./components/RegisterForm"


const SignIn=() => {
    return (
        <main>
            <ToastContainer
                theme='colored'
                draggable
                className='md:w-[600px]'
                containerId='registerToastify'
            />
            <LuckyInfo />
            //Form section//
            <section>
                <PrimaryTitle title={"Registrar Cuenta"} />
                <RegisterForm />
            </section>
        </main>
    )
}
export default SignIn