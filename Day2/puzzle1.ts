import { getData } from "../helpers/getData.ts";

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

type TCombo = {
  red?: number;
  green?: number;
  blue?: number;
};

type TGame = {
  id: number;
  draws: Array<TCombo>;
};

const getPullNumber = (pull: string) => {
  return parseInt(pull.match(/\d+/g)![0]);
}

// could just use regex to avoid the switch and return { [name]: getPullNumber(pull) }?
const determinePull = (pull: string) => {
  switch (true) {
    case pull.includes('green'):
      return { green: getPullNumber(pull) };
    case pull.includes('red'):
      return { red: getPullNumber(pull) };
    case pull.includes('blue'):
      return { blue: getPullNumber(pull) };
  }
}

const getId = (input: string) => {
  const game = input.split(':');
  const id = parseInt(game[0].match(/\d+/g)![0]);

  return [id, game[1]];
};

const getCombos = (input: string) => {
  const comboStrings = input.split(';');

  const combos = comboStrings.map(combo => {
    const pulls = combo.trim().split(',');

    const result: TCombo = pulls.reduce<TCombo>((acc, v) => ({
      ...determinePull(v),
      ...acc,
    }), {});

    return result;
  });

  return combos;
};

const isGamePossible = (game: TGame) => {
  return !game.draws.find(x => x.red > MAX_RED || x.green > MAX_GREEN || x.blue > MAX_BLUE);
};

const solve = (data: Array<string>) => {
  const games: Array<TGame> = data.map(input => {
    const [id, game] = getId(input);
    return {
      id: id as number,
      draws: getCombos(game as string),
    };
  });

  const possibleGames = games.filter(x => isGamePossible(x));

  const result = possibleGames.reduce<number>((acc, v) => acc + v.id, 0);

  console.log(result);
};

getData('./full.txt', solve);