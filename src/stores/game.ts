import { makeObservable, observable, action, computed, flow } from "mobx";
import { createContext, useContext, MouseEvent } from "react";

import axios from "lib/axios";
import { GameSettingsInfo, OpponentInfo } from "types/game";
import { AxiosResponse } from "axios";
import { GameCard } from "types/gameCard";
import { GameTableStore } from "./gameTable";
import { GameLogsStore } from "./gameLogs";
import { CANT_DO_IT } from "consts/messages";

export class Game {
  /**
   * Доступ к игре запрещён
   */
  accessDenied: boolean;

  /**
   * ID игры
   */
  gameId: string = "";

  /**
   * Игра занята общением с api?
   */
  busy: boolean = true;

  /**
   * Козырная карта
   */
  trumpCard: GameCard = { cardValue: 0, idCard: 0, idSuit: 0, nameSuit: "" };

  /**
   * Количество карт в колоде
   */
  countCards: number = 1;

  /**
   * Инфа об оппоненте
   */
  opponent: OpponentInfo = { countCards: 0, name: "", numberPlayer: 0 };

  /**
   * Чей сейчас ход? - Номер игрока
   */
  whoseTurn: number = 0;

  /**
   * Карты на руках у пользователя
   */
  userCards: GameCard[] = [];

  gameTable: GameTableStore;
  logs: GameLogsStore;

  constructor(gameId: string) {
    makeObservable(
      this,
      {
        accessDenied: observable,
        gameId: observable,
        busy: observable,
        trumpCard: observable,
        countCards: observable,
        opponent: observable,
        whoseTurn: observable,
        userCards: observable,
        fetchGameSetting: flow,
        onClickCard: action,
        gameBusy: computed,
      },
      { autoBind: true }
    );
    this.accessDenied = false;
    this.gameId = gameId;
    this.gameTable = new GameTableStore(this);
    this.logs = new GameLogsStore(this);
  }

  *fetchGameSetting(): Generator {
    this.busy = true;
    const response = yield axios.get(`/game/setting?id=${this.gameId}`, {
      headers: this.getHeaderAuthToken(),
    });
    this.busy = false;
    const {
      game: {
        trumpCard: idCard,
        trumpCardValue: cardValue,
        trumpIdSuit: idSuit,
        trumpNameSuit: nameSuit,
        countCards,
        whoseTurn,
      },
      opponent,
      userCards,
    } = (response as AxiosResponse<GameSettingsInfo>).data;
    console.log("response.data.game :>> ", (response as any).data.game);
    this.trumpCard = { idCard, cardValue, idSuit, nameSuit };
    this.countCards = countCards;
    this.opponent = opponent;
    this.userCards = userCards;
    this.whoseTurn = whoseTurn;
  }

  getHeaderAuthToken() {
    const token = localStorage.getItem("gamerToken");
    return { Authorization: `Bearer ${token}` };
  }

  /**
   * Сейчас ходит оппонент?
   * Если да- его имя, если нет- пустая строка
   */
  opponentWhoseTurn = () => {
    const { name, numberPlayer } = this.opponent;
    return numberPlayer === this.whoseTurn ? name : "";
  };

  /**
   * Обработка нажатия на карту игрока
   */
  onClickCard = (e: MouseEvent<HTMLButtonElement>) => {
    const cardId = e.currentTarget.getAttribute("data-card-id");
    if (cardId === null) {
      this.logs.addMessage("system", "Не возможно обработать это действие");
      return;
    }
    const canDoThisTurn = this.checkCanDoThisTurn(+cardId);
    if (!canDoThisTurn) {
      return this.logs.addMessage("system", CANT_DO_IT);
    }
  };

  /**
   * Может ли пользователь сделать этот ход?
   */
  private checkCanDoThisTurn = (idCard: number) => {
    // Сейчас ходит оппонент?
    const nowTurnOpponent = !!this.opponentWhoseTurn();

    // Если ходит оппонент, проверить возможность оппонента
    if (nowTurnOpponent) {
      return this.checkTurnDefence(idCard);
    }
    // Если ходит игрок, проверить возможность нападения
    return this.checkTurnAttack(idCard);
  };

  /**
   * Проверка на то, что юзер может так отбиться
   */
  private checkTurnDefence = (idCard: number) => {
    if (this.gameTable.table.length === 0) {
      return false;
    }
  };

  /**
   * Проверка на то, что пользователь может так сходить
   */
  private checkTurnAttack = (idCard: number) => {
    if (this.gameTable.table.length === 0) {
      return true;
    }
  };

  get gameBusy() {
    return this.busy || this.gameTable.busy;
  }
}

export const GameContext = createContext<{ game: Game }>({} as { game: Game });

export const useGameStore = (): { game: Game } => {
  return useContext(GameContext);
};
