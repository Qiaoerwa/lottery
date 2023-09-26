import axios from 'axios'

export const getLotteryHistory = {
  getHistory({ gameNo, provinceId, pageSize, pageNo, isVerify = 1 }) {
    const params = {
      gameNo,
      provinceId,
      pageSize,
      pageNo,
      isVerify
    }
    return axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry', { params })
  },
  getDaletou(p = { pageSize: 200, pageNo: 1 }) {
    const params = {
      gameNo: 85,
      provinceId: 0,
      pageNo: p.pageNo,
      pageSize: p.pageSize
    }
    return this.getHistory(params)
  }
}
