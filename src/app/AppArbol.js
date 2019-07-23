import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            numeroAdd:'',
            nodoA1:'',
            nodoA2:'',
            mensaje:'Bienvenido.',
            arbol: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addNodo = this.addNodo.bind(this);
        this.getAncestro = this.getAncestro.bind(this);
        this.borrarArbol = this.borrarArbol.bind(this);
    };

    componentDidMount() {
        this.fetchArbol();
    };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    addNodo(e){
        e.preventDefault();
        // console.log("enviando...");
        fetch(`/arbolbinario/add`, {
            method: 'POST',
            body: JSON.stringify({
                valor: this.state.numeroAdd
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            this.setState({numeroAdd: '', mensaje: data.mensaje});
            this.fetchArbol();
        })
        .catch(err => {
            console.error(err);
        });
    };

    getAncestro(e){
        e.preventDefault();
        fetch(`/arbolbinario/ancestor/${this.state.nodoA1}/${this.state.nodoA2}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            this.setState({mensaje: data.mensaje});
        })
        .catch(err => {
            console.error(err);
        });
    };

    fetchArbol() {
        fetch('/arbolbinario')
        .then(res => res.json())
        .then(data => {
            this.setState({arbol: data});
            // console.log(this.state.arbol);
        });
    };

    borrarArbol(e) {
        e.preventDefault();
        fetch('/arbolbinario',{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({mensaje: data.mensaje});
            this.fetchArbol();
        });
    };

    render() {
        var arbolArreglo = ["","","","","","","","","","","","","","",""];
        this.state.arbol.map((nodo)=>{
            if (nodo.indice<15){
                arbolArreglo[nodo.indice]=nodo.valor;
            };
        });
        return (
            <div>
                <div id="header">
                    ÁRBOL BINARIO DE BÚSQUEDA
                </div>
                <div className="row" id="mensajeA">
                    <div id="mensajeB">
                        <div id="mensaje">
                            {this.state.mensaje}
                        </div>            
                    </div>
                </div>
                <div className="row" id="paneles">
                    <div className="panel">
                        <div className="panelA1">
                            <form onSubmit={this.addNodo}>
                                <input required name="numeroAdd" onChange={this.handleChange} value={this.state.numeroAdd} id="inputAgregar" type="text" placeholder="Introduzca un número" />
                                <button id="buttonAgregar" type="submit">Agregar Nodo</button>
                            </form>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panelA1">
                            <form onSubmit={this.getAncestro}>
                                <div id="panelB1">
                                    <input required name="nodoA1" onChange={this.handleChange} value={this.state.nodoA1} type="text" id="inputNodo1" placeholder="Introduzca Nodo #1" />
                                    <input required name="nodoA2" onChange={this.handleChange} value={this.state.nodoA2} type="text" id="inputNodo2" placeholder="Introduzca Nodo #2" />
                                </div>
                                <button id="buttonAncestro" type="submit">Obtener Ancestro Común</button>
                            </form>
                        </div>
                    </div>
                    <div className="panel">
                        <div id="panelA2">
                            <form onSubmit={this.borrarArbol} style={{height: "100%"}}>
                                <button id="buttonReiniciar" type="submit">Reiniciar Árbol</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row" id="arbol">
                    <div id="arbolMensaje">A continuación se muestran los cuatro primeros niveles del árbol.</div>
                    <div id="arbolA">
                        <div id="arbolB">
                            <table>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td id="td0">{arbolArreglo[0]}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td id="td1">{arbolArreglo[1]}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td id="td2">{arbolArreglo[2]}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td id="td3">{arbolArreglo[3]}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td id="td4">{arbolArreglo[4]}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td id="td5">{arbolArreglo[5]}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td id="td6">{arbolArreglo[6]}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td id="td7">{arbolArreglo[7]}</td>
                                        <td></td>
                                        <td id="td8">{arbolArreglo[8]}</td>
                                        <td></td>
                                        <td id="td9">{arbolArreglo[9]}</td>
                                        <td></td>
                                        <td id="td10">{arbolArreglo[10]}</td>
                                        <td></td>
                                        <td id="td11">{arbolArreglo[11]}</td>
                                        <td></td>
                                        <td id="td12">{arbolArreglo[12]}</td>
                                        <td></td>
                                        <td id="td13">{arbolArreglo[13]}</td>
                                        <td></td>
                                        <td id="td14">{arbolArreglo[14]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>            
                    </div>
                </div>
            </div>
        );
    };
};

export default App;