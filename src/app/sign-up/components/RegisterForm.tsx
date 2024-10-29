'use client';
import InputText from "@/components/InputText/InputText";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import InputPassword from "@/components/InputPassword/InputPassword";
import {useRegisterForm} from "../hooks/useRegisterForm";
import {isEmailValid} from "@/utilities/validation";

const SignIn=() => {
    const {
        formData,
        buttonLoading,
        emptyEmail,
        passwordErrors,
        handleChange,
        handleSubmit,
    }=useRegisterForm();
    console.log('Aqui enviamos los formularios :',useRegisterForm(),handleSubmit)

    return (
        <>
            <form
                onSubmit={handleSubmit}
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

                    {/* Campo de Username */}
                    <InputText
                        value={formData.username}
                        handleChange={handleChange}
                        type="text"
                        name="username"
                        required={true}
                        label="Username"
                    />

                    {/* Campo de Cedula de identidad */}
                    <InputText
                        value={formData.cedula}
                        handleChange={handleChange}
                        type="text"
                        name="cedula"
                        label="Cedula"
                        required={true}
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
                        error={passwordErrors?.lengthError}
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
