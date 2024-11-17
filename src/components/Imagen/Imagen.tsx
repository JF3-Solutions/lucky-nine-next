import Image from 'next/image';

interface ImagenInterface {
  className: string;
  src: string;
  alt: string;
  rounded?: string;
}

const Imagen = ({ className, src, alt, rounded }: ImagenInterface) => {
  return (
    <figure className={`relative h-full ${className} ${rounded}`}>
      <Image
        src={src}
        className={`w-full object-contain ${rounded}`}
        width={0}
        height={0}
        quality={70}
        alt={alt}
      />
    </figure>
  );
};

export default Imagen;
