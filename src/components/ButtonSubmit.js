
export default function ButtonSubmit({text, disabled}){
    return(
        <button disabled={disabled} type="submit">{text}</button>
    )
}