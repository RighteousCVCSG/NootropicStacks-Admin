import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { 
  Target, 
  DollarSign, 
  Eye, 
  MousePointer, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Zap
} from 'lucide-react';

// Ad network configurations
const adNetworks = {
  googleAds: {
    name: 'Google Ads',
    cpc: '$2.45',
    ctr: '3.2%',
    active: true,
    color: 'bg-blue-100 text-blue-800',
    adFormats: ['Banner', 'Native', 'Video']
  },
  bingAds: {
    name: 'Microsoft Advertising',
    cpc: '$1.89',
    ctr: '2.8%',
    active: true,
    color: 'bg-green-100 text-green-800',
    adFormats: ['Banner', 'Native']
  },
  facebook: {
    name: 'Facebook Audience Network',
    cpc: '$1.67',
    ctr: '2.1%',
    active: false,
    color: 'bg-purple-100 text-purple-800',
    adFormats: ['Banner', 'Native', 'Video']
  },
  taboola: {
    name: 'Taboola',
    cpc: '$0.89',
    ctr: '1.9%',
    active: true,
    color: 'bg-orange-100 text-orange-800',
    adFormats: ['Native', 'Video']
  }
};

// Mock ad performance data
const mockAdPerformance = {
  googleAds: {
    impressions: 45678,
    clicks: 1462,
    revenue: 358.19,
    ctr: 3.2,
    cpc: 2.45
  },
  bingAds: {
    impressions: 23456,
    clicks: 657,
    revenue: 124.17,
    ctr: 2.8,
    cpc: 1.89
  },
  taboola: {
    impressions: 34567,
    clicks: 657,
    revenue: 58.47,
    ctr: 1.9,
    cpc: 0.89
  }
};

// Ad placement configurations
const adPlacements = {
  header: {
    name: 'Header Banner',
    size: '728x90',
    active: true,
    revenue: 89.23,
    impressions: 12456
  },
  sidebar: {
    name: 'Sidebar Rectangle',
    size: '300x250',
    active: true,
    revenue: 156.78,
    impressions: 18934
  },
  inContent: {
    name: 'In-Content Native',
    size: 'Responsive',
    active: true,
    revenue: 234.56,
    impressions: 23567
  },
  footer: {
    name: 'Footer Banner',
    size: '728x90',
    active: false,
    revenue: 45.67,
    impressions: 8934
  }
};

// Contextual targeting rules
const targetingRules = [
  {
    id: 1,
    name: 'Nootropics Enthusiasts',
    keywords: ['nootropics', 'cognitive enhancement', 'brain health'],
    supplements: ['piracetam', 'modafinil', 'alpha-gpc'],
    bidMultiplier: 1.5,
    active: true
  },
  {
    id: 2,
    name: 'Energy Seekers',
    keywords: ['energy', 'fatigue', 'alertness'],
    supplements: ['caffeine', 'rhodiola', 'b-complex'],
    bidMultiplier: 1.3,
    active: true
  },
  {
    id: 3,
    name: 'Stress Management',
    keywords: ['stress', 'anxiety', 'relaxation'],
    supplements: ['ashwagandha', 'l-theanine', 'magnesium'],
    bidMultiplier: 1.2,
    active: true
  }
];

export function ContextualAdManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [networks, setNetworks] = useState(adNetworks);
  const [placements, setPlacements] = useState(adPlacements);
  const [rules, setRules] = useState(targetingRules);

  // Calculate total performance
  const totalStats = Object.values(mockAdPerformance).reduce((acc, network) => ({
    impressions: acc.impressions + network.impressions,
    clicks: acc.clicks + network.clicks,
    revenue: acc.revenue + network.revenue
  }), { impressions: 0, clicks: 0, revenue: 0 });

  const overallCTR = totalStats.impressions > 0 ? (totalStats.clicks / totalStats.impressions * 100).toFixed(2) : 0;
  const averageCPC = totalStats.clicks > 0 ? (totalStats.revenue / totalStats.clicks).toFixed(2) : 0;

  const handleNetworkToggle = (networkId) => {
    setNetworks(prev => ({
      ...prev,
      [networkId]: {
        ...prev[networkId],
        active: !prev[networkId].active
      }
    }));
  };

  const handlePlacementToggle = (placementId) => {
    setPlacements(prev => ({
      ...prev,
      [placementId]: {
        ...prev[placementId],
        active: !prev[placementId].active
      }
    }));
  };

  const handleRuleToggle = (ruleId) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, active: !rule.active } : rule
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Contextual Ad Management</h2>
          <p className="text-gray-600">Manage ad networks, placements, and targeting rules</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          ${totalStats.revenue.toFixed(2)} Ad Revenue
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="targeting">Targeting</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStats.impressions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStats.clicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ad Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalStats.revenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+22% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallCTR}%</div>
                <p className="text-xs text-muted-foreground">+0.4% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Placements */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Ad Placements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(placements)
                  .sort((a, b) => b[1].revenue - a[1].revenue)
                  .map(([placementId, placement]) => (
                    <div key={placementId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${placement.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <div>
                          <div className="font-medium">{placement.name}</div>
                          <div className="text-sm text-gray-600">{placement.size} • {placement.impressions.toLocaleString()} impressions</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${placement.revenue.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">
                          {((placement.revenue / placement.impressions) * 1000).toFixed(2)} RPM
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Plus className="w-6 h-6 mb-2" />
                  Add Placement
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Target className="w-6 h-6 mb-2" />
                  Create Targeting Rule
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ad Networks</CardTitle>
              <p className="text-sm text-gray-600">Manage your ad network integrations and settings</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(networks).map(([networkId, network]) => (
                  <div key={networkId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={network.active}
                        onCheckedChange={() => handleNetworkToggle(networkId)}
                      />
                      <div>
                        <div className="font-semibold">{network.name}</div>
                        <div className="text-sm text-gray-600">
                          {network.cpc} CPC • {network.ctr} CTR
                        </div>
                        <div className="flex gap-1 mt-1">
                          {network.adFormats.map(format => (
                            <Badge key={format} variant="outline" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={network.color}>
                        {network.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Integration Required:</strong> Configure your ad network API keys and publisher IDs 
              in the environment variables to enable live ad serving.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="placements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ad Placements</CardTitle>
              <p className="text-sm text-gray-600">Manage where ads appear on your website</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(placements).map(([placementId, placement]) => (
                  <div key={placementId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={placement.active}
                        onCheckedChange={() => handlePlacementToggle(placementId)}
                      />
                      <div>
                        <div className="font-semibold">{placement.name}</div>
                        <div className="text-sm text-gray-600">
                          Size: {placement.size} • Revenue: ${placement.revenue.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {placement.impressions.toLocaleString()} impressions
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ${((placement.revenue / placement.impressions) * 1000).toFixed(2)} RPM
                        </div>
                        <div className="text-xs text-gray-500">Revenue per mille</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Placement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="placementName">Placement Name</Label>
                  <Input id="placementName" placeholder="e.g., Article Bottom" />
                </div>
                <div>
                  <Label htmlFor="placementSize">Ad Size</Label>
                  <select id="placementSize" className="w-full p-2 border rounded-md">
                    <option value="">Select Size</option>
                    <option value="728x90">728x90 (Leaderboard)</option>
                    <option value="300x250">300x250 (Rectangle)</option>
                    <option value="320x50">320x50 (Mobile Banner)</option>
                    <option value="responsive">Responsive</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Placement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targeting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contextual Targeting Rules</CardTitle>
              <p className="text-sm text-gray-600">Create rules to show relevant ads based on content and user behavior</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={rule.active}
                          onCheckedChange={() => handleRuleToggle(rule.id)}
                        />
                        <div>
                          <div className="font-semibold">{rule.name}</div>
                          <div className="text-sm text-gray-600">
                            Bid Multiplier: {rule.bidMultiplier}x
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={rule.active ? "default" : "secondary"}>
                          {rule.active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium mb-1">Keywords:</div>
                        <div className="flex flex-wrap gap-1">
                          {rule.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Target Supplements:</div>
                        <div className="flex flex-wrap gap-1">
                          {rule.supplements.map((supplement, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {supplement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Targeting Rule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ruleName">Rule Name</Label>
                    <Input id="ruleName" placeholder="e.g., Sleep Optimization" />
                  </div>
                  <div>
                    <Label htmlFor="bidMultiplier">Bid Multiplier</Label>
                    <Input id="bidMultiplier" type="number" step="0.1" placeholder="1.0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input id="keywords" placeholder="sleep, insomnia, melatonin" />
                </div>
                <div>
                  <Label htmlFor="supplements">Target Supplements (comma-separated)</Label>
                  <Input id="supplements" placeholder="melatonin, magnesium, l-theanine" />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(mockAdPerformance).map(([networkId, data]) => (
              <Card key={networkId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{networks[networkId]?.name}</span>
                    <Badge className={networks[networkId]?.color}>
                      ${data.cpc.toFixed(2)} CPC
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Impressions</span>
                      <span className="font-semibold">{data.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Clicks</span>
                      <span className="font-semibold">{data.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="font-semibold">${data.revenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CTR</span>
                      <span className="font-semibold">{data.ctr.toFixed(2)}%</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span>{data.ctr.toFixed(1)}%</span>
                      </div>
                      <Progress value={data.ctr * 20} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <Zap className="h-4 w-4" />
            <AlertDescription>
              <strong>Optimization Tip:</strong> Focus on high-CTR placements and consider A/B testing 
              different ad formats to maximize revenue per visitor.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}

