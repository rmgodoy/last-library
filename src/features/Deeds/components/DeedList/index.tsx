import { List, ListItem } from "@mui/material";
import DeedCard from "../DeedCard";
import { TDeed } from "../../../../indexDB/types";
import DeedSearchBar from "../DeedSearchBar";

type TDeedListProps = {
  data: TDeed[];
};

export default function DeedList(props: TDeedListProps) {
  return (
    <>
      <DeedSearchBar />
      <List>
        {props.data.map((item) => (
          <ListItem key={item.id}>
            <DeedCard
              id={item.id}
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
    </>
  );
}
