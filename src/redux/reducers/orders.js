import { 
  ADD_ORDER,
  REMOVE_ORDER,
  APPROVE_ORDER,
  DECLINE_ORDER
} from '../types'

const initialState = {
  items: []
};
  
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return { ...state, items: [ ...state.items, action.payload ]};
    case REMOVE_ORDER:
      return { ...state, items: state.items.filter(item => item?.id !== action.payload) };
    case APPROVE_ORDER:
      return { ...state, items: state.items.map(item => {
        if (item?.id === action.payload)
          item.status = 'approved';
        return item
      }) };
    case DECLINE_ORDER:
      return { ...state, items: state.items.map(item => {
        if (item?.id === action.payload)
          item.status = 'declined';
        return item
      }) };
    default:
      return state;
  }
}