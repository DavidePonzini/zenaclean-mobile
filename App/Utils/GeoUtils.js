const composeAddress = (obj) => {
  let inCaseOfFailure = 'Indirizzo sconosciuto'
  try {
    let rn = obj.find(component => component.types.includes('route'))
    if (rn == null) {
      return obj.find(component => component.types.includes('political')).short_name
    }
    let roadName = rn.short_name
    if (roadName === 'Unnamed Road') {
      return inCaseOfFailure
    }
    let sn = obj.find(component => component.types.includes('street_number'))
    let streetNumber = sn == null ? '' : sn.short_name
    return roadName + ' ' + streetNumber
  } catch (e) {
    console.error(e)
    return inCaseOfFailure
  }
}

export {
  composeAddress
}
