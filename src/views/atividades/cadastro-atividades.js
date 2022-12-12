import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { Calendar } from 'primereact/calendar';

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import AtividadeService from '../../app/service/atividadeService'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroAtividades extends React.Component {

    state = {
        id: null,
        descricao: '',
        dataEntrega:'',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new AtividadeService();
    }

   c

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, dataEntrega } = this.state;
        const atividade = { descricao, dataEntrega, usuario: usuarioLogado.id };

        try{
            this.service.validar(atividade)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }     

        this.service
            .salvar(atividade)
            .then(response => {
                this.props.history.push('/consulta-atividades')
                messages.mensagemSucesso('Atividade cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;

        const lancamento = { descricao, valor, mes, ano, tipo, usuario, status, id };
        
        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-atividades')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    render(){
    
        return (
            <Card title={ this.state.atualizando ? 'Atualização de Atividades'  : 'Cadastro de Atvidades' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *" >
                            <input id="inputDescricao" type="text" 
                                   className="form-control" 
                                   name="descricao"
                                   value={this.state.descricao}
                                   onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <FormGroup id="inputDataEntrega" label="Data de Entrega: *" >
                            <input id="inputDataEntrega" type="date" 
                                   className="form-control" 
                                   name="dataEntrega"
                                   value={this.state.dataEntrega}
                                   onChange={this.handleChange}  />
                        </FormGroup>
          
                    </div>
                </div>
                <div className="row">
                     <div className="col-md-6" >
                        { this.state.atualizando ? 
                            (
                                <button onClick={this.atualizar} 
                                        className="btn btn-success">
                                        <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button onClick={this.submit} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consulta-atividades')} 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroAtividades);