import axios from 'axios'

export const getLotteryHistory = {
  async getHistory({ gameNo, provinceId, pageSize, pageNo, isVerify = 1 }) {
    const params = {
      gameNo,
      provinceId,
      pageSize,
      pageNo,
      isVerify
    }
    const { data } = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry', {
      params
    })

    const lotteryList = data.value.list.map((x) => ({
      redRange: x.lotteryDrawResult.slice(0, 14).split(' '),
      blueRange: x.lotteryDrawResult.slice(15).split(' '),
      priceList: x.prizeLevelList,
      lotteryTime: x.lotteryDrawTime
    }))
    return lotteryList
  },

  getDaletou(p = { pageSize: 100, pageNo: 1 }) {
    const params = {
      gameNo: 85,
      provinceId: 0,
      pageNo: p.pageNo,
      pageSize: p.pageSize
    }
    return this.getHistory(params)
  }
}
