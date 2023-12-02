import { getData } from "../helpers/getData.ts";
import {
  TCombo,
  TGame,
  getGames,
} from "./puzzle1.ts";

const getMinValue = (acc?: number, v?: number) => {
  switch (true) {
    case (!acc && !v):
      return undefined;
    case (!acc):
      return v;
    case (!v):
      return acc;
    default:
      return Math.max(acc, v);
  }
};

const getMinCombo = (game: TGame) => {
  return game.draws.reduce<TCombo>((acc, v) => ({
    red: getMinValue(acc.red, v.red),
    blue: getMinValue(acc.blue, v.blue),
    green: getMinValue(acc.green, v.green),
  }), game.draws[0]);
};

const solve = (data: Array<string>) => {
  const games = getGames(data);  
  const minCombos = games.map(game => getMinCombo(game));
  const powers = minCombos.map(({ red, green, blue }) => red * green * blue);
  const result = powers.reduce<number>((acc, v) => acc + v, 0);
  
  console.log(result);
};

getData('./full.txt', solve);