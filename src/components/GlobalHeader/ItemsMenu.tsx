import Link from "next/link";

const ItemsMenu=({href,name,onClick}: {href: string; name: string; onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;}) => {
    return (
        <div className=" text-gray-200">
            <ul className="justify-between">
                <li className="p-2 active:text-red items-center gap-4" onClick={onClick}>
                    <Link className="text-md" href={href} rel="noopener noreferrer">
                        {name}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default ItemsMenu;