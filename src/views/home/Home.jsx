import './Home.scss'
import HistoryChart from './components/HistoryChart'
import PickNumber from './components/PickNumber'

import { useEffect, useState } from 'react'
import { getLotteryHistory } from '@/axios'

const Home = () => {
  const [lotteryData, setLotteryData] = useState([
    {
      priceList: [],
      redRange: [],
      blueRange: [],
      lotteryTime: ''
    }
  ])

  const getLotteryData = async () => {
    try {
      const lotteryList = await getLotteryHistory.getDaletou()
      setLotteryData(lotteryList)
    } catch {}
  }

  useEffect(() => {
    getLotteryData()
  }, [])

  return (
    <div className="container">
      <div className="top">
        <HistoryChart lotteryData={lotteryData} />
        <PickNumber lotteryData={lotteryData} />
      </div>
    </div>
  )
}

export default Home
