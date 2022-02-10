import { WORDS } from '../constants/wordlist'
import { getGuessStatuses } from './statuses'

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

const defaultMessage = ' Using word of the day instead.'

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return `Must use ${guess[i]} in position ${i + 1}`
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return `Guess must contain ${letter}`
    }
  }
  return false
}

export const getWordOfDay = () => {
  let query
  const location = window?.location;
  if (location?.search) {
    try {
      query = atob(location.search.slice(1)).toUpperCase()

      if (query.length !== 6) {
        alert(`Incorrect word length from encoded query. ${defaultMessage}`)
      }
    } catch (e) {
      alert(`Malformed encoded word query. ${defaultMessage}`)
    }
  }

  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  if (!query) {
    query = WORDS[index % WORDS.length].toUpperCase();
  }

  return {
    solution: query,
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
