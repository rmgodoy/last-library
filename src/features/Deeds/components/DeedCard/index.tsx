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
import { useState } from "react";
import EditableDeedText from "../EditableDeedText";

type TDeedCardProps = {
  id: string;
  name: string;
  type: EDeedType;
  targetAndRange: string;
  description?: string;
  start?: string;
  base?: string;
  hit?: string;
  spark?: string;
};

export default function DeedCard(props: TDeedCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [name, setName] = useState<string>(props.name);
  const [type, setType] = useState<string>(props.type);
  const [targetAndRange, setTargetAndRange] = useState<string>(
    props.targetAndRange
  );
  // const [description, setDescription] = useState<string>(props.description);
  const [start, setStart] = useState<string>(props.start || "");
  const [base, setBase] = useState<string>(props.base || "");
  const [hit, setHit] = useState<string>(props.hit || "");
  const [spark, setSpark] = useState<string>(props.spark || "");

  function onExpandChange(_event: React.SyntheticEvent, isExpanded: boolean) {
    setExpanded(isEditing ? true : isExpanded ? true : false);
  }

  return (
    <Container>
      <Accordion expanded={expanded} onChange={onExpandChange}>
        <AccordionSummary sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} width={"100%"}>
            <Grid size={8}>
              <EditableDeedText
                value={name}
                isEditing={isEditing}
                onValueChange={setName}
              />
            </Grid>
            <Grid size={4}>
              <Typography align="right">{type}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid size={1}></Grid>
            <Grid size={11}>
              <EditableDeedText
                value={targetAndRange}
                isEditing={isEditing}
                onValueChange={setTargetAndRange}
              />
            </Grid>
            {(props.start || isEditing) && (
              <>
                <Grid size={1}>Start</Grid>
                <Grid size={11}>
                  <EditableDeedText
                    value={start}
                    isEditing={isEditing}
                    onValueChange={setStart}
                  />
                </Grid>
              </>
            )}
            {(props.base || isEditing) && (
              <>
                <Grid size={1}>Base</Grid>
                <Grid size={11}>
                  <EditableDeedText
                    value={base}
                    isEditing={isEditing}
                    onValueChange={setBase}
                  />
                </Grid>
              </>
            )}
            {(props.hit || isEditing) && (
              <>
                <Grid size={1}>Hit</Grid>
                <Grid size={11}>
                  <EditableDeedText
                    value={hit}
                    isEditing={isEditing}
                    onValueChange={setHit}
                  />
                </Grid>
              </>
            )}

            {(props.spark || isEditing) && (
              <>
                <Grid size={1}>Spark</Grid>
                <Grid size={11}>
                  <EditableDeedText
                    value={spark}
                    isEditing={isEditing}
                    onValueChange={setSpark}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            {!isEditing ? "EDIT" : "SAVE"}
          </Button>
        </AccordionActions>
      </Accordion>
    </Container>
  );
}
