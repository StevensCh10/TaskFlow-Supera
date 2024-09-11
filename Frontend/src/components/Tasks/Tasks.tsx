import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Task } from "../../types/Task";
import { User } from "../../types/User";
import { ErrorType } from "../../types/ErrorType";

const Tasks = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultTasks = await auth.tasksByUser(auth.user!.id!);
        setTasks(resultTasks);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleCreateTask = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userID: User = {id: auth.user?.id};
    const data: Task = {
        name: title,
        user: userID
    }

    await auth.addTask(data)
      .then(() => window.location.reload())
      .catch(e => alert((e as ErrorType).detail))
  };

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const labelStyle = "mb-[1%] text-start text-md";
  const inputStyle =
    "w-full p-2 rounded-md text-[#333333] bg-[#00000015] mb-[3%] text-md focus:outline-none";
  const formRow = "flex flex-col justify-center mx-[2.5%] ";

  return (
    <div className="flex flex-col">
      <span className="text-black p-[5px] font-semibold opacity-85">
        SUA ÁREA DE TRABALHO
      </span>
      <p className="my-2 p-[5px]">Suas tarefas ...</p>
        {tasks === null ? (
          <div className="flex flex-wrap w-full p-[5px]">
            <div
              className="flex flex-col items-center justify-center text-start w-[180px] h-[100px] rounded-md bg-[#f8f8f8] ml-5 mb-5 cursor-pointer hover:bg-[#f1f1f1]"
              onClick={handleModal}
            >
              <span className="opacity-75">Criar nova tarefa</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap w-full p-[5px]">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex flex-col text-start px-3 py-2 w-[180px] h-[100px] bg-[#0a747c] text-white rounded-md cursor-pointer ml-5 mb-5`}
                onClick={() => navigate(`/steps/${task.name as string}`)}
              >
                {task.name}
              </div>
            ))}
            <div
              className="flex flex-col items-center justify-center text-start w-[180px] h-[100px] rounded-md bg-[#f8f8f8] ml-5 mb-5 cursor-pointer hover:bg-[#f1f1f1]"
              onClick={handleModal}
            >
              <span className="opacity-75">Criar nova tarefa</span>
            </div>
          </div>
        )}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center bg-white rounded-lg shadow-xl p-6">
            <button className="w-full flex justify-end" onClick={handleModal}>
              x
            </button>
            <span className="text-lg mb-4">Criar Tarefa</span>
            <form
              className="flex flex-col items-center justify-center w-full text-center my-[8%] md:mt-[3%]"
              onSubmit={handleCreateTask}
            >
              <div className={formRow}>
                <label className={labelStyle}>Título</label>
                <input className={inputStyle} onChange={((e) => setTitle(e.target.value))} required></input>
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
    </div>
  );
};

export default Tasks;
