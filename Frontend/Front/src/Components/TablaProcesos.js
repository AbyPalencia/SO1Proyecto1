import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width="10px">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center" width="250px">
          {row.pid}
        </TableCell>
        <TableCell align="left" width="400px">
          {row.nombre}
        </TableCell>
        <TableCell align="center">{row.usuario}</TableCell>
        <TableCell align="center">{row.estado}</TableCell>
        <TableCell align="center">{row.ram}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, width: "700px", ml: 25 }}>
              <Typography variant="h6" gutterBottom component="div">
                Childs
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width="200px">
                      PID
                    </TableCell>
                    <TableCell align="center">Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.childs.map((childRow) => (
                    <TableRow key={childRow.pid}>
                      <TableCell component="th" scope="row" align="center">
                        {childRow.pid}
                      </TableCell>
                      <TableCell align="left">{childRow.nombre}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    pid: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    usuario: PropTypes.string.isRequired,
    childs: PropTypes.arrayOf(
      PropTypes.shape({
        pid: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
      })
    ).isRequired,
    estado: PropTypes.string.isRequired,
    ram: PropTypes.string.isRequired,
  }).isRequired,
};

const TablaProcesos = ({ procsdata }) => {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setRows(procsdata);
  }, [procsdata]);

  return (
    <>
      <Paper
        sx={{
          width: "1200px",
          overflow: "hidden",
          position: "absolute",
          left: "50%",
          top: "675px",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">PID</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Usuario</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">%RAM</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.pid} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper
        sx={{
          mt: 110,
        }}
      >
        <Typography
          gutterBottom
          variant="h7"
          sx={{
            ml: 178,
          }}
        >
          201709003
        </Typography>
      </Paper>
    </>
  );
};

export default TablaProcesos;