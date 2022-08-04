import { SET_SELECTED_IMAGE } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SELECTED_IMAGE:
      return { ...state, selectedImage: payload };
    default:
      return state;
  }
}
