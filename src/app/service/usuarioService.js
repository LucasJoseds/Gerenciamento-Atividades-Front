import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService {

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }


    salvar(usuario){
        return this.post('/cadastrar', usuario);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }


    consultar(usuarioFiltro){
        let params = `?nome=${usuarioFiltro.nome}`

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    atualizar(usuario){
        return this.put(`/${usuario.id}`, usuario);
    }


    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.')
        }

        if(!usuario.email){
            erros.push('O campo Email é obrigatório.')
        }else if( !usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            erros.push('Informe um Email válido.')
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x.')
        }else if( usuario.senha !== usuario.senhaRepeticao ){
            erros.push('As senhas não batem.')
        }        

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;