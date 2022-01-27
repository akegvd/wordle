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
  const epochMs = 1641013200000
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)

  return {
    solution: (WORDS[index] ?? WORDS?.[0])?.toUpperCase(),
    solutionIndex: index,
  }
}

export const { solution, solutionIndex } = getWordOfDay()
