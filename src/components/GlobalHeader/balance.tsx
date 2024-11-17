
const Balance=({balance}: {balance: number}) => {

    return (
        <span className="mx-2">
            <p className=" text-green-600 text-sm border-2 p-1 px-2 rounded-lg border-blue-800">{balance} Bs</p>
        </span>
    );
};

export default Balance;
