import React, { Component } from 'react';

import urlApi from '../../services/urlApi';

class EditarProntuario extends Component {
    constructor() {
        super();

        this.state = {
            descricao: "",
            mensagem: ""
        }
    }

    //pega a descricao digitada
    atualizarDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    //metodo atualiza descricao do prontuario
    incluirDescricao(event) {
        event.preventDefault();

        var idDescricao = event.target.getAttribute("consulta-id")

        let item = {
            id: idDescricao,
            descricao: this.state.descricao
        }

        fetch(`${urlApi}AlterarDescricaoConsulta`, {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta);
    }

    render() {
        return (
            <div>
                <form
                    className="consultas__consulta--item-infos-desc consultas__consulta--item-infos-desc-displaynone"
                    consulta-id={this.props.idConsulta}
                    onSubmit={this.incluirDescricao.bind(this)}
                >
                    <textarea
                        className="consultas__consulta--item-input-desc"
                        placeholder="Coloque a nova descrição"
                        value={this.state.descricao}
                        onChange={this.atualizarDescricao.bind(this)}
                    />

                    <button type="submit" className="style__button--blue">Alterar Descrição</button>
                </form>
            </div>
        )
    }
}

export default EditarProntuario;
