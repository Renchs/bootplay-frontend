import { FormEvent, useState } from "react";
import Container from "../../components/container";
import Input from "../../components/input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user_api } from "../../services/apiService";
import { useAuth } from "@/hooks/UseAuth";
import toast from "react-hot-toast";

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    async function hangleSignup(event: FormEvent) {
        event?.preventDefault();
        try {
            await user_api.post("/users/create", { name: name, email: email, password: password })
            console.log("cadastro feito com sucesso");
            navigate("/login");    
        } catch (error) {
            toast.error("Ocorreu um erro ao tentar se registrar, tente novamente mais tarde")
            
        }
    }
    
    return (
        <>
            {isAuthenticated && <Navigate to="/dashboard" />}
            <Container styles="backdrop-blur-sm backdrop-brightness-50 items-center">
                <section className="container bg-white w-[544px] h-[623px] rounded-3xl flex flex-col items-center justify-center gap-8">
                    <div className="container flex flex-col-reverse gap-1">
                        <div className="flex items-center flex-col gap-4">
                            <img src="/src/assets/logo_modal.svg" alt="" />
                            <h3 className="font-medium leading-10 text-3xl">Criar conta</h3>
                        </div>
                        <Link to="/"><img src="/src/assets/Cancel Icon.svg" alt="" className="h-10 ml-[474px]"/></Link>
                    </div>
                    <form className="flex flex-col container items-center justify-center gap-3" onSubmit={hangleSignup}>
                        <Input type="text" required onChange={e => setName(e.target.value)}>Nome Completo</Input>
                        <Input type="email" required onChange={e => setEmail(e.target.value)}>Email</Input>
                        <Input type="password" required onChange={e => setPassword(e.target.value)}>Password</Input>
                        <button type="submit" className="w-[400px] h-16 bg-black text-white rounded-[40px] text-xl leading-8">Criar conta</button>
                    </form>
                    <div className="flex gap-1">
                        <p className="text-base leading-6 font-normal">Já tem uma conta ?</p>
                        <Link to="/login" className="underline font-bold">Entrar</Link>
                    </div>
                </section>
            </Container>
        </>
    )
}
