import { getData } from "../helpers/getData.ts";

const getDigits = (input: string) => {
  const digits = input.match(/\d{1}/g)!.map(x => x);
  return parseInt(`${digits[0]}${digits[digits.length - 1]}`);
}

const solve = (data: Array<string>) => {
  const result = data.reduce((acc: any, d: any) => {
    const digits = getDigits(d);
    return parseInt(acc) + digits;
  }, 0);

  console.log(result);
};

getData('./TestData/full.txt', solve);
