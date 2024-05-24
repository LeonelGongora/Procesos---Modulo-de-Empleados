import { Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import React, { useState } from 'react';
import {Toaster, toast} from 'sonner'

export const RegistrarPersona = () => {

  const [datosPersona, setDatosPersona] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    genero: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPersona({
      ...datosPersona,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const datos = new FormData();
    datos.append("nombre", datosPersona.nombre);
    datos.append("apellido", datosPersona.apellido);
    datos.append("correo", datosPersona.correo);
    datos.append("celular", datosPersona.celular);
    datos.append("genero", datosPersona.genero);
    datos.append("chat_id", '1314077933');


    const res = await axios.post('http://127.0.0.1:8000/api/add_persona', datos)
    if (res.data.status === 200) {
      toast.success("Se añadio correctamente");
    }

    const email = datosPersona.correo;
    const password = 'admin123';
    const first_name = datosPersona.nombre;
    const last_name = datosPersona.apellido;

    // para la verificacion
    // axios.post('http://127.0.0.1:8000/api/v1/register', null,
    //     {
    //       params: {
    //         email,
    //         password,
    //         first_name,
    //         last_name
    //       }
    //     })
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.log('Error', error);
    //     });
  };

  return (
    <div fluid className="card p-3 m-5 bg-body-secondary">
      <div className="card-body px-4">
        <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
          Registro de Personas
        </h3>

        <form>
          <Row>
            <Col md={6} className="pl-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="form-label">
                  Nombre(s)
                </label>
                <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleChange} />
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-4">
                <label htmlFor="apellido" className="form-label">
                  Apellido(s)
                </label>
                <input type="text" className="form-control" id="apellido" name="apellido" onChange={handleChange} />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-4">
                <label htmlFor="correo" className="form-label">
                  Correo
                </label>
                <input type="text" className="form-control" id="correo" name="correo" onChange={handleChange} />
              </div>
            </Col>

            <Col md={6} className="mb-4">
              <div className="fw-bold">Género:</div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  id="femenino"
                  value="F"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="femenino">
                  Femenino
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  id="masculino"
                  value="M"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="masculino">
                  Masculino
                </label>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-4">
                <label htmlFor="celular" className="form-label">
                  Celular
                </label>
                <input type="text" className="form-control" id="celular" name="celular" onChange={handleChange} />
              </div>
            </Col>
          </Row>

          <Button type="submit" block variant="primary" className="float-end" onClick={handleSubmit}>
            Registrar
          </Button>
        </form>
        <Toaster
        position="top-center"
        richColorSuccess
        closeButton
        style={{position:"absolute"}}
      />
      </div>
    </div>
  );
};
