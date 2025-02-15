import {
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Container,
  AccordionActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { EDeedType } from "../../../../indexDB/db";

type TDeedCardProps = {
  name: string;
  type: EDeedType;
  targetAndRange: string;
  description?: string;
  base?: string;
  hit?: string;
  spark?: string;
};

export default function DeedCard(props: TDeedCardProps) {
  return (
    <Container>
      <Accordion>
        <AccordionSummary sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} width={"100%"}>
            <Grid size={8}>
              <Typography>{props.name}</Typography>
            </Grid>
            <Grid size={4}>
              <Typography align="right">{props.type}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid size={1}></Grid>
            <Grid size={11}>
              <Typography>{props.targetAndRange}</Typography>
            </Grid>
            <Grid size={1}>Base</Grid>
            <Grid size={11}>
              <Typography>{props.base}</Typography>
            </Grid>
            <Grid size={1}>Hit</Grid>
            <Grid size={11}>
              <Typography>{props.hit}</Typography>
            </Grid>
            <Grid size={1}>Spark</Grid>
            <Grid size={11}>
              <Typography>{props.spark}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Button>EDIT</Button>
        </AccordionActions>
      </Accordion>
    </Container>
  );
}
