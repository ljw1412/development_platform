export function getProjectStateStr(state) {
  const map = {
    0: '未初始化',
    1: '初始化中',
    2: '正常',
    3: '存在错误'
  }
  return map[state]
}
