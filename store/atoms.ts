import { atom } from "jotai";

export const showOutput = atom(false)

export const flightResult = atom([])

export const showError = atom(false)

export const errorLabel = atom("NO_ERROR")

export const showCards = atom(true)

export const cards = atom([])

export const loadingResults = atom(false)

export const darkMode = atom(true)