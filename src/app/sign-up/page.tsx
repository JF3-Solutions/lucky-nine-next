import LuckyInfo from "@/components/LuckyInfo/LuckyInfo"
import PrimaryTitle from "@/components/PrimaryTitle/PrimaryTitle"
import {ToastContainer} from "react-toastify"
import RegisterForm from "./components/RegisterForm"


const SignIn=() => {
    return (
        <main className='min-h-[calc(100dvh-60px)] flex flex-col py-4 md:max-w-[80vw] md:flex-row md:mx-auto'>
            <ToastContainer
                theme='colored'
                draggable
                className='md:w-[600px]'
                containerId='registerToastify'
            />
            <section className="md:flex md:h-dvh md:w-full md:justify-evenly md:items-center my-auto">
                <LuckyInfo />
                <div className="my-auto">
                    <PrimaryTitle title={"Registrar Cuenta"} />
                    <RegisterForm />
                </div>
            </section>
        </main>
    )
}
export default SignIn