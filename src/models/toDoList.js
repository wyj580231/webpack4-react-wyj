import { delay } from "redux-saga";
export default {
  namespace: "toDoList",
  state: {
    sagaTab: "Everything",
    list: [
      { text: "test1", time: "2018-12-06 09:39:17", completed: false },
      { text: "test2", time: "2018-12-07 09:39:17", completed: false },
      { text: "test3", time: "2018-12-08 09:39:17", completed: true },
      { text: "test4", time: "2018-12-09 09:39:17", completed: true },
      { text: "test5", time: "2018-12-10 09:39:17", completed: false }
    ]
  },
  effects: {
    *sagaTest({ put, select }, { payload }) {
      let { list } = yield select(state => state.toDoList);
      yield delay(2000);
      list.push(payload.item);
      yield put({ type: "toDoList/save", payload: { list } });
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
