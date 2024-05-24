import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form, Row, Col, FormFeedback } from 'reactstrap';
import "./customs.css";


const ModalParqueo = (props) => {
    const { isOpen, onSubmit, toggle, idParqueo, parqueos, departamentos } = props;
    const [nombre, setNombre] = useState('');
    const [departamentoSelec, setDepartamentoSelec] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setNombre('');
            setDepartamentoSelec("");
            setErrors({});
        } else {
            if (idParqueo) {
                const parqueo = parqueos.find(parqueo => parqueo.id === idParqueo);
                const departamento = departamentos.find(departamento => departamento.id === parqueo.departamento_id);
                setNombre(parqueo.nombre_parqueo);
                setDepartamentoSelec(departamento.id);
            }
        }
    }, [isOpen, departamentos, idParqueo, parqueos]);

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
        setErrors({ ...errors, nombre: '' });
    };

    const handleDepartamentoChange = (e) => {
        setDepartamentoSelec(e.target.value);
        setErrors({ ...errors, departamentoSelec: '' });
    };

    const handleSubmit = () => {
        const validationErrors = {};

        if (!nombre.trim()) {
            validationErrors.nombre = "Este campo es obligatorio";
        } else if (!/^[a-zA-ZÑñáéíóú][a-zA-ZÑñáéíóú0-9\s-]{1,60}[A-Za-zÑñáéíóú0-9]$/.test(nombre)) {
            validationErrors.nombre = "Ingrese un nombre válido";
        }

        if (!departamentoSelec) {
            validationErrors.departamento = "Debe seleccionar un departamento";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit({ id: idParqueo,nombre_parqueo: nombre, departamento_id: departamentoSelec });
        }
    };


    return (
        <Modal className="modalContainer" isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody id="modalBodyParqueo">
                <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="label-custom">Nombre</Label>
                                <Input
                                    id="nombre"
                                    className="customInput"
                                    name="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    invalid={errors.nombre ? true : false}
                                />
                                <FormFeedback>{errors.nombre}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="label-custom">Departamento</Label>
                                <Input
                                    type="select"
                                    className="customInput"
                                    name="departamento_id"
                                    id="departamento_id"
                                    onChange={handleDepartamentoChange} 
                                    value={departamentoSelec}
                                    invalid={errors.departamentoSelec ? true : false}
                                    
                                >
                                    <option disabled value=''>{" "}Seleccionar departamento</option>
                                    {departamentos.map(departamento => (
                                        <option key={departamento.id} value={departamento.id} >{departamento.nombre_departamento}</option>
                                    ))}
                                </Input>
                                <FormFeedback>{errors.departamentoSelec}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter >
                <Button color='primary' onClick={handleSubmit}>Guardar</Button>
                <Button color="danger" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalParqueo;