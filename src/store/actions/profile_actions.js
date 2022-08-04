import { SET_SELECTED_IMAGE } from "../types";

export function getSelectedImage(selectedImage) {
  return {
    type: SET_SELECTED_IMAGE,
    payload: selectedImage,
  };
}
