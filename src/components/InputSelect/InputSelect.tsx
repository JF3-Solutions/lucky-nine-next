import type {ChangeEvent} from "react";
import InputText from "../InputText/InputText";

interface Option {
    value: string;
    label: string;
}

interface InputSelectProps {
    name: string;
    prefixValue: string;
    numberValue: string;
    error?: boolean;
    options: Option[];
    placeholder?: string;
    onPrefixChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputSelect=({
    name,
    prefixValue,
    numberValue,
    options,
    placeholder,
    error,
    onPrefixChange,
    onNumberChange,
}: InputSelectProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <select
                    name={`${name}-prefix`}
                    value={prefixValue}
                    onChange={onPrefixChange}
                    className="border-[1px] h-[44px] w-[80px] text-center border-blue-800 outline-none rounded-lg bg-transparent px-2 py-1 text-gray-400"
                    aria-label="Select ID prefix"
                >
                    {options?.map((option,index) => (
                        <option
                            className="text-blue-800 w-[44px] h-[44px]"
                            key={index}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <InputText
                    value={numberValue}
                    handleChange={onNumberChange}
                    label="Número de cédula"
                    type="text"
                    name={`${name}-number`}
                    required={true} // o false dependiendo de tus necesidades
                    error={error}
                    placeholder={placeholder}
                />
            </div>
            <p id={`${name}-description`} className="text-gray-400 text-xs pt-2 text-justify">
                ¡Es importante tener en cuenta que esta cédula de identidad es la que usarás para tus depósitos y retiros!
            </p>
        </div>
    );
};

export default InputSelect;
