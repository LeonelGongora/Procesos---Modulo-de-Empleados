import React, { useEffect, useState } from "react";
import axios from "axios";
import './customs.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardBody, Row, Col, Container, Label, CardText, Input, InputGroup } from 'reactstrap';


const endpoint = 'http://localhost:8000/api';
const endpointImg = 'http://localhost:8000';

const MostrarResidentes = () => {
    const [residentes, setResidentes] = useState([]);
    const [contratos, setContratos] = useState({});
    const [departamentos, setDepartamentos] = useState({});
    const [edificios, setEdificios] = useState({});
    const [bloques, setBloques] = useState({});
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = async () => {
        try {
            const responseContratos = await axios.get(`${endpoint}/contratosVigentes`);
            const contratosData = responseContratos.data.contratos.reduce((acc, contrato) => {
                acc[contrato.id] = contrato;
                return acc;
            }, {});
            setContratos(contratosData);

            const responseDepartamentos = await axios.get(`${endpoint}/departamentos`);
            const departamentosData = responseDepartamentos.data.reduce((acc, departamento) => {
                acc[departamento.id] = departamento;
                return acc;
            }, {});
            setDepartamentos(departamentosData);

            const responseEdificios = await axios.get(`${endpoint}/edificios`);
            const edificiosData = responseEdificios.data.reduce((acc, edificio) => {
                acc[edificio.id] = edificio;
                return acc;
            }, {});
            setEdificios(edificiosData);

            const responseBloques = await axios.get(`${endpoint}/bloques`);
            const bloquesData = responseBloques.data.reduce((acc, bloque) => {
                acc[bloque.id] = bloque;
                return acc;
            }, {});
            setBloques(bloquesData);

            const responseResidentes = await axios.get(`${endpoint}/residentes`);
            setResidentes(responseResidentes.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
    const manejarCambio = (e) => {
        setBusqueda(e.target.value);
    }

    return (
        <>
            <Container>
                <Row >
                    <Label className="text-center mb-4 titulosForms">Residentes</Label>
                    <InputGroup className="mb-4">
                        <Input placeholder="Buscar residente..." onChange={manejarCambio}
                            style={{
                                borderRadius: "15px",
                                border: "1px solid rgba(0, 0, 0, 0.3)",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                            }}
                        />
                    </InputGroup>
                    {residentes.filter(residente => {
                        if (busqueda === "") {
                            return residente;
                        } else if (residente.nombre_residente.toLowerCase().includes(busqueda.toLowerCase()) || residente.apellidos_residente.toLowerCase().includes(busqueda.toLowerCase()) || residente.cedula_residente.toLowerCase().includes(busqueda.toLowerCase())) {
                            return residente;
                        }
                        return false;
                    }).map((residente) => {
                            let contrato = contratos[residente.contrato_id];
                            let departamento = "Niguno";
                            let edificio = "Niguno";
                            let bloque = "Niguno";
                        if(typeof contrato !== 'undefined'){
                            departamento = departamentos[contrato.departamento_id];
                            edificio = edificios[departamento.edificio_id];
                            bloque = bloques[edificio.bloque_id];
                        }
                        return (
                            <Col className= "d-flex align-items-stretch" sm={12} md={6} lg={4} xl={3} key={residente.id}>
                                <Card className="mt-3 mb-3 cardRes">
                                    <CardImg
                                        className="cardImgResidente"
                                        alt="Card image cap"
                                        src={`${endpointImg}/${residente.imagen_residente}`}
                                        top
                                    />
                                    <CardBody >
                                        <CardText>
                                            <Row >
                                                <Col sm={12} md={6} lg={6}>
                                                    <Label className="labelResidente">{residente.nombre_residente} {residente.apellidos_residente}</Label>

                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <Label className="labelResidente"> DNI: {residente.cedula_residente}</Label>

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label className="labelResidenteDep"> {bloque?.nombre_bloque || 'Ninguno'}</Label>
                                                <Label className="labelResidenteDep"> Edificio: {edificio?.nombre_edificio || 'Ninguno'}</Label>
                                                <Label className="labelResidenteDep"> Departamento: {departamento?.nombre_departamento || 'Ninguno'}</Label>
                                                <Label className="labelResidenteTel"> Celular: {residente.telefono_residente}</Label>
                                                <Label className="labelResidente"> Tipo: {residente.tipo_residente}</Label>
                                            </Row>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    )
}

export default MostrarResidentes;
