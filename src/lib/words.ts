import { WORDS } from '../constants/wordlist'

const Typo = require('typo-js');
const dictionary = new Typo('en_US', false, false, { dictionaryPath: 'dic' });

export const isWordInWordList = (word: string) => {
  const transformedWord = word.toLowerCase();

  return (
    WORDS.includes(transformedWord) ||
    dictionary.check(transformedWord)
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
