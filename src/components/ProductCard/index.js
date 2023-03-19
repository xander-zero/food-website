import Image from "next/image";
import Location from "src/components/icons/Location";
import Dollar from "src/components/icons/Dollar";
import Link from "next/link";

export function ProductCard(props) {
  const { name, id, price, details, discount } = props;

  const calculatePercnt = (price, disCount) => {
    return price * (100 - disCount);
  };

  return (
    <div className="w-[250px] shadow-xl mx-1 rounded-lg my-4">
      <Image
        className="w-[100%] rounded-lg"
        width={200}
        height={200}
        src={`/images/${id}.jpeg`}
        alt={name}
      />
      <div className="p-4 flex items-center justify-between">
        <h4>{name}</h4>
        <div className="flex items-center gap-2">
          <Location />
          {details[0].Cuisine}
        </div>
      </div>
      <div className="p-4 flex items-center text-gray-800">
        <Dollar />
        {discount ? (
          <span>{calculatePercnt(price, discount)}$</span>
        ) : (
          <span>{price}$</span>
        )}
        {discount ? <div>{discount}</div> : null}
      </div>
      <div className="p-4">
        <button className="w-[100%] bg-[#56cf52] p-2 rounded-lg">
          <Link
            href={`/shop/product/${id}`}
            className="text-white hover:text-white font-semibold"
          >
            See Details
          </Link>
        </button>
      </div>
    </div>
  );
}
