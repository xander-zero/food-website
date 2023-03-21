export function AuthLayout({ title, description, children }) {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="shadow-xl flex">
        <div className="w-[400px] h-[400px] rounded-tl-xl rounded-bl-xl p-8 flex items-center justify-center">
          {children}
        </div>
        <div className="relative flex flex-col rounded-tr-xl rounded-br-xl justify-center items-center p-4 bg-[#56cf52] w-[400px] h-[400px]">
          <div className="text-white">
            <h3 className="text-white text-xl">{title}</h3>
            <p>{description}</p>
          </div>
          <div className="absolute bottom-4">
            <h1 className="text-white text-2xl font-semibold">XanderFood</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
