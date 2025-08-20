import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchStats,
  fetchStatsSuccess,
  fetchStatsFailure,
  addSong,
  updateSong,
  deleteSong,
} from "./SongSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { NewSong, Song } from "../../types/song";
import API_BASE_URL from "../../config";

const SONGS_URL = `${API_BASE_URL}/songs`;

function* fetchSongsWorker() {
  try {
    const { data } = yield call(axios.get, SONGS_URL);
    yield put(fetchSongsSuccess(data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* fetchStatsWorker() {
  try {
    const { data } = yield call(axios.get, `${SONGS_URL}/stats/data`);
    yield put(fetchStatsSuccess(data));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message));
  }
}

function* addSongWorker(action: PayloadAction<NewSong>) {
  try {
    yield call(axios.post, SONGS_URL, action.payload);
    yield call(fetchSongsWorker);
    yield call(fetchStatsWorker);
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* updateSongWorker(action: PayloadAction<Song>) {
  try {
    yield call(axios.put, `${SONGS_URL}/${action.payload._id}`, action.payload);
    yield call(fetchSongsWorker);
    yield call(fetchStatsWorker);
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* deleteSongWorker(action: PayloadAction<string>) {
  try {
    yield call(axios.delete, `${SONGS_URL}/${action.payload}`);
    yield call(fetchSongsWorker);
    yield call(fetchStatsWorker);
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchSongs.type, fetchSongsWorker),
    takeLatest(fetchStats.type, fetchStatsWorker),
    takeLatest(addSong, addSongWorker),
    takeLatest(updateSong, updateSongWorker),
    takeLatest(deleteSong, deleteSongWorker),
  ]);
}
