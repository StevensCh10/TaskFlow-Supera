import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Step } from "../../types/Step";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Tasks from "../../components/Tasks/Tasks";

const Home = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  
  const [activeButtonTask, setActiveButtonTask] = useState(true);
  const [activeButtonTaskFrame, setActiveButtonTaskFrame] = useState(false);
  const [activeButtonPriority, setActiveButtonPriority] = useState(false);
  

  const handleClickTask = () => {
    setActiveButtonTask(true);
    setActiveButtonTaskFrame(false);
    setActiveButtonPriority(false);
  };

  const handleClickTaskFrame = () => {
    setActiveButtonTask(false);
    setActiveButtonTaskFrame(true);
    setActiveButtonPriority(false);
  };

  const handleClickPriority = () => {
      setActiveButtonTask(false);
      setActiveButtonTaskFrame(false);
    setActiveButtonPriority(true);
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex mt-10 min-h-[88vh] xl:min-h-[84vh] w-[70%]">
        <div className="w-[20%] mr-[3%]">
          <div className="flex flex-col w-full">
            <button
              className={`text-[#0a747c] text-start p-[5px] rounded-md ${
                activeButtonTask && "bg-[#0a747c] text-white"
              }`}
              onClick={handleClickTask}
            >
              Tarefas
            </button>
            <fieldset className="hidden md:block border-t border-t-[#00000046] border-0 block text-center mt-[5%] mb-[3%] w-full"></fieldset>
            <span className="text-[0.75em] p-[5px] opacity-80">Área de trabalho</span>
            <div className="flex flex-col w-full">
              <p className="mb-[1%] p-[5px]">
                Área de trabalho de {user?.name?.toUpperCase()}
              </p>
              <button
                className={`w-full my-[1%] text-start text-[#0a747c] p-[5px] rounded-md ${
                  activeButtonTaskFrame && "bg-[#0a747c] text-white"
                }`}
                onClick={handleClickTaskFrame}
              >
                <span className="ml-4">Tarefas</span>
              </button>
              <button
                className={`w-full my-[1%] text-start text-[#0a747c] p-[5px] rounded-md ${
                  activeButtonPriority && "bg-[#0a747c] text-white"
                }`}
                onClick={handleClickPriority}
              >
                <span className="ml-4">Destaques</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          {(activeButtonTask || activeButtonTaskFrame) && 
            <Tasks/>
          }
          
        </div>
      </div>
      <Footer color="#0a747c" />
    </div>
  );
};

export default Home;
