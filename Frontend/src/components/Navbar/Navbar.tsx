import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = (e: any) => {
    e.preventDefault();
    auth.signout();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="bg-white text-[#0a747c] p-4 flex items-center justify-between w-full border border-bottom-[#0a747c] h-14">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-3xl font-bold text-[#0a747c] font-dancing">
          TaskFlow
        </Link>
        <button className="text-md text-white p-[5px] px-[8px] bg-[#0a747c] rounded-md">
          Criar
        </button>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={toggleModal}
          className="text-[#0a747c] focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        className="hidden lg:flex lg:items-center lg:space-x-4"
      >
        <Link to="/profile" className="hover:opacity-75">
          Perfil
        </Link>
        <Link to="/" onClick={handleLogout} className="hover:opacity-75">
          Sair
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-end mr-4 z-50">
          <div className="absolute top-12 bg-white text-[#0a747c] p-6 rounded-lg shadow-lg w-[50%] md:w-[25%] lg:w-[23%] ">
            <button
              onClick={toggleModal}
              className="float-right text-black font-bold"
            >
              &times;
            </button>
            <div>
              <Link to="/profile" className="block hover:opacity-75 mb-2">
                Perfil
              </Link>
              <Link
                to="/"
                onClick={handleLogout}
                className="block hover:opacity-75 mb-2"
              >
                Sair
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
