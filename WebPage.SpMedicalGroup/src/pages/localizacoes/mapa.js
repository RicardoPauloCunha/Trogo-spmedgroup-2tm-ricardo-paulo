import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import firebase from '../../services/firebaseConfig';
import '../../assets/css/style.css';

class Mapa extends Component {
    constructor() {
        super();

        this.state = {
            listaLocalizacoes: []
        }
    }

    componentDidMount() {
        this.listarLocalizacoesRealTime();
    }

    listarLocalizacoesRealTime() {
        firebase.firestore().collection("Enderecos")
            .onSnapshot((localizacoes) => {
                let localArray = [];

                localizacoes.forEach((local) => {
                    localArray.push({
                        id: local.id,
                        especialidadeMed: local.data().EspecialidadeMedico,
                        descricao: local.data().Descricao,
                        idadePac: local.data().IdadePaciente,
                        latitude: local.data().Latitude,
                        longitude: local.data().Longitude
                    })
                });

                this.setState({ listaLocalizacoes: localArray });
            });
    }


    render() {
        return (
            <div className="map">
                <Map
                    google={this.props.google}
                    initialCenter={{
                        lat: -23.5345442,
                        lng: -46.6493879
                    }}
                    style={{ width: '90%', height: '90%', margin: "auto", position: "relative" }}
                    zoom={14}
                >
                    {this.state.listaLocalizacoes.map((localizacao) => {
                        return (<Marker
                            key={localizacao.id}
                            title={`Descrição do caso: ${localizacao.descricao}, Especialidade do Médico que realizou a consulta: ${localizacao.especialidadeMed}`}
                            position={{ lat: localizacao.latitude, lng: localizacao.longitude }}
                        />)
                    })}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAxUjkdg2IgukwkZLICUxtt6n01b2m4Ud4")
})(Mapa);