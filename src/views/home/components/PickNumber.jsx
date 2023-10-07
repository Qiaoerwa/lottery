import './PickNumber.scss'
import { useEffect, useState } from 'react'
import { excludePast, killNumberFuc, randomFrontNumber } from '@/utils'
import Selector from '@/components/Selector'

const PickNumber = (props = { lotteryData: [] }) => {
  useEffect(() => {
    killNumberFuc(props.lotteryData)
  }, [props.lotteryData])

  const selectorOptions = [
    {
      label: '杀号',
      value: 1
    },
    {
      label: '排除往期',
      value: 10
    }
  ]

  let pickTime = 5
  const [loading, setLoading] = useState(false)
  const [pickedAry, setPickedAry] = useState([])
  const confirmPick = async (value) => {
    setLoading(true)
    let res = []
    if (value.includes(1)) {
      // 杀号
      for (let i = 0; i < pickTime; i++) {
        const kill = killNumberFuc(props.lotteryData)
        res.push(randomFrontNumber({ unexpect: kill }))
      }
    } else {
      // 完全随机
      for (let i = 0; i < pickTime; i++) {
        res.push(randomFrontNumber())
      }
    }
    if (value.includes(10)) {
      res = await excludePast(res)
    }
    setPickedAry(() => res)
    setLoading(true)
  }

  return (
    <div className="pick-container">
      <div className="pick-action">
        <div className="action-left">
          <div className="title">推荐号码</div>
        </div>
        <div className="sction-right">
          <div className="pick-select">
            <Selector
              options={selectorOptions}
              confirm={confirmPick}
            />
          </div>
        </div>
      </div>
      <div className="pick-show">
        {pickedAry.length ? (
          pickedAry.map(({ red = [], blue = [] }, i) => {
            return (
              <div
                key={i}
                className="pick-ball-container">
                {red.map((x, j) => (
                  <div
                    key={j}
                    className="red-ball ball">
                    <span>{x}</span>
                  </div>
                ))}
                {blue.map((x, j) => (
                  <div
                    key={j}
                    className="blue-ball ball">
                    <span>{x}</span>
                  </div>
                ))}
              </div>
            )
          })
        ) : loading ? (
          <div className="title loading">正在计算中，请稍后</div>
        ) : (
          <div className="title">暂无数据</div>
        )}
      </div>
    </div>
  )
}

export default PickNumber
