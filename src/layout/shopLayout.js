import Link from "next/link";

export function ShopLayout({ children }) {
  return (
    <>
      <header className="container mx-auto flex items-center justify-between py-4">
        <div>
          <h1 className="text-3xl font-semibold">
            <Link href="/shop" className="text-[#56cf52]">
              XanderFood
            </Link>
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/shop/product" className="text-black">
            Menu
          </Link>
          <Link href="/categories" className="text-black">
            Categories
          </Link>
          <button className="bg-[#56cf52] px-6 py-2 text-white rounded-lg">
            Login
          </button>
        </div>
      </header>
      <div>{children}</div>
      <footer className="bg-[#56cf52] p-3 text-center text-white font-semibold">
        <a
          href="https://portfolio-xander.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          XanderFood
        </a>{" "}
        Next js | XanderFood Project &copy;
      </footer>
    </>
  );
}

export default ShopLayout;
