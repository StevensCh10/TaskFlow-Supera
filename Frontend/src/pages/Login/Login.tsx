import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ErrorType } from "../../types/ErrorType";
import Footer from "../../components/Footer/Footer";

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const labelStyle = "w-[70%] mb-[1%] text-[1em] opacity-85";
    const inputStyle = "box-border w-[70%] p-[10px] mb-[6%] rounded-sm bg-[#00000015] text-[1em] focus:outline-none ";
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email && password) {
        try{
          const isLogged = await auth.signin(email, password);
          if (isLogged) {
            navigate("/");
          }
        }catch(error){
          alert((error as ErrorType).detail);
        }
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0a747c] ">
        <div className="flex flex-col items-center bg-white rounded-md py-[3%] px-[1.5%] w-[270px] md:w-[340px] md:py-[3%] md:px-[1.5%]">
          <h1 className="text-[#0a747c] text-[3.8em] font-dancing mb-[3%]">TaskFlow</h1>
          <form className="flex flex-col items-center text-start w-full" onSubmit={handleLogin}>
            <label className={labelStyle}>Email</label>
            <input
              className={inputStyle}
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
  
            <label className={labelStyle}>Senha</label>
            <input
              className={inputStyle}
              placeholder="Senha"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
  
            <button
              className="rounded-sm mt-[5%] text-[#0a747c] p-[10px] cursor-pointer text-[1em] w-[70%] border
               border-[#0a747c] text-[1em] hover:bg-[#0a747c] hover:text-white" 
              type="submit"
              >
                Entrar
            </button>
          </form>
  
          <p className="mt-[3%] opacity-75 text-sm mb-[4%] md:mb-0 md:text-base">
            Não tem uma conta? <Link className="text-[#0a747c] hover:text-[#0a747c]" to="/register">Cadastre-se</Link>
          </p>

        </div>
        <div className="absolute bottom-0">
          <Footer color="white"/>
        </div>
      </div>
    );
  };
  
  export default Login;