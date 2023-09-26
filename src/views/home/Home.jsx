import './Home.scss'
import { useEffect, useState } from 'react'
import { getLotteryHistory } from '@/axios'
const Home = () => {
  const [lotteryData, setLotteryData] = useState([
    {
      priceList: [],
      redRange: [],
      blueRange: []
    }
  ])
  const getLotteryData = async () => {
    const {
      data: { value }
    } = await getLotteryHistory.getDaletou()
    const lotteryList = value.list.map((x) => ({
      redRange: x.lotteryDrawResult.slice(0, 14).split(' '),
      blueRange: x.lotteryDrawResult.slice(15).split(' '),
      priceList: x.prizeLevelList
    }))
    setLotteryData(lotteryList)
  }
  useEffect(() => {
    getLotteryData()
  }, [])
  return (
    <div className="container">
      <div className="history-container">
        <div className="title">历史走向</div>
        <div className="history-list">
          {lotteryData.map((item) => {
            return (
              <div className="ball-container">
                {item.redRange.map((x) => (
                  <div className="red-ball ball">{x}</div>
                ))}
                {item.blueRange.map((x) => (
                  <div className="blue-ball ball">{x}</div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
