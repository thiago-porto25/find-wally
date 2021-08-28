export const findPercentage = (num, den) => {
  const result = Math.round((num * 100) / den)
  return `${result}%`
}

export const findCoordinate = (perc, den) => {
  const result = Math.round((perc * den) / 100)

  return result
}
