const tagLabelList = ['watch', 'protected']

function getStatusType(status) {
  const map = {
    online: 'success',
    stopping: 'info',
    stopped: 'info',
    launching: '',
    'one-launch-status': '',
    errored: 'danger'
  }
  return map[status] || 'warning'
}

export function setTags(obj) {
  obj.tags = []
  tagLabelList.forEach(label => {
    if (obj[label]) obj.tags.push({ label, type: '' })
  })
  obj.tags.push({
    label: obj.status,
    type: getStatusType(obj.status)
  })
  return obj
}
