import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const RamMonitor = ({ ramdata }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(Number(ramdata));
  }, [ramdata]);

  return (
    <Card
      sx={{
        maxWidth: 170,
        position: "absolute",
        left: "60%",
        top: "185px",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex", ml: 8, mt: 5 }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          color="success"
          size="5rem"
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${progress}%`}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Uso de RAM
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RamMonitor;