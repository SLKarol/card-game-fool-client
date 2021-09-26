import { makeObservable, observable, action, computed } from "mobx";

import { GameCard } from "types/gameCard";
import { Game } from "./game";

/**
 * Хранилище карт в руках игрока
 */
export class UserCardsStore {
  cards: Map<number, Partial<GameCard>>;

  constructor(private gameStore: Game) {
    makeObservable(
      this,
      {
        cards: observable,
        setCards: action.bound,
        idsCards: computed,
        delete: action.bound,
      },
      { autoBind: true }
    );
    this.cards = new Map<number, Partial<GameCard>>();
  }

  /**
   * Назначить карты в руку игрока
   */
  setCards(cards: GameCard[]) {
    this.cards = new Map<number, Partial<GameCard>>();
    cards.forEach((card) => {
      const { idCard, cardValue, idSuit, nameSuit } = card;
      this.cards.set(idCard, { cardValue, idSuit, nameSuit });
    });
  }

  /**
   * Получить массив ID карт
   */
  get idsCards() {
    return Array.from(this.cards.keys());
  }

  delete(id: number) {
    this.cards.delete(id);
  }
}
