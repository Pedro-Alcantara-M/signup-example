import "./App.css";
import { useState, ChangeEvent, FormEvent } from "react";
import Logo from "./assets/logo.png";
import api from "./service/api";

interface IBody {
  username: string;
  email: string;
  password: string;
}

const App = () => {
  const [body, setBody] = useState<IBody>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (body.password !== "" && body.password !== confirmPassword) {
      return alert("Passwords doesn't match");
    }

   api.post("/singUp", body, {
   }).then((response) => {
      if(response.statusText === "OK"){
        setBody({
          username: "",
          email: "",
          password: "",
        })
        setConfirmPassword("")
        return  alert(`Success: Sign up succeed`)
      }
     
    }).catch((error) => {
      console.log(error)
      alert(`Sign UP error ${error}`)
    });

  
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setBody((state: IBody) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="box-glass">
        <img src={Logo} alt="Logo" width={200} />
        <h3>Sign Up</h3>
        <form onSubmit={signUp}>
          <input
            className="input"
            value={body.username}
            name="username"
            placeholder="Nome do usuário"
            onChange={handleChange}
          />
          <input
            className="input"
            value={body.email}
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="input"
            value={body.password}
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
          />
          <input
            className="input"
            type="password"
            value={confirmPassword}
            placeholder="Confirmar senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
