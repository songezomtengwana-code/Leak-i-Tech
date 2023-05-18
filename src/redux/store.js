import { legacy_createStore } from "redux";
import counter_reducer from "./reducers/counter_reducer";
const store = legacy_createStore(
  counter_reducer
);
export { store }; 