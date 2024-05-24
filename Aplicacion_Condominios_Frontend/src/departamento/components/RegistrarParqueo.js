import React, { Component } from "react";
import axios from "axios";
import { Button, FormGroup, Label, Input, FormFeedback, Row, Col, Table, Container } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "./customs.css";
import ModalCon from "./ModalConfirm";
import ModalPar from "./ModalParqueo";

const endpoint = "http://localhost:8000/api";

class RegistrarParqueo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre_parqueo: "",
            departamentos: [],
            departamento_seleccionado: '',
            modal_open: false,
            errors: {},
            validationErrors: {},
            parqueos: [],
            estadoModal: false,
            estadoModalPar: false,
            idParqueo: '',

        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${endpoint}/departamentos`);
            this.setState({ departamentos: response.data }); //luego puedo usar una llamada mas amigable a la API
            const responseParqueos = await axios.get(`${endpoint}/parqueos`);
            let parqueos = responseParqueos.data;
            parqueos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            parqueos = parqueos.map(parqueo => {
                const departamento = this.state.departamentos.find(departamento => departamento.id === parqueo.departamento_id);
                return { ...parqueo, nombreDepa: departamento.id ? departamento.nombre_departamento : 'N/A' };
            });
            this.setState({ parqueos: parqueos });
        } catch (error) {
            console.error(error);
        }
    }
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSelect = (event) => {
        this.setState({ departamento_seleccionado: event.target.value });
    }

    handleConfirm = (e) => {
        this.validacion();
        if (Object.keys(this.state.validationErrors).length === 0) {
            this.handleModal();
            this.storeParqueo(e);
        } else {
            console.log("Formulario invalido");
            this.handleModal();
        }
    }

    validacion = () => {
        let nombre_parqueo = this.state.nombre_parqueo;
        let departamento_seleccionado = this.state.departamento_seleccionado;
        let validationErrors = {};
        if (!nombre_parqueo.trim()) {
            validationErrors.nombre_parqueo = "Este campo es obligatorio";
        } else if (!/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú0-9\s-]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre_parqueo)) {
            validationErrors.nombre_parqueo = "El nombre del parqueo debe contener solo letras y numeros.";
        }
        if (!departamento_seleccionado.trim()) {
            validationErrors.departamento_seleccionado = "Este campo es obligatorio";
        }
        this.setState({ errors: validationErrors });
    }
    
    storeParqueo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${endpoint}/parqueo`, {
                nombre_parqueo: this.state.nombre_parqueo,
                departamento_id: this.state.departamento_seleccionado
            });
            window.location.reload();
            console.log(response);

        } catch (error) {
            console.error(error);
        }
    }

    handleModal = () => {
        this.setState({ estadoModal: !this.state.estadoModal });
    }
    handleModalPar = () => {
        this.setState({ modal_open: !this.state.modal_open });
    }
    deleteParqueo = async (id) => {
        await axios.delete(`${endpoint}/parqueo/${id}`);
        window.location.reload();
    }
    confirmDelete = () => {
        this.deleteParqueo(this.state.idParqueo);
        this.handleModalConfPar();
    }    
    handleModalConfPar = () => {
        this.setState({ estadoModalPar: !this.state.estadoModalPar });
    }
    setIdParqueo = (id) => {
        this.setState({ idParqueo: id });
    }
    updateParqueo = async (parqueo) => {
        try {
            await axios.put(`${endpoint}/parqueoupd/${parqueo.id}`, {
                nombre_parqueo: parqueo.nombre_parqueo,
                departamento_id: parqueo.departamento_id
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    manejoEnvio = (parqueo) => {
        this.updateParqueo(parqueo);
        this.handleModalPar();
    }

    render() {
        return (
            <>
                <ModalCon isOpen={this.state.estadoModal} toggle={this.handleModal} confirm={this.handleConfirm} message="¿Está seguro que desea crear un parqueo?" />
                <ModalCon isOpen={this.state.estadoModalPar} toggle={this.handleModalConfPar} confirm={this.confirmDelete} message="¿Está seguro que desea eliminar el parqueo?" />
                
                <ModalPar isOpen={this.state.modal_open} onSubmit={this.manejoEnvio} toggle={this.handleModalPar} idParqueo={this.state.idParqueo} parqueos={this.state.parqueos} departamentos={this.state.departamentos} />
                <Row>
                    <Label className="text-center mb-4 titulosForms">Registrar Parqueo</Label>
                </Row>
                <Container>
                    <Row>
                        <Col>
                            <Row >
                                <Col sm={4}>
                                    <FormGroup>
                                        <Label className="label-custom" for="nombre_parqueo">Nombre</Label>
                                        <Input className="customInput" type="text" name="nombre_parqueo" id="nombre_parqueo" placeholder="Ingrese el nombre del parqueo" onChange={this.handleInput} invalid={this.state.errors.nombre_parqueo ? true : false} />
                                        <FormFeedback>{this.state.errors.nombre_parqueo}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col sm={5}>
                                    <FormGroup>
                                        <Label className="label-custom" for="departamento_seleccionado">Departamento</Label>
                                        <Input className="customInput" type="select" name="departamento_seleccionado" id="departamento_seleccionado" onChange={this.handleSelect} invalid={this.state.errors.departamento_seleccionado ? true : false } value={this.state.departamento_seleccionado}>
                                            <option disabled value=''>Seleccione un departamento</option>
                                            {this.state.departamentos.map((departamento) => (
                                                <option key={departamento.id} value={departamento.id}>{departamento.nombre_departamento}</option>
                                            ))}
                                        </Input>
                                        <FormFeedback>{this.state.errors.departamento_seleccionado}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col style={{ marginTop: "22px" }} sm={3}>
                                    <Button size="md" type="button" className="custom-button "
                                        style={{ fontWeight: 'bold' }}
                                        onClick={this.handleModal}>
                                        Registrar Parqueo
                                    </Button>
                                </Col>
                            </Row>
                            <Table striped bordered responsive className="mt-4">
                                <thead className="text-center">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Departamento</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="visitasTabla">
                                    {this.state.parqueos.map((parqueo) => (
                                        <tr key={parqueo.id}>
                                            <td className="celdaVisita">{parqueo.nombre_parqueo}</td>
                                            <td className="celdaVisita">{parqueo.nombreDepa}</td>
                                            <td>
                                                <Row className="w-100">
                                                    <Col className="d-flex justify-content-end" >
                                                        <div onClick={(e) => { e.stopPropagation(); this.setIdParqueo(parqueo.id) ; this.handleModalPar() }} > <FontAwesomeIcon icon={faEdit} className="iconVisita" /> </div>
                                                    </Col>
                                                    <Col >
                                                        <div onClick={(e) => { e.stopPropagation(); this.setIdParqueo(parqueo.id);  this.handleModalConfPar(); }} > <FontAwesomeIcon icon={faTrashAlt} className="iconVisita" /> </div>

                                                    </Col>
                                                </Row>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
export default RegistrarParqueo;