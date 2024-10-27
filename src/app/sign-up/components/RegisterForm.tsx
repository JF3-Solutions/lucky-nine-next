"use client"
import InputText from "@/components/InputText/InputText";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import InputPassword from "@/components/InputPassword/InputPassword"; // Asegúrate de tener este componente
import {useRegisterForm} from "../hooks/useRegisterForm"; // Importa tu hook personalizado

const SignIn=() => {
    const {
        formData,
        buttonLoading,
        emptyEmail,
        emptyPassword,
        passwordErrors,
        handleChange,
        handleSubmit,
    }=useRegisterForm(); // Usa el hook

    return (
        <>
            <form
                action=""
                onSubmit={handleSubmit} // Manejador de envío
                className="flex-1 flex flex-col w-full items-center md:max-w-[425px] px-6 py-6 justify-between md:gap-12"
            >
                <div className="flex flex-col gap-4 md:mb-4 w-full md:max-w-[425px]">
                    {/* Campo de Nombre */}
                    <InputText
                        value={formData.name}
                        handleChange={handleChange}
                        type="text"
                        name="name"
                        required={true}
                        label="Nombre"
                    />

                    {/* Campo de Apellido */}
                    <InputText
                        value={formData.lastName}
                        handleChange={handleChange}
                        type="text"
                        name="lastName"
                        required={true}
                        label="Apellido"
                    />

                    {/* Campo de Correo Electrónico */}
                    <InputText
                        value={formData.email}
                        handleChange={handleChange}
                        type="email"
                        name="email"
                        required={true}
                        label="Correo Electrónico"
                        error={emptyEmail||(formData.email.length>0&&!isEmailValid(formData.email))}
                    />

                    {/* Campo de Contraseña */}
                    <InputPassword
                        value={formData.password}
                        handleChange={handleChange}
                        label="Contraseña"
                        name="password"
                        error={passwordErrors?.lengthError||passwordErrors?.uppercaseError||passwordErrors?.numberError||passwordErrors?.symbolError}
                        required={true}
                    />

                    {/* Campo de Confirmación de Contraseña */}
                    <InputPassword
                        value={formData.passwordConfirm}
                        handleChange={handleChange}
                        label="Confirmar Contraseña"
                        name="passwordConfirm"
                        error={passwordErrors?.matchError}
                        required={true}
                    />
                </div>

                {/* Botón de Registro */}
                <PrimaryButton
                    label="Registrar"
                    type="submit"
                    loading={buttonLoading}
                    className="max-w-[250px]"
                />
            </form>
        </>
    );
};

export default SignIn;
