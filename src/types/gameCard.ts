export interface GameCard {
  /**
   * Порядковый номер карты
   */
  idCard: number,
  /**
   * ID/Номер масти
   */
  idSuit: number,
  /**
   * Значение карты (от 6 до 13)
   */
  cardValue: number,
  /**
   * Название масти карты
   */
  nameSuit: string
}