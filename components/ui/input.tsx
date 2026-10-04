type InputProps = {
    name: string;
    type: "email" | "password";
    autoComplete: string;
    required?: boolean;
    minLength?: number;
};

export function Input({ name, type, autoComplete, required, minLength }: InputProps) {
    return <input className="field" name={name} type={type} autoComplete={autoComplete} required={required} minLength={minLength} />;
}
