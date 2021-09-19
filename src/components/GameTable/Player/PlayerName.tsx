import { FC } from "react";
import { observer } from "mobx-react";

import { useRootStore } from "stores/root";
import PlayerName from "../Common/PlayerName";

const Name: FC = () => {
  const {
    userStore: { name },
  } = useRootStore();
  return <PlayerName name={name} opponent={false} />;
};

export default observer(Name);
