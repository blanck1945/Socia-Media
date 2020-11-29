import { SayInterface } from "../actions/dataActions/dataActions";
import { DataActionTypes } from "../actions/dataActions/dataInterface";
import * as DataTypes from "../types";

interface CommentInterface {
  sayingId: string;
  body: string;
  createdAt: any;
  user: string;
  imageUrl: string;
}

export interface DataInitialState {
  sayings: SayInterface[];
  singleSay: SayInterface;
  searchResult: any;
  comments: CommentInterface[];
  OwnSayings: SayInterface[];
  loading: boolean;
  sayLength: number;
}

const dataInitialState = {
  sayings: undefined,
  singleSay: undefined,
  comments: undefined,
  OwnSayings: undefined,
  searchResult: undefined,
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
    case DataTypes.SET_OWN_SAYINGS:
      return {
        ...state,
        OwnSayings: action.payload,
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
        (say) => say._id === action.payload._id
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
        OwnSayings: [action.payload, ...state.OwnSayings],
      };
    case DataTypes.TOOGLE_MODAL:
      return {
        ...state,
        sayLength: 149,
      };
    case DataTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case DataTypes.CLEAR_COMMENTS:
      return {
        ...state,
        comments: undefined,
      };
    case DataTypes.SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload,
      };
    case DataTypes.ADD_NEW_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case DataTypes.SET_DATA_TO_INITIAL:
      return dataInitialState;
    default:
      return state;
  }
};

export default DataReducer;
