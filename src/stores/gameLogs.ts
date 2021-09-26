import { makeObservable, observable, action } from "mobx";
import { parseJSON } from "date-fns";

import { Game } from "./game";

type TypeMessage = "system" | "gamer" | "opponent";

interface Log {
  message: string;
  typeMessage: TypeMessage;
}

/**
 * Хранилище состояния игровой таблицы
 */
export class GameLogsStore {
  logs: Map<string, Log>;

  constructor(private gameStore: Game) {
    makeObservable(
      this,
      {
        logs: observable,
        addMessage: action.bound,
        parseMessage: action.bound,
      },
      { autoBind: true }
    );
    this.logs = new Map<string, Log>();
  }

  addMessage(type: TypeMessage, message: string) {
    this.logs.set(new Date().toISOString(), { typeMessage: type, message });
  }

  parseMessage({
    message,
    sender,
    dateTime,
  }: {
    message: string;
    sender: string;
    dateTime: string;
  }) {
    this.logs.set(parseJSON(dateTime).toISOString(), {
      typeMessage: sender as TypeMessage,
      message,
    });
  }
}
