import { List, ListItem } from "@mui/material";
import DeedCard from "../DeedCard";
import { TDeed } from "../../../../indexDB/db";

type TDeedListProps = {
  data: TDeed[];
};

export default function DeedList(props: TDeedListProps) {
  return (
    <List>
      {props.data.map((item) => (
        <ListItem key={item.id}>
          <DeedCard
            name={item.name}
            type={item.type}
            description={item.description}
            targetAndRange={item.targetAndRange}
            base={item.base}
            hit={item.hit}
            spark={item.spark}
          />
        </ListItem>
      ))}
    </List>
  );
}
