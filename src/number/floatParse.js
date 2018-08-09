/**
 * 原因: 在计算机二进制无法正确表示十进制的 0.1 ，因此需要做相关转换
 * 此文件中方法是解决js中浮点数 0.1 无法正确的运算。
 */

/**
 * 加法运算 0.1 + 0.2 = 0.3
 * @param num1
 * @param num2
 */
const accAdd = function (num1, num2) {
  num1 = Number(num1)
  num2 = Number(num2)
  var dec1, dec2, times
  try {
    dec1 = countDecimals(num1) + 1
  } catch (e) {
    dec1 = 0
  }
  try {
    dec2 = countDecimals(num2) + 1
  } catch (e) {
    dec2 = 0
  }
  times = Math.pow(10, Math.max(dec1, dec2))
  var result = (accMul(num1, times) + accMul(num2, times)) / times
  return getCorrectResult('add', num1, num2, result)
}

/**
 * 减法运算
 * @param num1
 * @param num2
 */
const accSub = function (num1, num2) {
  num1 = Number(num1)
  num2 = Number(num2)
  var dec1, dec2, times
  try {
    dec1 = countDecimals(num1) + 1
  } catch (e) {
    dec1 = 0
  }
  try {
    dec2 = countDecimals(num2) + 1
  } catch (e) {
    dec2 = 0
  }
  times = Math.pow(10, Math.max(dec1, dec2))
  var result = Number((accMul(num1, times) - accMul(num2, times)) / times)
  return getCorrectResult('sub', num1, num2, result)
}

/**
 * 除法运算
 * @param num1
 * @param num2
 */
const accDiv = function (num1, num2) {
  num1 = Number(num1)
  num2 = Number(num2)
  let t1 = 0
  let t2 = 0
  let dec1, dec2
  try {
    t1 = countDecimals(num1)
  } catch (e) {
  }
  try {
    t2 = countDecimals(num2)
  } catch (e) {
  }
  dec1 = convertToInt(num1)
  dec2 = convertToInt(num2)
  var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1))
  return getCorrectResult('div', num1, num2, result)
}
/**
 * 乘法运算
 * @param num1
 * @param num2
 */
const accMul = function (num1, num2) {
  num1 = Number(num1)
  num2 = Number(num2)
  var times = 0
  let s1 = num1.toString()
  let s2 = num2.toString()
  try {
    times += countDecimals(s1)
  } catch (e) {
  }
  try {
    times += countDecimals(s2)
  } catch (e) {
  }
  var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times)
  return getCorrectResult('mul', num1, num2, result)
}

/**
 * 小数位计数
 * @param num
 * @returns {number}
 */
const countDecimals = function (num) {
  var len = 0
  try {
    num = Number(num)
    var str = num.toString().toUpperCase()
    if (str.split('E').length === 2) {
      var isDecimal = false
      if (str.split('.').length === 2) {
        str = str.split('.')[1]
        if (Number.parseInt(str.split('E')[0], 10) !== 0) {
          isDecimal = true
        }
      }
      let x = str.split('E')
      if (isDecimal) {
        len = x[0].length
      }
      len -= Number.parseInt(x[1], 10)
    } else if (str.split('.').length === 2) { // decimal
      if (Number.parseInt(str.split('.')[1], 10) !== 0) {
        len = str.split('.')[1].length
      }
    }
  } catch (e) {
    throw e
  } finally {
    if (isNaN(len) || len < 0) {
      len = 0
    }
  }
  return len
}
/**
 * 转换位整型
 * @param num
 * @returns {number|*}
 */
const convertToInt = function (num) {
  num = Number(num)
  var newNum = num
  var times = countDecimals(num)
  var tempNum = num.toString().toUpperCase()
  if (tempNum.split('E').length === 2) {
    newNum = Math.round(num * Math.pow(10, times))
  } else {
    newNum = Number(tempNum.replace('.', ''))
  }
  return newNum
}
/**
 * 获取正确结果
 * @param type
 * @param num1
 * @param num2
 * @param result
 * @returns {*}
 */
const getCorrectResult = function (type, num1, num2, result) {
  var tempResult = 0
  switch (type) {
    case 'add':
      tempResult = num1 + num2
      break
    case 'sub':
      tempResult = num1 - num2
      break
    case 'div':
      tempResult = num1 / num2
      break
    case 'mul':
      tempResult = num1 * num2
      break
  }
  if (Math.abs(result - tempResult) > 1) {
    return tempResult
  }
  return result
}

export {
  accAdd,
  accSub,
  accMul,
  accDiv
}
