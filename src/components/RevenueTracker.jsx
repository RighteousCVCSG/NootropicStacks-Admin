import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Target,
  Calendar,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

// Mock revenue data
const mockRevenueData = {
  today: {
    affiliate: 47.23,
    ads: 23.67,
    total: 70.90,
    target: 50.00
  },
  yesterday: {
    affiliate: 42.15,
    ads: 19.34,
    total: 61.49,
    target: 50.00
  },
  thisWeek: {
    affiliate: 298.45,
    ads: 156.78,
    total: 455.23,
    target: 350.00
  },
  thisMonth: {
    affiliate: 1247.89,
    ads: 678.34,
    total: 1926.23,
    target: 1500.00
  },
  lastMonth: {
    affiliate: 1156.78,
    ads: 623.45,
    total: 1780.23,
    target: 1500.00
  }
};

// Daily revenue breakdown for the last 30 days
const dailyRevenue = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  affiliate: Math.random() * 60 + 20,
  ads: Math.random() * 40 + 10,
  total: 0
})).map(day => ({
  ...day,
  total: day.affiliate + day.ads
}));

// Revenue sources breakdown
const revenueSources = {
  amazon: { amount: 456.78, percentage: 23.7, color: 'bg-orange-500' },
  iherb: { amount: 389.45, percentage: 20.2, color: 'bg-green-500' },
  nootropicsDepot: { amount: 401.66, percentage: 20.9, color: 'bg-blue-500' },
  googleAds: { amount: 345.67, percentage: 17.9, color: 'bg-red-500' },
  bingAds: { amount: 234.56, percentage: 12.2, color: 'bg-purple-500' },
  other: { amount: 98.11, percentage: 5.1, color: 'bg-gray-500' }
};

// Conversion tracking data
const conversionData = {
  affiliateClicks: 2847,
  affiliateConversions: 203,
  affiliateConversionRate: 7.1,
  adImpressions: 45678,
  adClicks: 1462,
  adCTR: 3.2,
  averageOrderValue: 67.89,
  totalOrders: 203
};

// Payout status
const payoutStatus = {
  amazon: { amount: 456.78, status: 'pending', nextPayout: '2024-01-15' },
  iherb: { amount: 389.45, status: 'paid', lastPayout: '2024-01-01' },
  nootropicsDepot: { amount: 401.66, status: 'pending', nextPayout: '2024-01-20' },
  googleAds: { amount: 345.67, status: 'pending', nextPayout: '2024-01-21' },
  bingAds: { amount: 234.56, status: 'paid', lastPayout: '2024-01-05' }
};

export function RevenueTracker() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const currentData = mockRevenueData[selectedPeriod];
  const targetProgress = (currentData.total / currentData.target) * 100;

  const refreshData = () => {
    setLastUpdated(new Date());
    // In a real app, this would fetch fresh data from the API
  };

  const exportData = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert('Revenue data exported successfully!');
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatPercentage = (value) => `${value.toFixed(1)}%`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Revenue Tracking</h2>
          <p className="text-gray-600">Monitor clicks, conversions, and revenue in real-time</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Badge>
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Period Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(mockRevenueData).map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Button>
                ))}
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(currentData.total)}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {currentData.total > currentData.target ? (
                        <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                      )}
                      Target: {formatCurrency(currentData.target)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Affiliate Revenue</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(currentData.affiliate)}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatPercentage((currentData.affiliate / currentData.total) * 100)} of total
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ad Revenue</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(currentData.ads)}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatPercentage((currentData.ads / currentData.total) * 100)} of total
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Target Progress</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatPercentage(targetProgress)}</div>
                    <Progress value={Math.min(targetProgress, 100)} className="mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Target Achievement Alert */}
          {targetProgress >= 100 ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Target Achieved!</strong> You've reached {formatPercentage(targetProgress)} of your revenue target for this period.
              </AlertDescription>
            </Alert>
          ) : targetProgress >= 80 ? (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Close to Target!</strong> You're at {formatPercentage(targetProgress)} of your revenue target. 
                Need {formatCurrency(currentData.target - currentData.total)} more to reach your goal.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Keep Going!</strong> You're at {formatPercentage(targetProgress)} of your revenue target. 
                Need {formatCurrency(currentData.target - currentData.total)} more to reach your goal.
              </AlertDescription>
            </Alert>
          )}

          {/* Daily Revenue Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <LineChart className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Revenue chart would be displayed here</p>
                  <p className="text-sm text-gray-400">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Sources Breakdown</CardTitle>
              <p className="text-sm text-gray-600">Revenue distribution across different partners and channels</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(revenueSources).map(([source, data]) => (
                  <div key={source} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${data.color}`} />
                      <div>
                        <div className="font-medium capitalize">{source.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-sm text-gray-600">{formatPercentage(data.percentage)} of total</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(data.amount)}</div>
                      <Progress value={data.percentage} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['amazon', 'iherb', 'nootropicsDepot'].map(source => (
                    <div key={source} className="flex justify-between items-center">
                      <span className="capitalize">{source.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-semibold">{formatCurrency(revenueSources[source].amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ad Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['googleAds', 'bingAds', 'other'].map(source => (
                    <div key={source} className="flex justify-between items-center">
                      <span className="capitalize">{source.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-semibold">{formatCurrency(revenueSources[source].amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Affiliate Clicks</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionData.affiliateClicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total clicks this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionData.affiliateConversions}</div>
                <p className="text-xs text-muted-foreground">
                  {formatPercentage(conversionData.affiliateConversionRate)} conversion rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ad Impressions</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionData.adImpressions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {formatPercentage(conversionData.adCTR)} CTR
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(conversionData.averageOrderValue)}</div>
                <p className="text-xs text-muted-foreground">
                  {conversionData.totalOrders} total orders
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span>Website Visitors</span>
                  <span className="font-semibold">15,234</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span>Affiliate Link Clicks</span>
                  <span className="font-semibold">{conversionData.affiliateClicks.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span>Conversions</span>
                  <span className="font-semibold">{conversionData.affiliateConversions}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span>Revenue Generated</span>
                  <span className="font-semibold">{formatCurrency(mockRevenueData.thisMonth.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout Status</CardTitle>
              <p className="text-sm text-gray-600">Track pending and completed payouts from partners</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(payoutStatus).map(([partner, status]) => (
                  <div key={partner} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status.status === 'paid' ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <div className="font-medium capitalize">{partner.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-sm text-gray-600">
                          {status.status === 'paid' 
                            ? `Last payout: ${status.lastPayout}`
                            : `Next payout: ${status.nextPayout}`
                          }
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(status.amount)}</div>
                      <Badge variant={status.status === 'paid' ? 'default' : 'secondary'}>
                        {status.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">
                  {formatCurrency(
                    Object.values(payoutStatus)
                      .filter(status => status.status === 'pending')
                      .reduce((sum, status) => sum + status.amount, 0)
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {Object.values(payoutStatus).filter(status => status.status === 'pending').length} pending payments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>This Month Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(
                    Object.values(payoutStatus)
                      .filter(status => status.status === 'paid')
                      .reduce((sum, status) => sum + status.amount, 0)
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {Object.values(payoutStatus).filter(status => status.status === 'paid').length} completed payments
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Revenue Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Pie chart placeholder</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Monthly Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Bar chart placeholder</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <LineChart className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Line chart placeholder</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <BarChart3 className="h-4 w-4" />
            <AlertDescription>
              <strong>Analytics Integration:</strong> Connect with Google Analytics, Facebook Pixel, 
              or other tracking tools for more detailed insights and attribution modeling.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}

