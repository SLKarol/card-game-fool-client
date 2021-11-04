import { makeObservable, observable, computed, flow } from "mobx";
import { createContext, useContext, MouseEvent } from "react";

import { GameOver, GameSettingsInfo, OpponentInfo } from "types/game";
import { GameCard } from "types/gameCard";

import axios, { getAxiosErrorMessage } from "lib/axios";
import { calculateSuit, calculateValue } from "lib/cards";
import { AxiosResponse } from "axios";
import { GameTableStore } from "./gameTable";
import { GameLogsStore } from "./gameLogs";
import { CANT_DO_IT } from "consts/messages";
import { UserCardsStore } from "./userCards";

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
  userCards: UserCardsStore;

  /**
   * Игра окончена?
   */
  gameOpen: boolean = true;

  gameTable: GameTableStore;
  logs: GameLogsStore;
  /**
   * Победители в игре
   */
  scores: string[] = [];

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
        onClickCard: flow,
        gameBusy: computed,
        userTurn: flow,
        disabledButton: computed,
        finishTurn: flow,
        nextStateGame: flow,
        gameOpen: observable,
        scores: observable,
        fetchGameScore: flow,
        getOpponentCards: flow,
      },
      { autoBind: true }
    );
    this.accessDenied = false;
    this.gameId = gameId;
    this.gameTable = new GameTableStore(this);
    this.logs = new GameLogsStore(this);
    this.userCards = new UserCardsStore(this);
    this.onClickCard = this.onClickCard.bind(this);
    this.fetchGameSetting = this.fetchGameSetting.bind(this);
    this.finishTurn = this.finishTurn.bind(this);
    this.nextStateGame = this.nextStateGame.bind(this);
  }

  *fetchGameSetting(): Generator {
    this.busy = true;
    const response = yield axios.get(`/game/setting?id=${this.gameId}`, {
      headers: this.getHeaderAuthToken(),
    });
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
      gameOpen,
      victory,
    } = (response as AxiosResponse<GameSettingsInfo>).data;
    this.trumpCard = { idCard, cardValue, idSuit, nameSuit };
    this.countCards = 1 * countCards;
    this.opponent = opponent;
    this.userCards.setCards(userCards);
    this.whoseTurn = whoseTurn;
    this.gameOpen = gameOpen;
    this.scores = victory;
    this.busy = false;
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
  *onClickCard(e: MouseEvent<HTMLButtonElement>): Generator {
    const cardId = e.currentTarget.getAttribute("data-card-id");
    if (cardId === null) {
      this.logs.addMessage("system", "Не возможно обработать это действие");
      return;
    }
    const canDoThisTurn = this.checkCanDoThisTurn(+cardId);
    if (!canDoThisTurn) {
      return this.logs.addMessage("system", CANT_DO_IT);
    }
    // Ходит пользователь
    // Отправить карту на доску
    yield this.userTurn(+cardId);
  }

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
    if (this.gameTable.table.size === 0) {
      return false;
    }
    // Масть карты игрока
    const suitCard = calculateSuit(idCard);
    // Значение карты игрока
    const valueCard = calculateValue(idCard);
    // Получить неотбитую карту
    const attackCardId = this.gameTable.attackCardId;
    // Масть неотбитой карты
    const suitAttack = calculateSuit(attackCardId);
    // Значение неотбитой карты
    const valueAttack = calculateValue(attackCardId);
    // Если масть одинаковая и значение отбиваемой карты больше, то можно отбивать
    if (suitCard === suitAttack && valueCard > valueAttack) {
      return true;
    }
    // Если отбиваюсь козырем, а нападет не козырь, то можно отбивать
    if (
      suitCard === this.trumpCard.idSuit &&
      suitAttack !== this.trumpCard.idSuit
    ) {
      return true;
    }

    // Иначе нельзя отбиться
    return false;
  };

  /**
   * Проверка на то, что пользователь может так сходить
   */
  private checkTurnAttack = (idCard: number) => {
    // Если нет карт на столе, значит он может ходить
    if (this.gameTable.table.size === 0) {
      return true;
    }
    // Хватит ли карт у оппонента чтобы отбить?
    // if (this.gameTable.countFreeCards >= 1 * this.opponent.countCards) {
    //   return false;
    // }
    const cardValue = calculateValue(idCard);
    // Можно ходить только тем значением, которое есть на доске
    return Array.from(this.gameTable.cardValues).indexOf(cardValue) > -1;
  };

  get gameBusy() {
    return this.busy || this.gameTable.busy;
  }

  /**
   * Пользователь ходит картой
   */
  *userTurn(cardId: number): Generator {
    this.busy = true;
    try {
      yield axios.post(
        "game/turn",
        { turn: { gameId: this.gameId, cardId } },
        {
          headers: this.getHeaderAuthToken(),
        }
      );
      // Убрать карту из рук
      this.userCards.delete(+cardId);
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      this.logs.addMessage("system", `Ошибка: ${errorMessage}`);
    }
    this.busy = false;
  }

  /**
   * Недоступна кнопка "Ход окончен", она же "Беру"
   */
  get disabledButton() {
    const myTurn = !this.opponentWhoseTurn();
    if (myTurn) {
      // Если я хожу, то кнопка тогда недоступна, когда есть неотвеченные карты
      if (this.gameTable.table.size === 0) return true;
      return this.gameTable.attackCardId > -1;
    }
    // Отбивающийся всегда может взять карты, если они есть
    return this.gameTable.table.size === 0;
  }

  /**
   * Игрок заканчивает ход (Это может быть и взятие карт и завершение хода)
   */
  *finishTurn(): Generator {
    this.busy = true;
    try {
      yield axios.post<{ turn: { gameId: string } }, AxiosResponse<GameOver>>(
        "game/finishTurn",
        { turn: { gameId: this.gameId } },
        {
          headers: this.getHeaderAuthToken(),
        }
      );
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      this.logs.addMessage("system", `Ошибка: ${errorMessage}`);
    }
    this.busy = false;
  }

  *nextStateGame(data: { gameReady: boolean }) {
    const { gameReady } = data;
    // Если кто-то сейчас ходит, значит игра продолжается
    // И нужно получить новую инфу о игре
    yield this.fetchGameSetting();
    if (gameReady) {
      const nowTurn = this.opponentWhoseTurn();
      this.gameTable.clear();
      return this.logs.addMessage(
        "system",
        !nowTurn ? "Мой ход" : `Сейчас ходит: ${nowTurn}`
      );
    }
    this.gameOpen = false;
    yield this.fetchGameScore();
  }

  *fetchGameScore(): Generator {
    this.busy = true;
    try {
      const response = yield axios.get(`report/${this.gameId}`);
      this.scores = (response as AxiosResponse<string[]>).data;
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      this.logs.addMessage("system", `Ошибка: ${errorMessage}`);
    }
    this.busy = false;
  }

  /**
   * Получить количество карт оппонента
   */
  *getOpponentCards(): Generator {
    const response = yield axios.get(`/game/opponent/${this.gameId}`, {
      headers: this.getHeaderAuthToken(),
    });
    this.opponent.countCards = 1 * (response as AxiosResponse<number>).data;
  }
}

export const GameContext = createContext<Game>({} as Game);

export const useGameStore = (): Game => {
  return useContext(GameContext);
};
