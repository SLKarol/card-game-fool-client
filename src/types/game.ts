import { GameCard } from "./gameCard";

/**
 * Открытая игра
 */
export interface OpenGameDto {
  idGame: string;
  nameUser: string;
  createdAt: string;
}

export interface OpponentInfo {
  /**
   * Количество карт в руке оппонента
   */
  countCards: number;

  /**
   * Имя оппонента
   */
  name: string;

  /**
   * Номер игрока-оппонента
   */
  numberPlayer: number;
}

/**
 * Информация по настройкам игры
 */
export interface GameSettingsInfo {
  /**
   * Информация по игре
   */
  game: {
    /**
     * Сейчас идёт ход нападающего?
     */
    attack: boolean;

    /**
     * Номер текущего игрока
     */
    numberPlayer: number;

    /**
     * Какой игрок ходит?
     */
    whoseTurn: number;

    /**
     * номер козырной карты
     */
    trumpCard: number;

    /**
     * Значение карты
     */
    trumpCardValue: number;

    /**
     * Название масти
     */
    trumpNameSuit: string;

    /**
     * ID масти козыря
     */
    trumpIdSuit: number;

    /**
     * Количество карт в колоде
     */
    countCards: number;
  };

  /**
   * Карты на руках у пользователя
   */
  userCards: GameCard[];

  /**
   * Инфа об оппоненте
   */
  opponent: OpponentInfo;

  /**
   * Игра окрыта?
   */
  gameOpen: boolean;

  /**
   * Кто в этой игре победил?
   */
  victory: string[];
}

export interface GameOver {
  game: { id: string; gameReady: boolean };
}
