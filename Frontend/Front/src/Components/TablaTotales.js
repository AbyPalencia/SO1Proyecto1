import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "pE",
    label: "Procesos en ejecución",
    minWidth: 100,
    align: "center",
    type: "string",
  },
  {
    id: "pS",
    label: "Procesos suspendidos",
    minWidth: 100,
    align: "center",
    type: "string",
  },
  {
    id: "pD",
    label: "Procesos detenidos",
    minWidth: 170,
    align: "center",
    type: "string",
  },
  {
    id: "pZ",
    label: "Procesos zombie",
    minWidth: 170,
    align: "center",
    type: "string",
  },
  {
    id: "pT",
    label: "Total procesos",
    minWidth: 170,
    align: "center",
    type: "string",
  },
];

const TablaTotales = ({ datatotal }) => {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setRows(datatotal);
  }, [datatotal]);
  
  return (
    <Paper
      sx={{
        width: "1000px",
        overflow: "hidden",
        position: "absolute",
        left: "50%",
        top: "360px",
        transform: "translate(-50%, -50%)",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.pE}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.label} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TablaTotales;