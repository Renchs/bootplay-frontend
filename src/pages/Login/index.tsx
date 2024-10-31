import { FormEvent, useState } from "react"
import Input from "../../components/input";
import Container from "../../components/container";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import toast from "react-hot-toast";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isAuthenticated } = useAuth();

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            toast.error("Ocorreu um erro ao efetuar o login")
        }
    }

    return (
        <>
            {isAuthenticated && <Navigate to="/dashboard" />}
            <Container styles="backdrop-blur-sm backdrop-brightness-50 items-center">
                <section className="container bg-white w-[544px] h-[522px] rounded-3xl flex flex-col items-center justify-center gap-8">
                    <div className="flex items-center flex-col gap-4">
                        <img src="/src/assets/logo_modal.svg" alt="Ícone de usuário" />
                        <h3 className="font-medium leading-10 text-3xl">Acessar sua conta</h3>
                    </div>
                    <form className="flex flex-col container items-center justify-center gap-3" onSubmit={handleLogin}>
                        <Input type="email" required value={email} onChange={e => setEmail(e.target.value)}>Email:</Input>
                        <Input type="password" required value={password} onChange={e => setPassword(e.target.value)}>Senha:</Input>
                        <button type="submit" className="w-[400px] h-16 bg-black text-white rounded-[40px] text-xl leading-8">Entrar</button>
                    </form>
                    <div className="flex gap-1">
                        <p className="text-base leading-6 font-normal">Ainda não tem uma conta ?</p>
                        <Link to="/signup" className="underline font-bold">Inscrever-se</Link>
                    </div>
                </section>
            </Container>
        </>
    )
}
