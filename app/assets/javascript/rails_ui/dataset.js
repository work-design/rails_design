// el.dataset.add('controller', 'xx')
// el.dataset.add('', 'xx')
DOMStringMap.prototype.add = function(name, value) {
  if (typeof this[name] === 'string') {
    let values = this[name].split(' ')
    if (!values.includes(value)) {
      values.push(value)
    }
    this[name] = values.join(' ')
  } else {
    this[name] = value
  }
}

// el.dataset.remove('controller', 'xx')
DOMStringMap.prototype.remove = function(name, value) {
  if (typeof this[name] === 'string') {
    let values = this[name].split(' ')
    let index = values.indexOf(value)
    if (index > -1) {
      values.splice(index, 1)
    }
    this[name] = values.join(' ')
  }
}

// el.dataset.replace('action', old, 'new')
DOMStringMap.prototype.replace = function(name, old_value, new_value) {
  if (typeof this[name] === 'string') {
    let values = this[name].split(' ')
    let reg = new RegExp(old_value)
    values.forEach(ele, index => {
      if (reg.test(ele)) {
        values[index] = String(ele).replace(old_value, new_value)
      }
    })
    this[name] = values.join(' ')
  }
}
