const italianMonths = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
]

const timestampToItalianDate = (timestamp) => {
  const datetime = new Date(timestamp.replace(/\s+/g, ''))
  const day = datetime.getDate()
  const monthIndex = datetime.getMonth()
  const month = italianMonths[monthIndex]
  const year = datetime.getFullYear()
  const date = (day + ' ' + month + ' ' + year)

  const hours = datetime.getHours()
  const minutes = String(datetime.getMinutes()).padStart(2, '0')
  const time = (hours + ':' + minutes)
  return { date, time }
}

export default {
  timestampToItalianDate
}
