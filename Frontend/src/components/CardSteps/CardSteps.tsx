import { useContext, useState } from "react";
import { Step } from "../../types/Step";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { ErrorType } from "../../types/ErrorType";

interface CardProps {
  subTask: Step;
}

const CardSteps: React.FC<CardProps> = ({subTask}) => {
  const auth = useContext(AuthContext);

  const name = subTask.name;
  const [description, setDescription] = useState(subTask.description);

  const pStyle = "text-[#333] my-2 ml-4";
  const inputStyle = "border-none text-base";

  const handleUpdated = () => {
    try {
      const subTaskAux: Step = {
        id: subTask.id,
        name: name,
        description: description,
        task: {
          id: subTask.task.id! as number
        },
        priority: false
      }
      auth.updateSubTask(subTaskAux);
      window.location.reload();
    } catch (error) {
      alert((error as ErrorType).detail);
    }
  }
  
  const handleDelete = () => {
    auth.deleteSubTask(subTask);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <div className="border border-[#ff9500] rounded-lg p-4 my-4 mx-4 flex flex-col box-border">
      <h3 className="m-0 mb-[8%] text-center text-[#b86b00] text-lg w-full h-[35px]">
        {name}
      </h3>
      <form>
        <p className={pStyle}>
          Descrição: <input onChange={(e) => setDescription(e.target.value)} value={description} className={inputStyle} />
        </p>
      </form>
      <div className="flex justify-between">
        <button onClick={handleUpdated} className="m-5 bg-white rounded-lg w-[48%] text-[#ff9500] p-2 border border-[#ff9500] cursor-pointer box-border hover:bg-[#ff9500] hover:text-white">
          Salvar alterações
        </button>
        <button onClick={handleDelete} className="m-5 bg-white rounded-lg w-[48%] text-[#ff9500] p-2 border border-[#ff9500] cursor-pointer box-border hover:bg-[#ff9500] hover:text-white">
          Apagar produto
        </button>
      </div>
    </div>
    );
  };
  
  export default CardSteps;