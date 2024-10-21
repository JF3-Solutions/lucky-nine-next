function ButtonNav({children,text,onClick,className,disabled,type}: {text?: string,children?: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean; type?: 'button'|'submit'|'reset';}) {
    return <button disabled={disabled}
        className={`bg-blue-800 font-bold text-gray-100 hover:text-white w-1/2 rounded-xl h-10 max-w-[425px]  ${className}`} type={type} onClick={onClick} >{text||children}</button>;
}

export default ButtonNav;
