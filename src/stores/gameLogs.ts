import { makeObservable, observable } from "mobx";

import { Game } from "./game";

type TypeMessage = "system" | "gamer" | "opponent";

interface Log {
  message: string;
  typeMessage: TypeMessage;
}

/**
 * Хранилище состтояния игровой таблицы
 */
export class GameLogsStore {
  logs: Map<string, Log>;

  constructor(private gameStore: Game) {
    makeObservable(
      this,
      {
        logs: observable,
      },
      { autoBind: true }
    );
    this.logs = new Map<string, Log>();
  }

  addMessage(type: TypeMessage, message: string) {
    this.logs.set(new Date().toISOString(), { typeMessage: type, message });
  }
}
