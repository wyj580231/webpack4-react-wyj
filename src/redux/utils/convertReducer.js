export default function(models) {
  let result = {};
  for (let model of models) {
    for (let reducerName in model.reducers) {
      if (model.reducers.hasOwnProperty(reducerName)) {
        model.reducers[`${model.namespace}/${reducerName}`] =
          model.reducers[reducerName];
        delete model.reducers[reducerName];
      }
    }
    result[model.namespace] = (state = model.state, action) => {
      return model.reducers.hasOwnProperty(action.type)
        ? model.reducers[action.type](state, action)
        : state;
    };
  }
  return result;
}
