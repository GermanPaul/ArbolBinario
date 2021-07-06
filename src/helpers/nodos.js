class Nodos {
    constructor(res, arbol, Nodo) {
        this.res = res;
        this.arbol = arbol;
        this.Nodo = Nodo;
    }

    async buscarNodo(indice, valor) {
        try {
            const arbolFiltrado = this.arbol.filter(nodo => nodo.indice == indice);
            if (valor < arbolFiltrado[0].valor) {
                const nodoIzquierdo = 2 * indice + 1;
                const arbolNodoIzquierdo = this.arbol.filter(nodo => nodo.indice == nodoIzquierdo);
                if (arbolNodoIzquierdo[0] == undefined) {
                    const nodo = new this.Nodo({ 'indice': nodoIzquierdo, valor });
                    await nodo.save();
                    this.res.json({ status: 'ok', indice: nodoIzquierdo, mensaje: `Nodo guardado en el índice: ${nodoIzquierdo}.` });
                    return;
                } else {
                    return this.buscarNodo(nodoIzquierdo, valor);
                }
            } else if (valor > arbolFiltrado[0].valor) {
                const nodoDerecho = 2 * indice + 2;
                const arbolNodoDerecha = this.arbol.filter(nodo => nodo.indice == nodoDerecho);
                if (arbolNodoDerecha[0] == undefined) {
                    const nodo = new this.Nodo({ 'indice': nodoDerecho, valor });
                    await nodo.save();
                    this.res.json({ status: 'ok', indice: nodoDerecho, mensaje: `Nodo guardado en el índice: ${nodoDerecho}.` });
                    return;
                } else {
                    return this.buscarNodo(nodoDerecho, valor);
                };
            } else {
                this.res.json({ status: 'error', mensaje: `El nodo con valor ${valor} ya existe.` });
                return;
            };
        } catch (e) {
            this.res.json({ status: 'error', mensaje: e });
            return;
        }
    }

    async encontrarNodoPadre(valor1, valor2) {
        try {
            const Nodo1 = this.arbol.filter(nodo => nodo.valor == valor1);
            const Nodo2 = this.arbol.filter(nodo => nodo.valor == valor2);
            if (Nodo1[0] == undefined | Nodo2[0] == undefined) {
                this.res.json({ status: 'error', mensaje: 'Al menos uno de los valores recibidos no existe en el arbol.' });
            } else {
                const indice1 = Nodo1[0].indice, indice2 = Nodo2[0].indice;
                if (indice1 == 0 | indice2 == 0) {
                    this.res.json({ status: 'ok', ancestro: this.arbol[0].valor, mensaje: `El ancestro común mas cercano entre ${valor1} y ${valor2} es ${this.arbol[0].valor}.` });
                } else {
                    var camino1 = new Array(), camino2 = new Array(), ancestroComun = new Array();
                    camino1[0] = indice1, camino2[0] = indice2, ancestroComun[0] = 0;
                    var i = indice1, j = 0;
                    while (i != 0) {
                        i = Math.floor((i - 1) / 2);
                        camino1[j + 1] = i;
                        j++;
                    };
                    i = indice2, j = 0;
                    while (i != 0) {
                        i = Math.floor((i - 1) / 2);
                        camino2[j + 1] = i;
                        j++;
                    };
                    for (let k = 0; k < camino1.length; k++) {
                        ancestroComun = camino2.filter(coincidencia => coincidencia == camino1[k]);
                        if (ancestroComun[0] != undefined) {
                            const nodoAncestroComun = this.arbol.filter(nodo => nodo.indice == ancestroComun[0]);
                            this.res.json({ status: 'ok', ancestro: nodoAncestroComun[0].valor, mensaje: `El ancestro común mas cercano entre ${valor1} y ${valor2} es ${nodoAncestroComun[0].valor}.` });
                            break;
                        };
                    };
                };
            };
        } catch (e) {
            this.res.json({ status: 'error', mensaje: e });
            return;
        }
    }
};

module.exports = Nodos;