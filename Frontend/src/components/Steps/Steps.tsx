import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Step } from "../../types/Step";
import Navbar from "../Navbar/Navbar";
import { Task } from "../../types/Task";
import { ErrorType } from "../../types/ErrorType";
import Footer from "../Footer/Footer";

const Steps = () => {
  const { taskname } = useParams();
  const auth = useContext(AuthContext);
  const user = auth.user;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultSteps = await auth.stepsByTask(taskname as string);
        setSteps(resultSteps);
        const resultTasks = await auth.tasksByUser(auth.user!.id!);
        setTasks(resultTasks);
      } catch (error) {}
    };
    fetchData();
  }, [taskname]);

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleCreateStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const task = tasks.find((task) => task.name === taskname);
    const taskID: Task = { id: task?.id };

    const data: Step = {
      name: title,
      description: description,
      task: taskID,
      priority: false,
    };

    await auth.addStep(data)
      .then(() => window.location.reload())
      .catch((e) => alert((e as ErrorType).detail));
  };

  const handleAttPriority = async(step: Step) => {
    const taskID: Task = { id: (step?.task as number) };
    step.priority = !step.priority;
    step.task = taskID;

    await auth.updateStep(step)
      .then(() => window.location.reload())
      .catch((e) => alert((e as ErrorType).detail));
  }

  const labelStyle = "mb-[1%] text-start text-md";
  const inputStyle =
    "w-full p-2 rounded-md text-[#333333] bg-[#00000015] mb-[3%] text-md focus:outline-none";
  const formRow = "flex flex-col justify-center mx-[2.5%] ";

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex min-h-[89vh] w-full">
        <div className="w-[16%] p-3">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <p className="font-semibold mb-[1%] p-[5px]">
                Área de trabalho de {user?.name?.toUpperCase()}
              </p>
              <fieldset className="hidden md:block border-t border-t-[#00000046] border-0 block text-center mt-[5%] mb-[3%] w-full"></fieldset>
              <span className="mt-2 text-md font-semibold p-[5px]">
                Suas Tarefas
              </span>
              <div>
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    className={`w-full my-[1%] text-start text-[#0a747c] p-[5px] rounded-md ${
                      taskname === task.name && "bg-[#0a747c] text-white"
                    }`}
                    onClick={() => {
                      navigate(`/steps/${task.name}`);
                    }}
                  >
                    <span className="ml-4">{task.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[85%] border-l-black">
          <div className="flex items-center w-full h-[50px]">
            <span className="ml-[2%] text-lg font-semibold">{taskname}</span>
            <span className="ml-[1%] text-[0.8em] text-white p-[4px] bg-[#0a747c] rounded-md cursor-pointer">
              Tarefa
            </span>
          </div>
          {steps !== null ? (
            <div className="flex felx-wrap">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col text-start px-3 py-2 w-[220px] h-[180px] bg-[#0a747c] text-white rounded-md ml-5 mb-5`}
                >
                  <p className="font-semibold text-lg flex items-center">
                    {step.name}
                    {step.priority ? (
                      <span className="text-yellow-500 ml-2 cursor-pointer" onClick={() => handleAttPriority(step)}>★</span> // Estrela amarela
                    ) : (
                      <span className="text-gray-400 ml-2 cursor-pointer" onClick={() => handleAttPriority(step)}>★</span> // Estrela cinza (ou sem cor)
                    )}
                  </p>
                  <span className="">{step.description}</span>
                </div>
              ))}
              <div
                className="flex flex-col items-center justify-center text-start w-[180px] h-[80px] rounded-md bg-[#f8f8f8] ml-5 mb-5 cursor-pointer hover:bg-[#f1f1f1]"
                onClick={handleModal}
              >
                <span className="opacity-75">Criar nova etapa</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap w-full p-[5px]">
              <div
                className="flex flex-col items-center justify-center text-start w-[180px] h-[80px] rounded-md bg-[#f8f8f8] ml-5 mb-5 cursor-pointer hover:bg-[#f1f1f1]"
                onClick={handleModal}
              >
                <span className="opacity-75">Criar nova etapa</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center bg-white rounded-lg shadow-xl p-6">
            <button className="w-full flex justify-end" onClick={handleModal}>
              x
            </button>
            <span className="text-lg mb-4">Criar Etapa</span>
            <form
              className="flex flex-col items-center justify-center w-full text-center my-[8%] md:mt-[3%]"
              onSubmit={handleCreateStep}
            >
              <div className={formRow}>
                <label className={labelStyle}>Título</label>
                <input
                  className={inputStyle}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                ></input>
              </div>
              <div className={formRow}>
                <label className={labelStyle}>Descrição</label>
                <input
                  className={inputStyle}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></input>
              </div>
              <button
                className="text-md bg-[#b80e14] rounded-lg w-[95%] text-white p-[8px] border-none cursor-pointer mt-3 mb-5 hover:bg-[#b80e14a4] md:w-[80%] lg:w-[70%]"
                type="submit"
              >
                Criar
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer color="#0a747c" />
    </div>
  );
};

export default Steps;
