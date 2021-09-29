import { makeObservable, observable, flow, action, computed } from "mobx";

import { Game } from "./game";
import axios from "lib/axios";
import { AxiosResponse } from "axios";
import { calculateValue } from "lib/cards";

interface CardInTable {
  /**
   * ID атакующей карты
   */
  attack: number;
  /**
   * ID защищающейся карты
   */
  defence?: number;
}

interface TableInfoApi {
  /**
   * Номер шага
   */
  [I: string]: CardInTable;
}

/**
 * Хранилище состояния игровой таблицы
 */
export class GameTableStore {
  table: Map<number, CardInTable> = new Map();

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
        writeTableInfo: action,
        busy: observable,
        arrayCards: computed,
        cardValues: computed,
        attackCardId: computed,
      },
      { autoBind: true }
    );
  }

  *getContent(): Generator {
    this.busy = true;
    const response = yield axios.get(`/table?id=${this.gameStore.gameId}`, {
      headers: this.gameStore.getHeaderAuthToken(),
    });
    this.writeTableInfo((response as AxiosResponse<TableInfoApi>).data);
    this.busy = false;
  }

  writeTableInfo = (data: TableInfoApi) => {
    this.table.clear();
    Object.keys(data).forEach((key) => {
      this.table.set(+key, data[key]);
    });
  };

  get arrayCards() {
    const content: CardInTable[] = [];
    this.table.forEach((value) => {
      content.push(value);
    });
    return content;
  }

  /**
   * Значения карт на доске
   */
  get cardValues() {
    const re = new Set<number>();
    this.table.forEach((cards) => {
      const { attack, defence } = cards;
      re.add(calculateValue(attack));
      if (defence) {
        re.add(calculateValue(defence));
      }
    });
    return re;
  }

  /**
   * Атакующая карта, которая не отбита
   */
  get attackCardId() {
    // Array.from
    // const i = this.table.entries();
    // i.next
    let re: number = -1;
    for (let [key, value] of this.table) {
      if (!value.defence) {
        re = value.attack;
        break;
      }
    }
    return re;
  }
}
