import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { ErrorType } from "../../types/ErrorType";
import { User } from "../../types/User";
import Footer from "../../components/Footer/Footer";

const Register = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const labelStyle = "w-[70%] mb-[1%] text-[1em] opacity-85";
    const inputStyle = "box-border w-[70%] p-[10px] mb-[6%] rounded-sm bg-[#00000015] text-[1em] focus:outline-none ";

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await auth.register(newUser);
      if (response.id !== undefined) {
        navigate("/");
      }
    } catch (error) {
      alert((error as ErrorType).detail);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a747c]">
      <div className="flex flex-col items-center w-[340px] bg-white rounded-md py-[3%] px-[1.5%]">
        <span className="text-4xl mb-[10%] text-[#0a747c] font-dancing">Cadastre-se</span>
        <form className="flex flex-col items-center justify-center w-full" onSubmit={handleRegister}>
          <label className={labelStyle} htmlFor="name">Nome</label>
          <input
            className={inputStyle}
            placeholder="Nome completo"
            type="text"
            id="name"
            name="name"
            pattern="\S.*"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className={labelStyle} htmlFor="email">Email</label>
          <input
            className={inputStyle}
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={labelStyle} htmlFor="password">Senha</label>
          <input
            className={inputStyle}
            placeholder="Senha"
            type="password"
            id="password"
            name="password"
            pattern="\S.*"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="rounded-sm mt-[5%] text-[#0a747c] p-[10px] cursor-pointer text-[1em] w-[70%] border
               border-[#0a747c] text-[1em] hover:bg-[#0a747c] hover:text-white"
            type="submit">Cadastrar</button>
          <p className="mt-[3%] opacity-75">
            Já tem uma conta? <Link className="text-[#0a747c] hover:text-[#0a747cab]" to="/login">Conecte-se</Link>
          </p>
        </form>
      </div>
      <div className="absolute bottom-0">
        <Footer color="white"/>
      </div>
    </div>
  );
};

export default Register;
