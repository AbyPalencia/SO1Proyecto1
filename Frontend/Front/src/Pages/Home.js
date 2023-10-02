import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CpuMonitor from "../Components/CpuMonitor";
import RamMonitor from "../Components/RamMonitor";
import TablaProcesos from "../Components/TablaProcesos";
import { Typography } from "@mui/material";

export const Home = () => {
  const [loading, setLoading] = React.useState(true);
  const [procdir, setProcdir] = React.useState(false);
  const [lcpu, setLcpu] = React.useState([]);
  const [lram, setLram] = React.useState([]);
  const [lprocs, setLprocs] = React.useState([]);
  const [ltotales, setLtotales] = React.useState([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      fetch("http://35.232.210.192:2000/make").then((response) =>
        response.json()
      ).then((c) => {
        setProcdir(true)
      });
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (procdir) {
      fetch("http://34.130.78.207:5000/api/ramdata")
        .then((response) => response.json())
        .then((c) => {
          setLram(c.resouerce[0].totalram);
        });

      fetch("http://34.130.78.207:5000/api/procsdata")
        .then((response) => response.json())
        .then((c) => {
          setLprocs(c.resouerce[0].procesos);
          setLtotales([c.resouerce[1]]);
        });

      fetch("http://34.130.78.207:5000/api/cpudata")
        .then((response) => response.json())
        .then((c) => {
          setLcpu(c.resouerce[0].totalcpu);
        });


      setLoading(false);
      setProcdir(false)
    }
  }, [procdir]);

  if (loading) {
    return (
      <>
        <Typography
          gutterBottom
          variant="h5"
          sx={{
            width: "1200px",
            overflow: "hidden",
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          Cargando...
        </Typography>
        <Box
          sx={{
            width: "1200px",
            overflow: "hidden",
            position: "absolute",
            left: "50%",
            top: "55%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }
  return (
    <>
      <CpuMonitor cpudata={lcpu} />
      <RamMonitor ramdata={lram} />
      <TablaProcesos procsdata={lprocs} />
    </>
  );
};