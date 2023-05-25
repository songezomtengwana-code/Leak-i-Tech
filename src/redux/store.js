import { legacy_createStore } from "redux";
import counter_reducer from "./reducers/counter_reducer";
import catergory_reducer from "./reducers/catergory_reducer";
const store = legacy_createStore(
  counter_reducer
);

const option = legacy_createStore(
  catergory_reducer
);

export { store,option }; 