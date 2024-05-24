import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Table } from "reactstrap";
import { FaCalendarAlt } from "react-icons/fa"; // Importa el icono FaCalendarAlt de React Icons
import { Link } from "react-router-dom"; // Importa Link para la navegación

import "bootstrap/dist/css/bootstrap.min.css";

const endpoint = "http://localhost:8000/api";

class PagoAreaComun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areasComunes: [],
    };
  }

  componentDidMount() {
    this.fetchAreasComunes();
  }

  fetchAreasComunes = async () => {
    try {
      const response = await axios.get(`${endpoint}/obtenerAreasComunesID`);
      const areasComunes = Object.entries(response.data).map(
        ([id, nombre]) => ({
          id: id,
          nombre: nombre,
        })
      );
      this.setState({ areasComunes: areasComunes });
    } catch (error) {
      console.error("Error al obtener las áreas comunes:", error);
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mb-5">Pago de reserva de Áreas Comunes</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Reservas</th> {/* Nueva columna para reservas */}
                </tr>
              </thead>
              <tbody>
                {this.state.areasComunes.map((areaComun, index) => (
                  <tr key={index}>
                    <td>{areaComun.id}</td>
                    <td>{areaComun.nombre}</td>
                    <td>
                      {/* Botón con el icono para reservas */}
                      <Link to={`/cobros/pagar-reserva/${areaComun.id}`}>
                        <FaCalendarAlt />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PagoAreaComun;
