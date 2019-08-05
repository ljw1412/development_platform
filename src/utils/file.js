import FileSaver from 'file-saver'

try {
  var isFileSaverSupported = !!new Blob()
} catch (e) {
  console.error('不支持 Blob 格式')
}

export const download = (data, name) => {
  if (!isFileSaverSupported) return
  FileSaver.saveAs(data, name)
}

/**
 * 格式化文件大小
 * @param number size 文件大小
 * @param number index 传入大小为哪个单位的 0为 B (字节)
 */
export function formatFileSize(size, index = 0) {
  const unitList = ['B', 'KB', 'MB', 'GB', 'PB']
  let i = index
  while (size / 1024 > 1) {
    size /= 1024
    i++
  }
  return size.toFixed(2) + unitList[i]
}
