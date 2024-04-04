function InputForm(prop : any) {
    return (
        <input className="inputForm" type={prop.tipoInput} placeholder={prop.nomeCampo}/>
    )
}

export default InputForm