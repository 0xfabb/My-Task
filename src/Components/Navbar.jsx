import "react";
const Navbar = () => {
  return (
    <div>
      <nav className="bg-slate-900 p-1 flex justify-between">
            <h2 className=" text-white text-2xl p-2  font-bold ">MyTask</h2>
        <ul className="flex gap-8  p-3 mx-2">
          <li className="text-white text-lg font-medium cursor-pointer hover:font-bold transition-all">Home</li>
          <li className="text-white text-lg font-medium cursor-pointer hover:font-bold transition-all">Your To Dos</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
