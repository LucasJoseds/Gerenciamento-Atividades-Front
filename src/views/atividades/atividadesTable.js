import React from 'react'
import dateFormat from 'dateformat'


export default props => {

    const rows = props.atividades.map( atividade => {
        return (
            <tr key={atividade.id}>
                <td>{atividade.descricao}</td>
                <td>{dateFormat(atividade.dataEntrega, 'dd/mm/yyyy') }</td>
                <td>
                   
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(atividade)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Data de Entrega</th>          
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

