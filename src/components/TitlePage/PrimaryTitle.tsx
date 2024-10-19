const PrimaryTitle=({title,className}: {title: string,className?: string}) => {
    return (
        <h1 className={`${className} text-2xl font-bold text-gray-300 text-center`}>{title}</h1>


    )
}
export default PrimaryTitle