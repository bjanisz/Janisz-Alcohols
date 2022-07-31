export const actionType = {
  SET_USER: "SET_USER",
  SET_WHISKY_ITEMS: "SET_WHISKY_ITEMS",
  SET_CARD_SHOW: "SET_CARD_SHOW",
  SET_CARD_ITEMS: "SET_CARD_ITEMS"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_WHISKY_ITEMS:
      return {
        ...state,
        whiskyItems: action.whiskyItems,
      };

    case actionType.SET_CARD_SHOW:
      return {
        ...state,
        cardShow: action.cardShow,
      };

      case actionType.SET_CARD_ITEMS:
      return {
        ...state,
        cardItems: action.cardItems,
      };

    default:
      return state;
  }
};

export default reducer;
