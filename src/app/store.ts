import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { songReducer } from "../features/songs/SongSlice";
import rootSaga from "../features/songs/SongSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
