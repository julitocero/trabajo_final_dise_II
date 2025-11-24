import React, { useState, useMemo } from "react";
import "../styles/FilterTable.css";

export default function FilterTable({ data }) {

    // Mapear la data entrante a las keys esperadas por la tabla
    const initialData = useMemo(() => {
        return data.map((item, index) => ({
            id: item.id || index,          // por si no viene id
            nombre: item.fname || "",
            apellido: item.lname || "",
            documento: item.ndocument || "",
            sexo: item.gender || "",
            fecha: item.bday || ""
        }));
    }, [data]);

    const [filters, setFilters] = useState({
        nombre: "",
        apellido: "",
        documento: "",
        sexo: "",
        fecha: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;

    const updateFilter = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    // Filtrado dinámico
    const filteredData = useMemo(() => {
        return initialData.filter((item) => {
            return (
                item.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
                item.apellido.toLowerCase().includes(filters.apellido.toLowerCase()) &&
                String(item.documento).includes(filters.documento) &&
                item.sexo.toLowerCase().includes(filters.sexo.toLowerCase()) &&
                item.fecha.includes(filters.fecha)
            );
        });
    }, [filters, initialData]);

    // Paginación
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className="table-container">

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>
                            Nombre
                            <input
                                type="text"
                                placeholder="Filtrar..."
                                value={filters.nombre}
                                onChange={(e) => updateFilter("nombre", e.target.value)}
                            />
                        </th>

                        <th>
                            Apellido
                            <input
                                type="text"
                                placeholder="Filtrar..."
                                value={filters.apellido}
                                onChange={(e) => updateFilter("apellido", e.target.value)}
                            />
                        </th>

                        <th>
                            Documento
                            <input
                                type="text"
                                placeholder="Filtrar..."
                                value={filters.documento}
                                onChange={(e) => updateFilter("documento", e.target.value)}
                            />
                        </th>

                        <th>
                            Sexo
                            <select
                                value={filters.sexo}
                                onChange={(e) => updateFilter("sexo", e.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="NB">No Binario</option>
                                <option value="O">Otro</option>
                            </select>
                        </th>

                        <th>
                            Fecha
                            <input
                                type="date"
                                value={filters.fecha}
                                onChange={(e) => updateFilter("fecha", e.target.value)}
                            />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.documento}</td>
                                <td>{item.sexo}</td>
                                <td>{item.fecha}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">
                                No se encontraron resultados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    ← Anterior
                </button>

                <span>Página {currentPage} de {totalPages || 1}</span>

                <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>
                    Siguiente →
                </button>
            </div>
        </div>
    );
}
