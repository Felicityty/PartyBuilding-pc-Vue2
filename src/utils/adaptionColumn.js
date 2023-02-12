// table自适应列宽
export function getAdaptionWidth(prop, tableData) {
  // 接收两个参数 prop为列的属性值  tableData为表格数据源
  prop = prop + ''
  // 判断传递的数据是否可用
  if (!Array.isArray(tableData) || tableData.length === 0) {
    return
  }
  if (!prop || !prop.length || prop.length === 0 || prop === undefined || prop === null) {
    return
  }
  let columnContent = ''
  // 获取该列中最长的数据(内容)
  let index = 0
  for (let i = 0; i < tableData.length; i++) {
    if (tableData[i][prop] === null) {
      return
    }
    const now_text = tableData[i][prop] + ''
    const max_text = tableData[index][prop] + ''

    if (now_text.length > max_text.length) {
      index = i
    }
  }
  // 获取到的最长的列的内容
  columnContent = tableData[index][prop]
  // console.log(columnContent, '列宽是多少')
  // // 以下分配的单位长度可根据实际需求进行调整
  let columnWidth = 0
  for (const char of columnContent) {
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      // 如果是英文字符，为字符分配10个单位宽度
      columnWidth += 10
    } else if (char >= '\u4e00' && char <= '\u9fa5') {
      // 如果是中文字符，为字符分配20个单位宽度
      columnWidth += 21
    } else {
      // 其他种类字符，为字符分配10个单位宽度
      columnWidth += 20
    }
  }
  if (columnWidth < 80) {
    // 设置最小宽度
    columnWidth = 80
  }
  // if (columnWidth > 260) {
  //   // 设置最大宽度
  //   columnWidth = 260
  // }
  return columnWidth + 'px'
}
