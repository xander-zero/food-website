import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductCard } from "src/components/ProductCard";

const DIFFICULTY = [
  {
    label: "Difficulty",
    value: "Difficulty",
  },
  {
    label: "Easy",
    value: "Easy",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "Hard",
    value: "Hard",
  },
];

const TIME = [
  {
    label: "Cooking Time",
    value: "Cooking Time",
  },
  {
    label: "More than 30 min",
    value: "More than 30 min",
  },
  {
    label: "Less than 30 min",
    value: "Less than 30 min",
  },
];

export function Categories({ data }) {
  const router = useRouter();

  const [query, setQuery] = useState({
    difficulty: "",
    time: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSearch = useCallback(() => {
    router.push({ pathname: router.pathname, query });
  }, [query]);

  useEffect(() => {
    const { difficulty, time } = router.query;
    if (query.difficulty !== difficulty || query.time !== time) {
      setQuery({ difficulty, time });
    }
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl">Categories</h2>
      <div className="">
        <div className="flex items-center gap-3 mt-[50px]">
          <select
            className="w-[200px] p-2 shadow-xl rounded-lg outline-none"
            name="difficulty"
            onChange={handleChange}
          >
            {DIFFICULTY.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            className="w-[200px] p-2 shadow-xl rounded-lg outline-none"
            name="time"
            onChange={handleChange}
          >
            {TIME.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-2 rounded-lg text-white bg-[#56cf52]"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="flex items-center justify-between flex-wrap my-[50px]">
          {data.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
