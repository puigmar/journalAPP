import { types } from "../types/types";

export const setError = (field, err) => ({
  type: types.uiSetError,
  payload: {
    field,
    err,
  },
});

export const unsetError = (field) => ({
  type: types.uiRemoveError,
  payload: field,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});
