import { makeObservable, observable, flow } from "mobx";

import { Game } from "./game";
import { GameCard } from "types/gameCard";
import axios from "lib/axios";
import { AxiosResponse } from "axios";

interface TableCard {
  id: string;
  attack: GameCard;
  defence?: GameCard;
}

/**
 * Хранилище состтояния игровой таблицы
 */
export class GameTableStore {
  table: TableCard[] = [];

  /**
   * Стол опрашивает api?
   */
  busy: boolean = true;

  constructor(private gameStore: Game) {
    makeObservable(
      this,
      {
        table: observable,
        getContent: flow,
      },
      { autoBind: true }
    );
  }

  *getContent(): Generator {
    this.busy = true;
    const response = yield axios.get(`/table?id=${this.gameStore.gameId}`, {
      headers: this.gameStore.getHeaderAuthToken(),
    });
    console.log("response :>>", response);
    console.log("response.data :>> ", (response as any).data);
    this.table = (response as AxiosResponse<any>).data.table;
    this.busy = false;
  }
}
