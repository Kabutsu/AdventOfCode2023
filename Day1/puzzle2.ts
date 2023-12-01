import { getData } from "../helpers/getData.ts";

const regEx = /^(one|two|three|four|five|six|seven|eight|nine){1}/g;

const stringToInt = (input: string) => {
  switch(true) {
    case input === 'one':
      return 1;
    case input === 'two':
      return 2;
    case input === 'three':
      return 3;
    case input === 'four':
      return 4;
    case input === 'five':
      return 5;
    case input === 'six':
      return 6;
    case input === 'seven':
      return 7;
    case input === 'eight':
      return 8;
    case input === 'nine':
      return 9;
  }
};

const getDigits = (input: string) => {
  const charArr = [...input];

  const digitAIndex = charArr.findIndex((v, i) => !isNaN(parseInt(v)) || !!input.slice(i).match(regEx)?.length);
  const digitBIndex = charArr.findLastIndex((v, i) => !isNaN(parseInt(v)) || !!input.slice(i).match(regEx)?.length);

  const numberA = parseInt(input[digitAIndex]);

  const digitA = !isNaN(numberA)
    ? numberA
    : stringToInt(input.slice(digitAIndex).match(regEx)!.pop()!);

  const numberB = parseInt(input[digitBIndex]);

  const digitB = !isNaN(numberB)
    ? numberB
    : stringToInt(input.slice(digitBIndex).match(regEx)!.pop()!);

  return parseInt(`${digitA}${digitB}`);
}

const solve = (data: Array<string>) => {
  const result = data.reduce((acc: any, d: any) => {
    const digits = getDigits(d);
    return parseInt(acc) + digits;
  }, 0);

  console.log(result);
};

getData('./TestData/full.txt', solve);
