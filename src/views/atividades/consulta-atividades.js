import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './atividadesTable'
import LancamentoService from '../../app/service/atividadeService'
import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import AtividadesTable from './atividadesTable'



class ConsultaAtividades extends React.Component {

    state = {
        dataEntrega:'',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        atividades : []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if(!this.state.descricao){
            messages.mensagemErro('O preenchimento do campo Descrição é obrigatório.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const atividadeFiltro = {
            dataEntrega:this.state.dataEntrega,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(atividadeFiltro)
            .then( resposta => {
                const lista = resposta.data;
                
                if(lista.length < 1){
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                this.setState({ atividades: lista })
            }).catch( error => {
                console.log(error)
            })
    }


    abrirConfirmacao = (atividade) => {
        this.setState({ showConfirmDialog : true, atividadeDeletar: atividade  })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, atividadeDeletar: {}  })
    }

    deletar = () => {
        this.service
            .deletar(this.state.atividadeDeletar.id)
            .then(response => {
                const atividades = this.state.atividades;
                const index = atividades.indexOf(this.state.atividadeDeletar)
                atividades.splice(index, 1);
                this.setState( { atividades: atividades, showConfirmDialog: false } )
                messages.mensagemSucesso('Lançamento deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-atividades')
    }


    render(){
 

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} 
                        className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="Consultar Atividades">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputDataEntrega" label="Data: *">
                                <input type="date" 
                                       className="form-control" 
                                       id="inputDataEntrega" 
                                       value={this.state.ano}
                                       onChange={e => this.setState({ano: e.target.value})}
                                       placeholder="Digite a Data" />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: ">
                                <input type="text" 
                                       className="form-control" 
                                       id="inputDesc" 
                                       value={this.state.descricao}
                                       onChange={e => this.setState({descricao: e.target.value})}
                                       placeholder="Digite a descrição" />
                            </FormGroup>

                            
                            <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={this.preparaFormularioCadastro} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Cadastrar
                            </button>

                        </div>
                        
                    </div>
                </div>   
                <br/ >
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <AtividadesTable  atividades={this.state.atividades} 
                                              deleteAction={this.abrirConfirmacao}/>
                        </div>
                    </div>  
                </div> 
                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialog} 
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter} 
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão desta Atividade?
                    </Dialog>
                </div>           
            </Card>

        )
    }
}

export default withRouter(ConsultaAtividades);