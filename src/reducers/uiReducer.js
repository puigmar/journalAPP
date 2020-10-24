import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: {},
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: {
          ...state.msgError,
          [action.payload.field]: action.payload.err,
        },
      };

    case types.uiRemoveError:
      delete state.msgError[action.payload];
      return {
        ...state,
        msgError: {
          ...state.msgError,
        },
      };

    default:
      return state;
  }
};
