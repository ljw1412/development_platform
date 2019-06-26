import FileSaver from 'file-saver'

try {
  var isFileSaverSupported = !!new Blob()
} catch (e) {
  console.error('不支持 Blob 格式')
}

export const download = (url, name) => {
  if (!isFileSaverSupported) return
}
