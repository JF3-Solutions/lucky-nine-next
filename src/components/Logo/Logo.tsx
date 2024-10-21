import Image from "next/image";

const Logo=({className,src,alt}: {className?: string; src: string; alt: string}) => {
    return (
        <figure className={`w-[10rem] h-[10rem] overflow-hidden rounded-full  ${className}`}>
            <Image
                className="w-full h-full object-cover object-center"
                src={src}
                alt={alt}
                width={100}
                height={100}
                quality={100}
            />
        </figure>
    );
};

export default Logo;
