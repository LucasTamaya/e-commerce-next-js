import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-16 py-7 bg-main-red">
      <h1 className="text-white font-bold text-4xl">NextFoodApp</h1>
      <Navbar />
    </header>
  );
};

export default Header;
