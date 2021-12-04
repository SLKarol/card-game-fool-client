import type { FC } from "react";
import { useEffect, useState } from "react";
import { useRootStore } from "stores/root";
import axios from "lib/axios";
import { useLocalStorage } from "lib/useLocalStorage";
import MyGamesNumber from "./MyGamesNumber";

interface Report {
  allMyGames: number | null;
  myVictory: number | null;
}

const MyGames: FC = () => {
  const [report, setReport] = useState<Report>({
    allMyGames: null,
    myVictory: null,
  });
  const {
    userStore: { name },
  } = useRootStore();
  const [token] = useLocalStorage("gamerToken");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Report>("report/mygames", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReport(response.data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>
        Всего игр с участием {name}:
        <MyGamesNumber count={report.allMyGames} />
      </p>
      <p>
        Сколько раз выигрышей у {name}:
        <MyGamesNumber count={report.myVictory} />
      </p>
    </>
  );
};

export default MyGames;
