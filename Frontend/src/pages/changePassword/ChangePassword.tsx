import { useContext, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { User } from "../../types/User";
import { ErrorType } from "../../types/ErrorType";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const auth = useContext(AuthContext);
    const user: User = auth.user!;
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const labelStyle = "mb-[1%] text-[1em] opacity-85";
    const inputStyle = "p-[10px] box-border mb-[4%] rounded-sm bg-[#00000015] text-[1em] focus:outline-none";

    const handleAtt = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try{
            await auth.updatePassword(user!, password, newPassword).then(() => {
                alert("Senha atualizada");
                navigate("/profile");
            });
        }catch(error){
            alert((error as ErrorType).detail);
        }
    };

    return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-[89vh]">
        <form className="flex flex-col" onSubmit={handleAtt}>
            <label className={labelStyle}>Senha atual:</label>
            <input
              className={inputStyle}
              placeholder="Senha atual"
              type="text"
              id="text"
              name="text"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
  
            <label className={labelStyle}>Nova senha:</label>
            <input
              className={inputStyle}
              placeholder="Nova senha"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          <button
            className="rounded-sm text-[#0a747c] p-[10px] cursor-pointer border border-[#0a747c] text-[1em] mt-[7%]
             hover:bg-[#0a747c] hover:text-white"
            type="submit">Salvar</button>
        </form>
      </div>
      <Footer color="#0a747c"/>
    </div>
    );
}

export default ChangePassword;