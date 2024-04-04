function Botao(prop : any) {
    return (
        <button className={"btn " + prop.classBtn}> {prop.nomeBotao} </button>
    )
}

export default Botao