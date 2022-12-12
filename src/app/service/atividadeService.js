import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

export default class LancamentoService extends ApiService {

    constructor(){
        super('/api/atividades')
    }


    obterPorId(id){
        return this.get(`/${id}`);
    }


    validar(atividade){
        const erros = [];

        if(!atividade.descricao){
            erros.push("Informe a Descrição.")
        }

        if(!atividade.dataEntrega){
            erros.push("Informe a Data de Entrega.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(atividade){
        return this.post('/cadastrar', atividade);
    }

  

    consultar(lancamentoFiltro){
        let params = `?data=${lancamentoFiltro.dataEntrega}`

        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }
      

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}