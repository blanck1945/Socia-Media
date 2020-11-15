import { SayInterface } from "../actions/dataActions/dataActions";
import { DataActionTypes } from "../actions/dataActions/dataInterface";
import * as DataTypes from "../types";

export interface DataInitialState {
  sayings: [SayInterface];
  singleSay: SayInterface;
  loading: boolean;
  sayLength: number;
}

const dataInitialState = {
  sayings: undefined,
  singleSay: undefined,
  loading: false,
  sayLength: 149,
};

const DataReducer = (
  state = dataInitialState,
  action: DataActionTypes | any
) => {
  switch (action.type) {
    case DataTypes.SET_LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case DataTypes.SET_SAYINGS:
      return {
        ...state,
        loading: false,
        sayings: action.payload,
      };
    case DataTypes.SET_ONE_SAY:
      return {
        ...state,
        loading: false,
        singleSay: action.payload,
      };
    case DataTypes.LIKE_SAY:
    case DataTypes.UNLIKE_SAY:
      let index = state.sayings.findIndex(
        (say) => say.sayingId === action.payload.sayingId
      );
      state.sayings[index] = action.payload;
      return {
        ...state,
      };
    case DataTypes.DELETE_SAY:
      index = state.sayings.findIndex((say) => say.sayingId === action.payload);
      state.sayings.splice(index, 1);
      // const newArr = state.sayings.filter(
      //   (say) => say.sayingId !== action.payload.sayId
      // );
      return {
        ...state,
      };
    case DataTypes.POST_SAY:
      return {
        ...state,
        loading: false,
        sayings: [action.payload, ...state.sayings],
      };
    case DataTypes.TOOGLE_MODAL:
      return {
        ...state,
        sayLength: 149,
      };

    default:
      return state;
  }
};

export default DataReducer;
