import Image from "next/image";

export function Banner() {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[50%] flex flex-col">
        <h2 className="font-semibold text-2xl border-b-2 border-[#56cf52] w-[140px] mb-8">
          XanderFood
        </h2>
        <p className="font-semibold">Food Delivery and Takeout!</p>
        <span className="text-gray-500 my-6 w-[70%] leading-8">
          XanderFood is an online food ordering and delivery platform launched
          by Uber in 2014. Meals are delivered by couriers using cars, scooters,
          bikes, or on food.
        </span>
        <button className="bg-[#56cf52] px-6 py-2 text-white rounded-lg w-[100px]">
          See All
        </button>
      </div>
      <div className="flex-1">
        <Image
          src="/images/banner.png"
          className="w-[100%]"
          alt="banner"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
