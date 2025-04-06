const Navbar = () => {
  return (
    <nav className="bg-slate-900 px-4 py-3 flex flex-col sm:flex-row justify-between items-center shadow-md">
      <h2 className="text-white text-2xl font-bold">MyTask</h2>
      <ul className="flex gap-6 mt-2 sm:mt-0">
        <li className="text-white text-lg font-medium cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="text-white text-lg font-medium cursor-pointer hover:font-bold transition-all">Your To Dos</li>
      </ul>
    </nav>
  );
};

export default Navbar;
