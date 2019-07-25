import FileSaver from 'file-saver'

try {
  var isFileSaverSupported = !!new Blob()
} catch (e) {
  console.error('不支持 Blob 格式')
}

export const download = (url, name) => {
  if (!isFileSaverSupported) return
}

export function formatFileSize(size) {
  const unitList = ['B', 'KB', 'MB', 'GB', 'PB']
  let i = 0
  while (size / 1024 > 1) {
    size /= 1024
    i++
  }
  return size.toFixed(2) + unitList[i]
}
