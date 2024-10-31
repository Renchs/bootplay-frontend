import { Link } from "react-router-dom";
import Container from "../../components/container";


export default function Home() {
    return (
        <Container styles="items-start backdrop-brightness-50">
            <section className="container flex flex-col items-start w-[701px] h-[426px] gap-8 mx-24">
                <h1 className="font-semibold text-6xl leading-[78px] text-white">A história da música não pode ser esquecida!</h1>
                <p className="leading-9 text-2xl text-white">Crie já sua conta e curta os sucessos que marcaram os tempos do Vinil.</p>
                <Link to={"/signup"} className="w-[269px] h-16 bg-sky-300 flex items-center justify-center rounded-[32px] font-semibold text-xl leading-6">Inscrever-se</Link>
            </section>
        </Container>
    )
}

