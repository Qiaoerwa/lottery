import { getLotteryHistory } from '@/axios'

export function shuffle(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1))
    var itemAtIndex = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = itemAtIndex
  }
  return arr
}

export function killNumberFuc(arr) {
  if (!arr[0].lotteryTime) return
  const push = (arr, number) => {
    if (!arr.includes(number)) {
      arr.push(number)
    }
  }
  const redRange = arr[0].redRange
  const lastRedRange = arr[1].redRange
  const blueRange = arr[0].blueRange
  const lastBlueRange = arr[1].blueRange

  const res = []
  for (let i = 0; i < redRange.length; i++) {
    i < 3 && push(res, Math.abs(lastRedRange[i] - redRange[i]))
    push(res, +redRange[i] + 3)
    i >= 1 && push(res, redRange[i] - redRange[0])
    i >= 2 && push(res, redRange[i] - redRange[1])
  }
  push(res, +blueRange[0] + +blueRange[1])
  push(res, +lastBlueRange[0] + +lastBlueRange[1])
  push(res, +blueRange[0] + +lastBlueRange[0])
  push(res, +blueRange[0] + +lastBlueRange[1])
  push(res, +blueRange[1] + +lastBlueRange[0])
  push(res, +blueRange[1] + +lastBlueRange[1])
  return res
}

export function randomFrontNumber(params = { expect: [], unexpect: [] }) {
  let red = [],
    blue = []

  const { expect = [], unexpect = [] } = params

  const normalRedNumber = Array(35)
    .fill(0)
    .map((_, i) => i + 1)
    .filter((a) => unexpect.every((b) => a !== b))

  const normalBlueNumber = Array(12)
    .fill(0)
    .map((_, i) => i + 1)

  if (expect.length === 5) {
    red = expect.sort((a, b) => a - b)
  }

  if (expect.length > 5) {
    red = shuffle(expect)
      .slice(0, 5)
      .sort((a, b) => a - b)
  }

  if (expect.length < 5) {
    red = expect.concat(shuffle(normalRedNumber).slice(0, 5 - expect.length)).sort((a, b) => a - b)
  }

  blue = shuffle(normalBlueNumber)
    .slice(0, 2)
    .sort((a, b) => a - b)
  return { red, blue }
}

let pastNumberCache = []
// 排除往期
export async function excludePast(ary) {
  const newAry = JSON.parse(JSON.stringify(ary))
  newAry.forEach((x) => (x.red = x.red.map((y) => String(y))))
  if (pastNumberCache.length === 0) {
    pastNumberCache = await getLotteryHistory.getDaletou({ pageSize: 2500, pageNo: 1 })
  }
  for (let i = 0; i < newAry.length; i++) {
    for (let j = 0; j < pastNumberCache.length; j++) {
      const same = JSON.stringify(newAry[i].red) === JSON.stringify(pastNumberCache[j].redRange)
      if (same) {
        newAry.splice(i, 1)
        i--
        break
      }
    }
  }
  return newAry
}
