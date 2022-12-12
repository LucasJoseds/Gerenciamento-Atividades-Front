import { Dialog } from "primereact/dialog";
import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import * as messages from '../components/toastr'
import { Button } from "primereact/button";
import UsuarioService from "../app/service/usuarioService";
import UsuarioTable from "./usuarioTable";


class ConsultaUsuarios extends React.Component {

    state = {
        nome: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        usuarios : []
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    buscar = () => {
        if (!this.state.nome) {
            messages.mensagemErro('O preenchimento do campo Nome é obrigatório.')
            return false;
        }
        const usuarioFiltro = {
            nome: this.state.nome
        }

        this.service
            .consultar(usuarioFiltro)
            .then(resposta => {
                const lista = resposta.data;

                if (lista.length < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                this.setState({ usuarios: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/editar-usuarios/${id}`)
    }

    abrirConfirmacao = (usuario) => {
        this.setState({ showConfirmDialog: true, usuarioDeletar: usuario })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, usuarioDeletar: {} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.usuarioDeletar.id)
            .then(response => {
                const usuarios = this.state.usuarios;
                const index = usuarios.indexOf(this.state.usuarioDeletar)
                usuarios.splice(index, 1);
                this.setState({ usuarios: usuarios, showConfirmDialog: false })
                messages.mensagemSucesso('Usuário deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Usuário')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-usuarios')
    }
    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao}
                    className="p-button-secondary" />
            </div>
        );


        return (

            <Card title="Consultar Usuários">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputNome" label="Nome: *">
                                <input type="nome"
                                    className="form-control"
                                    id="inputNome"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    placeholder="Digite o Nome" />
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
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <UsuarioTable   users={this.state.usuarios}
                                            deleteAction={this.abrirConfirmacao}
                                            editAction={this.editar} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        Confirma a exclusão deste Usuário?
                    </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaUsuarios);