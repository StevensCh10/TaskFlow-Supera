import { Step as Task } from "../../types/Step";

interface CardProps {
  task: Task;
}

const CardTasks: React.FC<CardProps> = ({task}) => {
  const name = task.name;

  return (
    <div>
      {name === null}  
      <div className="border border-[#ff9500] rounded-lg p-4 my-4 mx-4 flex flex-col box-border">
        <h3 className="m-0 mb-[8%] text-center text-[#b86b00] text-lg w-full h-[35px]">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default CardTasks;
