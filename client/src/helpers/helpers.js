import dateFormat from 'dateformat'

export const changeToInitials = (name) => {
  return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
}

export const changeDate = (due_date) => {
  const dueDateToDate = parseDate(due_date)
  return dateFormat(dueDateToDate, 'mmmm dd, yyyy')
}

export const changeDateToApiFormat = (date) => {
  return dateFormat(date, 'yyyy-mm-dd')
}

export const parseDate = (date) => {
  let parts = date.split('-')
  return new Date(parts[0], parts[1] - 1, parts[2])
}
