
interface Props {
    children: React.ReactNode;
    type: string,
    required?: boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export default function Input({children, type, required, onChange, value} : Props) {
    return (
        <div className="text-start w-[400px] h-[87] flex flex-col gap-1">
            <label>{ children }</label>
            <input type={type} value={value} required={required} onChange={onChange} className="h-14 border rounded-xl border-zinc-400 ring-1 ring-zinc-400" />
        </div>
    )
}
