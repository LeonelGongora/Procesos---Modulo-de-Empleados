import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, CardImg, Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalConfirm from "./ModalConfirm";
import "./customs.css";

const endpoint = "http://localhost:8000/api";
class CrearEdificio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre_edificio: "",
            descripcion_edificio: "",
            imagen_edif: "",
            imagen_edificio: null,
            cantidad_pisos: 0,
            bloques: [],
            bloque_seleccionado: '',
            modal_open: false,
            errors: {},

        }
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`${endpoint}/bloques`);
            this.setState({ bloques: response.data });
        } catch (error) {
            console.error(error);
        }
    }
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSelect = (event) => {
        this.setState({ bloque_seleccionado: event.target.value });
    }
    toggleModal = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    }
    handleChange = (event) => {
        this.setState({ imagen_edif: event.target.files[0] });
        if(event.target.name === "imagen_edificio"){
            this.setState({ imagen_edificio: URL.createObjectURL(event.target.files[0]) });
        }
    }
    handleConfirm = (e) => {
        if (this.validacion()) {
            this.storeEdificio(e);
            this.toggleModal();
        } else {
            console.log("Formulario invalido");
        }
    }
    validacion = () => {
        let nombre_edificio = this.state.nombre_edificio;
        let descripcion_edificio = this.state.descripcion_edificio;
        let imagen_edif = this.state.imagen_edif;
        let cantidad_pisos = this.state.cantidad_pisos;
        let bloque_seleccionado = this.state.bloque_seleccionado;
        let validationErrors = {};
        let isValid = true;
        if (!nombre_edificio.trim()) {
            isValid = false;
            validationErrors.nombre_edificio = "Por favor ingrese el nombre del edificio.";
        }else if( !/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre_edificio) ){
            isValid = false;
            validationErrors.nombre_edificio = "El nombre del edificio debe contener solo letras y numeros.";
        }
        if (!descripcion_edificio.trim()) {
            isValid = false;
            validationErrors.descripcion_edificio = "Por favor ingrese la descripcion del edificio.";
        }else if( !/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(descripcion_edificio) ){
            isValid = false;
            validationErrors.descripcion_edificio = "La descripcion del edificio debe contener solo letras y numeros.";
        }
        
        if (!cantidad_pisos) {
            isValid = false;
            validationErrors.cantidad_pisos = "Por favor ingrese la cantidad de pisos del edificio.";
        }else if( !/^[0-9]{1,2}$/.test(cantidad_pisos) ){
            isValid = false;
            validationErrors.cantidad_pisos = "La cantidad de pisos debe ser un numero entre 1 y 99.";
        }
        if (!bloque_seleccionado.trim()) {
            isValid = false;
            validationErrors.bloque_seleccionado = "Por favor seleccione el bloque al que pertenece el edificio.";
        }else if( !/^[0-9]{1,2}$/.test(bloque_seleccionado) ){
            isValid = false;
            validationErrors.bloque_seleccionado = "El bloque seleccionado debe ser un numero entre 1 y 99.";
        }
        
        if (imagen_edif.name) {
            isValid = true;
            const extensiones = ["png", "PNG", "jpg", "jpeg"];
            let nombre_imagen = imagen_edif.name;
            const extension = nombre_imagen.substring(
                nombre_imagen.lastIndexOf(".") + 1,
                nombre_imagen.length
            );
            if (!extensiones.includes(extension)) {
                document.getElementsByClassName("imagen_input").value = "";

                this.setState({ imagen_edif: "" });
                validationErrors.imagen_edif =
                    "La imagen debe tener formato PNG, JPG o JPEG";
            } 
        }
        this.setState({ errors: validationErrors });
        return isValid;
    }

    storeEdificio = async (event) => {
        event.preventDefault();
        const data = new FormData();
        
            data.append("nombre_edificio", this.state.nombre_edificio);
            data.append("descripcion_edificio", this.state.descripcion_edificio);
            if(this.state.imagen_edif){
                data.append("imagen_edificio", this.state.imagen_edif);
            }
            data.append("cantidad_pisos", this.state.cantidad_pisos);
            data.append("bloque_id", this.state.bloque_seleccionado);
            try {
                const response = await axios.post(`${endpoint}/edificio`, data).then((response) => {
                    window.location.href = "./edificios"; //deberia redirigir a la vista de edificios
                });
                console.log(response);
                this.props.history.push("/edificios");
            } catch (error) {
                console.error(error);
            }
        
    }

    render() {
        return (
            <>
                <ModalConfirm
                    isOpen={this.state.modalOpen}
                    toggle={this.toggleModal}
                    confirm={this.handleConfirm}
                    message="¿Está seguro de que deseas guardar el departamento?"
                />
                <Container className="custom-form">
                <h2 className="text-center mb-5 titulosForms">Crear Edificio</h2>
                <Form>
                    <FormGroup>
                        <Label className="label-custom" for="nombre_edificio">Nombre del Edificio</Label>
                        <Input 
                            className="customInput" 
                            type="text" 
                            name="nombre_edificio" 
                            placeholder="Ingrese el nombre del edificio"
                            id="nombre_edificio" 
                            onChange={this.handleInput} 
                        />
                        <span style={{ color: "red" }}>{this.state.errors.nombre_edificio}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label className="label-custom" for="descripcion_edificio">Descripcion del Edificio</Label>
                        <Input 
                            className="customInput" 
                            type="text" 
                            name="descripcion_edificio" 
                            placeholder="Ingrese una descripción del edificio"
                            id="descripcion_edificio" 
                            onChange={this.handleInput} 
                        />
                        <span style={{ color: "red" }}>{this.state.errors.descripcion_edificio}</span>
                    </FormGroup>
                    <Row className="mb-3 mt-1">
                        <Col sm={6}>
                        <FormGroup>
                            <Label className="label-custom" for="cantidad_pisos">Cantidad de Pisos</Label>
                            <Input 
                                className="customInput" 
                                type="number" 
                                name="cantidad_pisos" 
                                placeholder="Ingrese la cantidad de pisos"
                                id="cantidad_pisos" 
                                onChange={this.handleInput} 
                            />
                            <span style={{ color: "red" }}>{this.state.errors.cantidad_pisos}</span>
                        </FormGroup>
                        </Col>
                        <Col sm={6}>
                        <FormGroup>
                            <Label className="label-custom" for="bloque_seleccionado">Bloque</Label>
                            <Input 
                                className="customInput" 
                                type="select" 
                                name="bloque_seleccionado" 
                                placeholder="Selecione un bloque"
                                id="bloque_seleccionado" 
                                onChange={this.handleSelect}
                            >
                                <option value="">Seleccione un bloque</option>
                                {this.state.bloques.map((bloque) => (
                                    <option key={bloque.id} value={bloque.id}>{bloque.nombre_bloque}</option>
                                ))}
                            </Input>
                            <span style={{ color: "red" }}>{this.state.errors.bloque_seleccionado}</span>
                        </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label className="label-custom" for="imagen_edificio">Imagen del Edificio</Label>
                        <Input 
                            type="file" 
                            name="imagen_edificio" 
                            placeholder="Ingrese una imagen"
                            id="imagen_edificio" 
                            className="customImage" 
                            onChange={this.handleChange} 
                        />
                        <span style={{ color: "red" }}>{this.state.errors.imagen_edificio}</span>
                        {this.state.imagen_edificio && (
                            <div className="d-flex justify-content-center">
                                <CardImg
                                    width="100%"
                                    src={this.state.imagen_edificio}
                                    alt="Vista previa"
                                    style={{ width: '200px', height: '200px', marginTop: '25px', borderRadius: '10px'}}
                                />
                            </div>
                        )}
                        {this.state.errors.imagen_edif && (
                            <div style={{ color: 'red', fontSize: '0.875rem' }}>{this.state.errors.imagen_edif}</div>
                        )}
                    </FormGroup>
                    <Button className="custom-button mx-auto d-block" onClick={this.toggleModal}>Crear Edificio</Button>
                </Form>
                </Container>
            </>
        );
    }

}
export default CrearEdificio;