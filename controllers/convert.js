import debug from "debug";

const log = debug(`currency_converter:controller:convert`);

export default function convert(req, res, next) {
    log(req.params);
    log(req.body);
    res.status = 200;
    res.json({path: "convert controller"});
}

//Deve pegar o id do usuario, moeda base, valor, e converter entre [BRL, EUR, JPY, USS]
//Devolver um objeto contendo id trans, iduser, moeda origem, moeda destino, valor e taxa da moeda de origem