import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap'; // Added import for useState
import "./PopUpCss.css";
import "./customs.css";
import axios from "axios";

const endpoint = 'http://localhost:8000/api';
const SeleccionarOferta = (props) => {
	const { isOpen, toggle, idDep } = props;

    const [ventaChecked, setVentaChecked] = useState(false);
    const [alquilerChecked, setAlquilerChecked] = useState(false);
    const [anticreticoChecked, setAnticreticoChecked] = useState(false);
    const [departamentoModal, setDepartamentoModal] = useState({});
    const [checkboxEstado, setCheckBoxEstado] = useState("");
    const [errors, setErrors] = useState({});
    const validarCheckboxes = () => {
        if (!ventaChecked && !alquilerChecked && !anticreticoChecked) {
            return "Seleccionar al menos una modalidad de oferta."
        } else {
            return "";
        }
    }

    const updateModalidad = async () => {
        let validationErrors = {};
        try {
            let checkBoxError = validarCheckboxes();
            if (checkBoxError !== '') {
                validationErrors.checkboxEstado = checkBoxError;
            }
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length === 0) {
                await axios.put(`${endpoint}/departamentoAct/${departamentoModal.id}/actualizarOfertados`, {
                    ofertado_venta: ventaChecked ? '1' : '0',
                    ofertado_alquiler: alquilerChecked ? '1' : '0',
                    ofertado_anticretico: anticreticoChecked ? '1' : '0'
                });
                axios.put(`${endpoint}/departamentos/${departamentoModal.id}/actualizarDisp`, {
                    disponibilidad: 1,
                });
                toggle(); 
            }
        } catch (error) {
            console.error('Error al actualizar la modalidad:', error);
        }
    }

    useEffect(() => {
        const obtenerInfo = async () => {
            try {
                const response = await axios.get(`${endpoint}/departamento/${idDep}`);
                const departamento = response.data;

                // Establecer los estados basados en la información del departamento
                setVentaChecked(departamento.ofertado_venta === 1);
                setAlquilerChecked(departamento.ofertado_alquiler === 1);
                setAnticreticoChecked(departamento.ofertado_anticretico === 1);
                
                // Guardar la información del departamento en el estado
                setDepartamentoModal(departamento);
            } catch (error) {
                console.error('Error al obtener información del departamento:', error);
            }
        };
        obtenerInfo();
    }, []);


	return (
		<Modal isOpen={isOpen} toggle={toggle} centered>
			<ModalHeader ></ModalHeader>
			<ModalBody id="modalBodyPU">
                <p>¿En qué modalidad desea ofertar la propiedad?</p>
                <FormGroup check className="contenedorCheckPU">
                    <Label check id="checkPU">
                        <Input className="checkModal" type="checkbox" checked={ventaChecked} onChange={() => setVentaChecked(!ventaChecked)} />{' '}
                        Venta
                    </Label>
                    <Label check id="checkPU">
                        <Input className="checkModal" type="checkbox" checked={alquilerChecked} onChange={() => setAlquilerChecked(!alquilerChecked)} />{' '}
                        Alquiler
                    </Label>
                    <Label check id="checkPU">
                        <Input className="checkModal" type="checkbox" checked={anticreticoChecked} onChange={() => setAnticreticoChecked(!anticreticoChecked)} />{' '}
                        Anticrético
                    </Label>
                </FormGroup>
                {errors.checkboxEstado && <Label
                    style={{ color: 'red', fontSize: '0.875rem' }}
                >{errors.checkboxEstado}</Label>}
			</ModalBody>
			<ModalFooter id="modalFooterPU">
				<Button color="primary" className="confirmBoton" onClick={updateModalidad}>Confirmar</Button>{' '}
			</ModalFooter>
		</Modal>
	);
}

export default SeleccionarOferta;