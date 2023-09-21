const initialState = {
  isAllContactModalVisible: true,
  isUsContactModalVisible: true,
  isDetailModalVisible: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE":
      return {
        ...state,
        isAllContactModalVisible: false,
        isUsContactModalVisible: false,
        isDetailModalVisible: false,
      };
    case "ALL_CONTACTS":
      return { ...state, isAllContactModalVisible: true };
    case "US_CONTACTS":
      return { ...state, isUsContactModalVisible: true };
    case "SHOW_CONTACT_DETAILS":
      return { ...state, isDetailModalVisible: true };
    case "CLOSE_CONTACT_DETAILS":
      return { ...state, isDetailModalVisible: false };
    default:
      return state;
  }
};

export default rootReducer;
