const Button=({onClick,label}: {onClick: () => void,label: string}) => {
    return (<button className="bg-black-500" onClick={onClick}>{label}</button>);
}

export default Button;