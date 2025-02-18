import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import SearchAppBar from "../../components/AppBar";
import DeedList from "../../features/Deeds/components/DeedList";
import Sidebar, { TOptions } from "../../components/SideBar";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import { ReactElement, useContext, useEffect, useState } from "react";
import { DBS, Stores, TDeed } from "../../indexDB/types";
import { IndexDbContext } from "../../indexDB/indexDbContext";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#3b3b3b",
    },
    secondary: {
      main: "#C93131",
      light: "#F15249",
    },
    background: {
      default: "#918B70",
      paper: "#DDDAC0",
    },
  },
};

const theme = createTheme(themeOptions);

export default function MainPage() {
  const db = useContext(IndexDbContext);

  const [isDeedsDBReady, setIsDeedsDBReady] = useState(false);
  const [isEffectsDBReady, setIsEffectsDBReady] = useState(false);
  const [isCreaturesDBReady, setIsCreaturesDBReady] = useState(false);

  const [deeds, setDeeds] = useState<TDeed[]>([]);

  const [content, setContent] = useState<string>("deeds");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (db._getData) {
      db._getData<TDeed>(DBS.Deeds, Stores.Deeds).then((data) => {
        setDeeds(data);
      });
    }
  }, [db.modified, db]);

  useEffect(() => {
    if (!isDeedsDBReady && db._initDB) {
      db._initDB(DBS.Deeds, [Stores.Deeds]).then((status) => {
        setIsDeedsDBReady(status);
        if (db._getData) {
          db._getData<TDeed>(DBS.Deeds, Stores.Deeds).then((data) => {
            setDeeds(data);
          });
        }
      });
    }
  }, [isDeedsDBReady, db]);
  useEffect(() => {
    if (!isEffectsDBReady && db._initDB) {
      db._initDB(DBS.Deeds, [Stores.Deeds]).then((status) => {
        setIsEffectsDBReady(status);
      });
    }
  }, [isEffectsDBReady, db]);
  useEffect(() => {
    if (!isCreaturesDBReady && db._initDB) {
      db._initDB(DBS.Deeds, [Stores.Deeds]).then((status) => {
        setIsCreaturesDBReady(status);
      });
    }
  }, [isCreaturesDBReady, db]);

  function toggleSidebar(state?: boolean) {
    if (state !== undefined) {
      setIsSidebarOpen(state);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  }

  function optionsCallback(text: string) {
    setContent(text.toLocaleLowerCase());
  }

  const sidebarOptions: TOptions[] = [
    {
      callback: optionsCallback,
      icon: <AutoAwesomeIcon />,
      text: "Deeds",
    },
    {
      callback: optionsCallback,
      icon: <ElectricBoltOutlinedIcon />,
      text: "Effects",
    },
  ];

  const contents: { [name: string]: ReactElement | undefined } = {
    deeds: <>{isDeedsDBReady && <DeedList data={deeds} />}</>,
    effects: undefined,
    creatures: undefined,
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchAppBar onToggleSidebar={toggleSidebar}></SearchAppBar>
      <Sidebar
        state={isSidebarOpen}
        toggle={toggleSidebar}
        options={sidebarOptions}
      ></Sidebar>
      {contents[content]}
    </ThemeProvider>
  );
}
