import { List, ListItem } from "@mui/material";
import DeedCard from "../DeedCard";
import { TDeed } from "../../../../indexDB/db";

type TDeedListProps = {
  data: TDeed[];
};

export default function DeedList(props: TDeedListProps) {
  // TODO: change id to use id from db
  return (
    <List>
      {props.data.map((item) => (
        <ListItem key={item.name}>
          <DeedCard
            name={item.name}
            type={item.type}
            description={item.description}
            targetAndRange={item.targetAndRange}
            start={item.start}
            base={item.base}
            hit={item.hit}
            spark={item.spark}
          />
        </ListItem>
      ))}
    </List>
  );
}
