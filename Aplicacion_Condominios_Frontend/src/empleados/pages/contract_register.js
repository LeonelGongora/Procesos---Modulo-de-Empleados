import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRadio,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function ContractRegister() {

    const empleado = cookies.get('id_empleado_seleccionado');

    const [errors, setErrors] = useState({});
    const [areas, setAreas] = useState([]);
    const [beneficios, setBeneficios] = useState([]);

    useEffect(()=>{
      obtenerAreas()
      obtenerBeneficios()
    }, []);
  
    const [values, setValues] = useState({
        tipo_contrato: "",
        fecha_inicio : "",
        fecha_final : "",
        area : "",
        cargo : "",
        beneficios : "",
        salario : "",
    });
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });

        if (e.target.name === "tipo_contrato") {
          if (e.target.value === "Fijo") {
            document.getElementById("fecha_final").disabled = true;
          } else {
            document.getElementById("fecha_final").disabled = false;
          }
        }
    };
    
    const handleSubmit =  async (e) => {
        e.preventDefault(); 

        console.log(values.area)
        const validationErrors = {};

        if(!values.fecha_inicio.trim()){
            validationErrors.fecha_inicio = "Este campo es obligatorio"
        }

        if(!values.fecha_final.trim() && values.tipo_contrato === "Temporal"){
            validationErrors.fecha_final = "Este campo es obligatorio"
        }

        if(!values.area.trim()){
            validationErrors.area = "Seleccione una area"
        }

        if(!values.cargo.trim()){
            validationErrors.cargo = "Seleccione un cargo"
        }

        if(!values.salario.trim()){
            validationErrors.salario = "Este campo es obligatorio"
        }else if (!(Number(values.salario) > 2123)) {
            validationErrors.salario = "El salario debe ser un numero entero igual o mayor a 2124 (Minimo Nacional)";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
          const data = new FormData();

          data.append("tipo_contrato", values.tipo_contrato);
          data.append("fecha_inicio", values.fecha_inicio);
          data.append("fecha_final", values.fecha_final);
          data.append("area", values.area);
          data.append("cargo", values.cargo);
          data.append("beneficios", values.beneficios);
          data.append("salario", values.salario);
          data.append("empleado", empleado.id);

          const res = await axios.post(
            `http://127.0.0.1:8000/api/add_contract`,
            data
          );

          if (res.data.status === 200) {
            const data_contrato = new FormData();
            data_contrato.append("estado_contrato", "Contratado");
            console.log(res);
            const respuesta_estado = await axios.post(
                `http://127.0.0.1:8000/api/updateContractStatus/${empleado.id}`,
                data_contrato
            );
            if (respuesta_estado.data.status === 200) {
                console.log(respuesta_estado);
            }
            window.location.href = "./assignContract";
          }
        }
    };

    const manejarSelectArea = ()  => {
        setValues({
            ...values,
            area:document.getElementById("select_area").value,
        });
    };

    const manejarSelectCargo = ()  => {
        setValues({
            ...values,
            cargo:document.getElementById("select_cargo").value,
        });
    };

    const obtenerAreas = async ()  => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_areas`);
      setAreas(respuesta.data.areas)
    };

    const obtenerBeneficios = async ()  => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_all_benefits`);
      setBeneficios(respuesta.data.beneficios)
    };
    
    return (
      <>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="9" className="my-5">
              <MDBRow>
                <MDBCol className="d-flex align-items-center justify-content-center">
                  <h1 className="mb-4">Registro de contrato</h1>
                </MDBCol>
              </MDBRow>

              <MDBCard>
                <MDBCardBody className="px-4">
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Tipo de Contrato</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBRadio
                        name="tipo_contrato"
                        id="inlineRadio1"
                        value="Fijo"
                        label="Fijo"
                        inline
                        onChange={handleInput}
                      />
                      <MDBRadio
                        name="tipo_contrato"
                        id="inlineRadio2"
                        value="Temporal"
                        label="Temporal"
                        inline
                        onChange={handleInput}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Empleado</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        id="form2"
                        type="email"
                        value={empleado.nombre + " " + empleado.apellido}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Fecha de Inicio</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        id="form2"
                        type="date"
                        name="fecha_inicio"
                        onBlur={handleInput}
                      />
                      {errors.fecha_inicio && (
                        <span className="advertencia-creEve">
                          {errors.fecha_inicio}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Fecha de Finalización</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        id="fecha_final"
                        type="date"
                        name="fecha_final"
                        onBlur={handleInput}
                      />
                      {errors.fecha_final && (
                        <span className="advertencia-creEve">
                          {errors.fecha_final}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Area</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <Form.Select
                        aria-label="Default select example"
                        id="select_area"
                        onChange={manejarSelectArea}
                      >
                        <option disabled selected>
                          {" "}
                          Seleccione una area
                        </option>
                        {areas.map((area) => {
                          return (
                            <>
                              <option value={area.nombre}>{area.nombre}</option>
                            </>
                          );
                        })}
                      </Form.Select>
                      {errors.area && (
                        <span className="advertencia-creEve">
                          {errors.area}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Cargo</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <Form.Select
                        aria-label="Default select example"
                        id="select_cargo"
                        onChange={manejarSelectCargo}
                      >
                        <option disabled selected>
                          {" "}
                          Seleccione un cargo
                        </option>
                        <option value="Encargado">Encargado</option>
                        <option value="Subordinado">Subordinado</option>
                      </Form.Select>
                      {errors.cargo && (
                        <span className="advertencia-creEve">
                          {errors.cargo}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Beneficios</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBCol md="9" className="pe-5">
                        {beneficios.map((beneficio) => {
                          return (
                            <>
                              <MDBCheckbox
                                name="beneficios"
                                value={beneficio.id}
                                id="flexCheckDefault"
                                label={beneficio.nombre}
                                onChange={handleInput}
                              />
                            </>
                          );
                        })}
                      </MDBCol>
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Salario</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        id="form2"
                        type="number"
                        name="salario"
                        onBlur={handleInput}
                      />
                      {errors.salario && (
                        <span className="advertencia-creEve">
                          {errors.salario}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow>
                    <MDBCol className="d-flex align-items-center justify-content-center">
                      <Button
                        block
                        className="my-4"
                        size="lg"
                        onClick={handleSubmit}
                        style={{
                          backgroundColor: "#65B8A6",
                          borderColor: "#65B8A6",
                        }}
                      >
                        Contratar
                      </Button>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
  
  export default ContractRegister;