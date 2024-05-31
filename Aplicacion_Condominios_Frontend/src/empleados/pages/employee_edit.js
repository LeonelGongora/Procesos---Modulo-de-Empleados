import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';

import {
    MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSelect,
  MDBRadio
  }
  from 'mdb-react-ui-kit';

const cookies = new Cookies();

function EmployeeEdit() {

  const id = cookies.get('id_empleado_seleccionado');

  const [empleado, setEmpleado] = useState([]);
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    nombre: "",
    apellido : "",
    correo : "",
    celular : "",
    genero : "",
    ci:"",
    fecha_contratacion : "",
  });

  useEffect(()=>{
    getEmpleado();
  }, []);

  const getEmpleado =  async (e) => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_employee/${id}`)
    setValues({
        nombre: respuesta.data.empleado.nombre,
        apellido : respuesta.data.empleado.apellido,
        correo : respuesta.data.empleado.correo,
        celular : respuesta.data.empleado.celular,
        genero : respuesta.data.empleado.genero,
        ci : respuesta.data.empleado.ci,
        fecha_contratacion : respuesta.data.empleado.fecha_contratacion,
    });
    setEmpleado(respuesta.data.empleado)
   };

  const handleInput = (e) => {
    const {name, value} = e.target;
    setValues({
        ...values,
        [name]:value,
    });
  }

  const guardarInformacion =  async (e) => {
    e.preventDefault(); 
    const validationErrors = {};

    if(!values.correo.trim()){
      validationErrors.correo = "Este campo es obligatorio"
    }

    if (!values.celular.trim()) {
      validationErrors.celular = "Este campo es obligatorio";
    } else if (!/^[6-7]\d{7}$/.test(values.celular)) {
      validationErrors.celular =
        "El número de celular debe comenzar con 6 o 7 y tener exactamente 8 dígitos";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const data = new FormData();

      data.append("nombre", values.nombre);
      data.append("apellido", values.apellido);
      data.append("correo", values.correo);
      data.append("celular", values.celular);
      data.append("genero", "M");

      const res = await axios.post(
        `http://127.0.0.1:8000/api/update_employee/${id}`,
        data
      );

      if (res.data.status === 200) {
        console.log(res);
        window.location.href = "./";
      }
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center align-items-center m-5">
        <MDBCard>
          <MDBCardBody className="px-4">
            <div className="text-center">
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                Editar Informacion de Empleado
              </h3>
            </div>

            <MDBRow className="mb-4">
              <MDBCol md="6">
                <label htmlFor="form1" className="form-label fw-bold">
                  Nombre(s):
                </label>
                <MDBInput
                  name="nombre"
                  size="lg"
                  id="form1"
                  type="text"
                  onChange={handleInput}
                  value={empleado.nombre}
                />
              </MDBCol>

              <MDBCol md="6">
                <label htmlFor="form2" className="form-label fw-bold">
                  Apellido(s):
                </label>
                <MDBInput
                  name="apellido"
                  size="lg"
                  id="form2"
                  type="text"
                  onChange={handleInput}
                  value={empleado.apellido}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-4">
              <MDBCol md="6">
                <label htmlFor="form3" className="form-label fw-bold">
                  Celular:
                </label>
                <MDBInput
                  name="celular"
                  size="lg"
                  id="form3"
                  type="text"
                  onChange={handleInput}
                  value={values.celular}
                />
                {errors.celular && (
                  <span className="advertencia-creEve">{errors.celular}</span>
                )}
              </MDBCol>

              <MDBCol md="6">
                <label htmlFor="form4" className="form-label fw-bold">
                  Correo:
                </label>
                <MDBInput
                  name="correo"
                  size="lg"
                  id="form4"
                  type="text"
                  onChange={handleInput}
                  value={values.correo}
                />
                {errors.correo && (
                  <span className="advertencia-creEve">{errors.correo}</span>
                )}
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-4">
              <MDBCol md="6">
                <label htmlFor="form5" className="form-label fw-bold">
                  C.I.:
                </label>
                <MDBInput
                  name="ci"
                  size="lg"
                  id="form4"
                  type="number"
                  onChange={handleInput}
                  value={empleado.ci}
                />
              </MDBCol>

              <MDBCol md="6">
                <h6 className="mb-2 fw-bold" style={{ paddingBottom: "15px" }}>
                  Genero:{" "}
                </h6>
                <MDBRadio
                  name="genero"
                  id="inlineRadio1"
                  value="F"
                  label="Femenino"
                  inline
                  onBlur={handleInput}
                />
                <MDBRadio
                  name="genero"
                  id="inlineRadio2"
                  value="M"
                  label="Masculino"
                  inline
                  onBlur={handleInput}
                />
              </MDBCol>
            </MDBRow>

            <div className="text-center">
              <Button
                block
                onClick={guardarInformacion}
                style={{ backgroundColor: "#65B8A6", borderColor: "#65B8A6" }}
              >
                Guardar
              </Button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default EmployeeEdit;
