import Image from "next/image";
import Location from "src/components/icons/Location";
import Dollar from "src/components/icons/Dollar";

export function ProductDetail({ data }) {
  const { name, id, details, discount, price, ingredients, recipe } = data;

  const calculatePercent = (price, discount) => price * (100 - discount);

  return (
    <div className="container mx-auto">
      <h2 className="my-4 text-2xl">Details</h2>
      <div>
        <div>
          <Image
            className="w-[100%] h-[400px] object-cover"
            src={`/images/${id}.jpeg`}
            alt={name}
            width={2000}
            height={2000}
          />
          <div>
            <h3 className="my-4 text-xl">{name}</h3>
            <span className="flex items-center gap-1 my-2 text-gray-700">
              <Location /> {details[0].Cuisine}
            </span>
            <span className="flex items-center gap-1 my-2 text-gray-700">
              <Dollar />
              {discount ? calculatePercent(price, discount) : price}$
            </span>
            {discount ? <span>{discount}$ OFF</span> : null}
          </div>
          <div className="my-4">
            <h3 className="my-4 text-xl">ingredients</h3>
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient} className="text-gray-700 text-lg">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="my-6">
            <h3 className="my-4 text-xl">Recipe</h3>
            {recipe.map((item) => (
              <div key={item} className="text-lg">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
