/**
 * Получение номера карты
 */
export const calculateValue = (cardId: number) => {
  const value = cardId % 9;
  if (value > 0) {
    return value;
  }
  return 9;
};

/**
 * Получение масти карты
 */
export const calculateSuit = (cardId: number) => {
  return 1 + Math.trunc((cardId - 1) / 9);
};
