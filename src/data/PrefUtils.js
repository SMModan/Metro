import AsyncStorage from '@react-native-community/async-storage';
import {API_TOKEN, USER} from './PrefKeys';

export const setItem = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const getItem = async (key) => {
  const value = await AsyncStorage.getItem(key);

  return value;
};

export const setToken = async (value) => {
  await AsyncStorage.setItem(API_TOKEN, value);
};

export const getToken = async () => {
  let token = await AsyncStorage.getItem(API_TOKEN);
  if (token == null) {
    token = '';
  }
  return token;
};

export const setUser = async (value) => {
  await AsyncStorage.setItem(USER, value);
};

export const getUser = async () => {
  let user = await AsyncStorage.getItem(USER);
  if (user == null) {
    user = '';
  }
  return user;
};

export const removeItem = async (value) => {
  await AsyncStorage.removeItem(value);
};
