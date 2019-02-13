import moment from 'moment'
import dot from 'dot-object'

function numberWithCommas (x) {
  if (!x) {
    return x
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default function (column, keyName, data) {
  if (column['type'] && column['type'] === 'date') {
    const format = 'YYYY-MM-DD'
    const v = dot.pick(keyName, data)
    if (!v) {
      return v
    }
    return moment(new Date(v)).format(format)
  } else if (column['type'] && column['type'] === 'month') {
    const format = 'YYYY-MM'
    const v = dot.pick(keyName, data)
    if (!v) {
      return v
    }
    return moment(new Date(v)).format(format)
  } else if (column['type'] && column['type'] === 'datetime') {
    const format = 'YYYY-MM-DD HH:mm:ss'
    const v = dot.pick(keyName, data)
    if (!v) {
      return v
    }
    return moment(new Date(v)).format(format)
  } else if (column['type'] && column['type'] === 'currency') {
    const v = dot.pick(keyName, data)
    return `${numberWithCommas(Math.floor(v))} 원`
  } else if (column['type'] && column['type'] === 'phone') {
    const v = dot.pick(keyName, data)
    if (!v) {
      return v
    }
    if (v.length === 11) {
      return `${v.substring(0,3)}-${v.substring(3, 7)}-${v.substring(7, 11)}`
    } else if (v.length === 10) {
      return `${v.substring(0,3)}-${v.substring(3, 6)}-${v.substring(6, 10)}`
    } else {
      return v
    }
  }
  return dot.pick(keyName, data)
}