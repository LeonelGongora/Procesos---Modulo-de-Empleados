import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const endpoint = "http://localhost:8000/api";

const EditarEquipo = () => {
  const { id } = useParams();
  const [equipo, setEquipo] = useState({
    nombre: "",
    descripcion: "",
    costo: "",
    area_comun_nombre: "",
  });
  const [areasComunes, setAreasComunes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    obtenerEquipo(id);
    obtenerAreasComunes();
  }, [id]);

  const obtenerEquipo = async (equipoId) => {
    try {
      const response = await axios.get(`${endpoint}/obtener-equipamiento/${equipoId}`);
      const equipoData = response.data.equipo;
      setEquipo(equipoData);
    } catch (error) {
      console.error("Error al obtener el equipo:", error);
    }
  };

  const obtenerAreasComunes = async () => {
    try {
      const response = await axios.get(`${endpoint}/obtenerAreasComunes`);
      const commonAreas = response.data[0];
      setAreasComunes(commonAreas);
    } catch (error) {
      console.error("Error al obtener las áreas comunes:", error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEquipo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, nombre, descripcion, costo, area_comun_nombre } = equipo;
    const validationErrors = {};
    console.log(equipo);
    // Validaciones de campos

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
     
      const url = `${endpoint}/editar-equipo/${id}`;
      console.log(nombre); 
      const data = {
        nombre,
        descripcion,
        costo,
        area_comun_nombre,
      };

      try {
        const response = await axios.put(url, data);
        console.log("Equipo editado exitosamente:", response.data);
        window.location.href = "/cobros/gestion-equipo";
      } catch (error) {
        console.error("Error al editar el equipo:", error);
        console.log(id);
      }
    }
  };

  return (
    <Container className="custom-form">
      <Row>
        <Col sm={12}>
          <h2 className="text-center mb-5">Editar equipo</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-4">
              <Label className="label-custom">Nombre del equipo</Label>
              <Input
                type="text"
                name="nombre"
                value={equipo.nombre}
                onChange={handleInput}
              />
              {errors.nombre && (
                <span>{errors.nombre}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4">
              <Label className="label-custom">Descripción del equipo</Label>
              <Input
                type="textarea"
                name="descripcion"
                value={equipo.descripcion}
                onChange={handleInput}
              />
              {errors.descripcion && (
                <span>{errors.descripcion}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4">
              <Label className="label-custom">Costo del equipo</Label>
              <Input
                type="number"
                name="costo"
                value={equipo.costo}
                onChange={handleInput}
              />
              {errors.costo && (
                <span>{errors.costo}</span>
              )}
            </FormGroup>
            <FormGroup className="mb-4">
              <Label className="label-custom">Área Común</Label>
              <Input
                type="select"
                name="area_comun_nombre"
                value={equipo.area_comun_nombre}
                onChange={handleInput}
              >
                <option value="">Seleccione un área común</option>
                {areasComunes.map((areaComun, index) => (
                  <option key={index} value={areaComun}>
                    {areaComun}
                  </option>
                ))}
              </Input>
              {errors.area_comun_nombre && (
                <span>{errors.area_comun_nombre}</span>
              )}
            </FormGroup>
            <Button
              size="lg"
              type="submit"
              className="custom-button mx-auto d-block"
              style={{ fontWeight: "bold" }}
              disabled={!areasComunes.length}
            >
              Actualizar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarEquipo;
