import { useState, useMemo, useEffect } from 'react'

function App() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale 2024',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      clicks: 10,
      cost: 25,
      earnings: 50,
    },
    {
      id: 2,
      name: 'Black Friday Special',
      startDate: '2024-11-24',
      endDate: '2024-11-30',
      clicks: 15,
      cost: 30,
      earnings: 100,
    },
    {
      id: 3,
      name: 'New Year Campaign',
      startDate: '2024-12-26',
      endDate: '2025-01-05',
      clicks: 20,
      cost: 50,
      earnings: 200,
    },
  ])

  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    clicks: '',
    cost: '',
    earnings: '',
  })

  const [showForm, setShowForm] = useState(false)
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields')
      return
    }

    const newCampaign = {
      id: Date.now(),
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      clicks: parseInt(formData.clicks) || 0,
      cost: parseFloat(formData.cost) || 0,
      earnings: parseFloat(formData.earnings) || 0,
    }

    setCampaigns(prev => [...prev, newCampaign])
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      clicks: '',
      cost: '',
      earnings: '',
    })
    setShowForm(false)
  }

  const deleteCampaign = id => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('campaings', JSON.stringify(campaigns));
  }, [campaigns]);

  const handleSort = field => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedCampaigns = useMemo(() => {
    return [...campaigns].sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === 'profit') {
        aValue = a.earnings - a.cost
        bValue = b.earnings - b.cost
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }, [campaigns, sortField, sortDirection])

  const totalMetrics = useMemo(() => {
    return campaigns.reduce(
      (acc, campaign) => {
        const profit = campaign.earnings - campaign.cost
        return {
          totalClicks: acc.totalClicks + campaign.clicks,
          totalCost: acc.totalCost + campaign.cost,
          totalearnings: acc.totalearnings + campaign.earnings,
          totalProfit: acc.totalProfit + profit,
        }
      },
      { totalClicks: 0, totalCost: 0, totalearnings: 0, totalProfit: 0 }
    )
  }, [campaigns])

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <i class="fas fa-arrow-up w-6 "></i>
    return sortDirection === 'asc' ? (
      <i class="fas fa-arrow-up w-6 "></i>
    ) : (
      <i class="fas fa-arrow-down w-6 "></i>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Campaign Dashboard
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Clicks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalMetrics.totalClicks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-red-600">
                  $ {totalMetrics.totalCost}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-green-600">
                  $ {totalMetrics.totalearnings}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Profit
                </p>
                <p
                  className={`text-2xl font-bold ${totalMetrics.totalProfit >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                    }`}
                >
                  $ {totalMetrics.totalProfit}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg"
          >
            <i class="fas fa-plus w-6 "></i>
            Add New Campaign
          </button>
        </div>

        {/* Add Campaign Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add New Campaign
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter campaign name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clicks
                </label>
                <input
                  type="number"
                  name="clicks"
                  value={formData.clicks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost ($)
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Earnings ($)
                </label>
                <input
                  type="number"
                  name="earnings"
                  value={formData.earnings}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3 flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Campaign
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Performance</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-gray-100">
                    <div className="flex items-center gap-2">Campaign Name</div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('startDate')}
                  >
                    <div className="flex items-center gap-2">
                      Duration
                      <SortIcon field="startDate" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('clicks')}
                  >
                    <div className="flex items-center gap-2">
                      Clicks
                      <SortIcon field="clicks" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('cost')}
                  >
                    <div className="flex items-center gap-2">
                      Cost
                      <SortIcon field="cost" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('earnings')}
                  >
                    <div className="flex items-center gap-2">
                      earnings
                      <SortIcon field="earnings" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('profit')}
                  >
                    <div className="flex items-center gap-2">
                      Profit
                      <SortIcon field="profit" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCampaigns.map(campaign => {
                  const profit = campaign.earnings - campaign.cost
                  const percent =
                    campaign.cost > 0 ? (profit / campaign.cost) * 100 : 0

                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <i class="fas fa-calendar w-6 "></i>
                          {formatDate(campaign.startDate)} -{' '}
                          {formatDate(campaign.endDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {campaign.clicks}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-600 font-medium">
                          $ {campaign.cost}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 font-medium">
                          $ {campaign.earnings}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                          $ {profit}
                          <div className="text-xs text-gray-500">
                            {percent.toFixed(0)}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => deleteCampaign(campaign.id)}
                          className="text-red-600 hover:text-red-900 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          title="Delete Campaign"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {campaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No campaigns found. Add your first campaign
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
