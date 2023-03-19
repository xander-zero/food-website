import { ATTRIBUTE_LIST } from "src/template/constants/arrtibute";

export function Attribute() {
  return (
    <div className="my-4">
      <h2 className="text-[#56cf52] text-xl font-semibold">Why us?</h2>
      <div className="flex items-center justify-between mt-[40px]">
        {ATTRIBUTE_LIST.map((attribute) => (
          <div
            key={attribute.id}
            className="shadow-xl p-4 flex items-center justify-center flex-col w-[180px] h-[180px] gap-4 rounded-lg"
          >
            {attribute.icon}
            <p>{attribute.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
