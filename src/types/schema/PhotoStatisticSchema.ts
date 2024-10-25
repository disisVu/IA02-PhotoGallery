export interface PhotoStatistic {
  id: string
  downloads: {
    total: number
    historical: HistoricalData
  }
  views: {
    total: number
    historical: HistoricalData
  }
  likes: {
    total: number
    historical: HistoricalData
  }
}

export interface HistoricalData {
  change: number // Total change for the past period (e.g., 30 days)
  resolution: string // Resolution, e.g., 'days'
  quantity: number // Number of data points (e.g., 30 for 30 days)
  values: HistoricalValue[] // Array of daily historical values
}

export interface HistoricalValue {
  date: string // Date in 'YYYY-MM-DD' format
  value: number // The count for that specific date
}
