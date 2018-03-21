
export const showModal = (e) => {
    console.log(e);
  return {
    type: 'loginModal/SHOW_MODAL', 
    payload: e,
  }
}

export const hideModal = (e) => {
    console.log(1);
    return {
      type: 'loginModal/HIDE_MODAL', 
      payload: e,
    }
  }

