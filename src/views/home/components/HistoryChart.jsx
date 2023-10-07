import './HistoryChart.scss'

function HistoryChart(props = { lotteryData: [] }) {
  return (
    <div className="history-container">
      <div className="title">往期</div>
      <div className="history-list">
        {props.lotteryData.map((item, i) => {
          return (
            <div
              key={i}
              className="ball-container">
              <div className="date">{item.lotteryTime}</div>
              {item.redRange.map((x, j) => (
                <div
                  key={j}
                  className="red-ball ball">
                  <span>{x}</span>
                </div>
              ))}
              {item.blueRange.map((x, j) => (
                <div
                  key={j}
                  className="blue-ball ball">
                  <span>{x}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryChart
