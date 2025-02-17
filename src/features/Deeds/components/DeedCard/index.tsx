import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  AccordionActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DBS, EDeedType, Stores, upsertData } from "../../../../indexDB/db";
import { useState } from "react";
import EditableDeedText from "../EditableDeedText";
import DeedTypeSelector from "../DeedTypeSelector";

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
  const [type, setType] = useState<EDeedType>(props.type);
  const [targetAndRange, setTargetAndRange] = useState<string>(
    props.targetAndRange
  );
  const [start, setStart] = useState<string>(props.start || "");
  const [base, setBase] = useState<string>(props.base || "");
  const [hit, setHit] = useState<string>(props.hit || "");
  const [spark, setSpark] = useState<string>(props.spark || "");

  const [oldName, setOldName] = useState<string>(props.name);
  const [oldType, setOldType] = useState<EDeedType>(props.type);
  const [oldTargetAndRange, setOldTargetAndRange] = useState<string>(
    props.targetAndRange
  );
  const [oldStart, setOldStart] = useState<string>(props.start || "");
  const [oldBase, setOldBase] = useState<string>(props.base || "");
  const [oldHit, setOldHit] = useState<string>(props.hit || "");
  const [oldSpark, setOldSpark] = useState<string>(props.spark || "");

  function onExpandChange(_event: React.SyntheticEvent, isExpanded: boolean) {
    setExpanded(isEditing ? true : isExpanded ? true : false);
  }

  function saveDeed() {
    upsertData(DBS.Deeds, Stores.Deeds, {
      id: props.id,
      name,
      type,
      targetAndRange,
      start,
      base,
      hit,
      spark,
    });
  }

  function onCancel() {
    setName(oldName);
    setType(oldType);
    setTargetAndRange(oldTargetAndRange);
    setStart(oldStart);
    setBase(oldBase);
    setHit(oldHit);
    setSpark(oldSpark);
    setIsEditing(false);
  }

  return (
    <Container>
      <Accordion expanded={expanded} onChange={onExpandChange}>
        <AccordionSummary sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} width={"100%"}>
            <Grid size={10}>
              <EditableDeedText
                value={name}
                isEditing={isEditing}
                onValueChange={setName}
              />
            </Grid>
            <Grid size={2}>
              <DeedTypeSelector
                isEditing={isEditing}
                type={type}
                onChange={setType}
              />
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
            {(start || isEditing) && (
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
            {(base || isEditing) && (
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
            {(hit || isEditing) && (
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

            {(spark || isEditing) && (
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
          {isEditing && <Button onClick={onCancel}>CANCEL</Button>}
          <Button
            onClick={() => {
              if (isEditing) {
                saveDeed();
              } else {
                setOldName(name);
                setOldType(type);
                setOldTargetAndRange(targetAndRange);
                setOldStart(start);
                setOldBase(base);
                setOldHit(hit);
                setOldSpark(spark);
              }
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
