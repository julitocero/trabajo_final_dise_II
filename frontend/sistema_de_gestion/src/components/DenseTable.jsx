import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableDynamic({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }
  const normalizedData = data.map((item) => {
    const newItem = { ...item };

    if (typeof newItem.details === "string") {
      try {
        newItem.details = JSON.parse(newItem.details);
      } catch (e) {
      }
    }

    return newItem;
  });
  const baseHeaders = Object.keys(normalizedData[0]).filter(
    (key) => key !== "details"
  );

  const detailHeaders = normalizedData[0].details
    ? Object.keys(normalizedData[0].details)
    : [];

  const headers = [...baseHeaders, ...detailHeaders];

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} style={{ fontWeight: "bold" }}>
                {header.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {normalizedData.map((row, idx) => (
            <TableRow key={idx}>
              {/* columnas normales */}
              {baseHeaders.map((header) => (
                <TableCell key={header}>
                  {row[header]}
                </TableCell>
              ))}
              {detailHeaders.map((detailKey) => (
                <TableCell key={detailKey}>
                  {(() => {
                            const value = row.details?.[detailKey];

                            if (typeof value === "object" && value !== null) {
                              return JSON.stringify(value);   // el update llega con un formato diferente asi que tuve que probar esto
                            }

                            return value ?? "";
                          })()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

