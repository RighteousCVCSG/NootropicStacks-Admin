import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { 
  ExternalLink, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

// Affiliate partner configurations
const affiliatePartners = {
  amazon: {
    name: 'Amazon Associates',
    commission: '8.5%',
    cookieDuration: '24 hours',
    baseUrl: 'https://amazon.com/dp/',
    trackingParam: 'tag=your-tag-20',
    active: true,
    color: 'bg-orange-100 text-orange-800'
  },
  iherb: {
    name: 'iHerb',
    commission: '12%',
    cookieDuration: '30 days',
    baseUrl: 'https://iherb.com/pr/',
    trackingParam: '?rcode=YOUR_CODE',
    active: true,
    color: 'bg-green-100 text-green-800'
  },
  nootropicsDepot: {
    name: 'Nootropics Depot',
    commission: '15%',
    cookieDuration: '60 days',
    baseUrl: 'https://nootropicsdepot.com/products/',
    trackingParam: '?ref=YOUR_REF',
    active: true,
    color: 'bg-blue-100 text-blue-800'
  },
  vitacost: {
    name: 'Vitacost',
    commission: '10%',
    cookieDuration: '30 days',
    baseUrl: 'https://vitacost.com/product/',
    trackingParam: '?ta=YOUR_ID',
    active: true,
    color: 'bg-purple-100 text-purple-800'
  },
  lifeExtension: {
    name: 'Life Extension',
    commission: '8%',
    cookieDuration: '45 days',
    baseUrl: 'https://lifeextension.com/products/',
    trackingParam: '?sourceCode=YOUR_CODE',
    active: false,
    color: 'bg-red-100 text-red-800'
  }
};

// Mock affiliate link data
const mockAffiliateLinks = {
  'caffeine': {
    amazon: 'B07XXXXXXX',
    iherb: 'caffeine-200mg',
    nootropicsDepot: 'caffeine-anhydrous-capsules',
    vitacost: 'caffeine-supplement'
  },
  'l-theanine': {
    amazon: 'B08XXXXXXX',
    iherb: 'l-theanine-200mg',
    nootropicsDepot: 'l-theanine-tablets',
    vitacost: 'l-theanine-capsules'
  },
  'alpha-gpc': {
    amazon: 'B09XXXXXXX',
    iherb: 'alpha-gpc-300mg',
    nootropicsDepot: 'alpha-gpc-capsules',
    vitacost: 'alpha-gpc-supplement'
  }
};

// Mock performance data
const mockPerformanceData = {
  amazon: {
    clicks: 1247,
    conversions: 89,
    revenue: 234.56,
    conversionRate: 7.1
  },
  iherb: {
    clicks: 892,
    conversions: 67,
    revenue: 189.23,
    conversionRate: 7.5
  },
  nootropicsDepot: {
    clicks: 654,
    conversions: 45,
    revenue: 156.78,
    conversionRate: 6.9
  },
  vitacost: {
    clicks: 423,
    conversions: 28,
    revenue: 98.45,
    conversionRate: 6.6
  }
};

export function AffiliateManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [affiliateLinks, setAffiliateLinks] = useState(mockAffiliateLinks);
  const [partners, setPartners] = useState(affiliatePartners);
  const [newLink, setNewLink] = useState({ supplement: '', partner: '', productId: '' });

  // Calculate total performance
  const totalStats = Object.values(mockPerformanceData).reduce((acc, partner) => ({
    clicks: acc.clicks + partner.clicks,
    conversions: acc.conversions + partner.conversions,
    revenue: acc.revenue + partner.revenue
  }), { clicks: 0, conversions: 0, revenue: 0 });

  const overallConversionRate = totalStats.clicks > 0 ? (totalStats.conversions / totalStats.clicks * 100).toFixed(1) : 0;

  const handlePartnerToggle = (partnerId) => {
    setPartners(prev => ({
      ...prev,
      [partnerId]: {
        ...prev[partnerId],
        active: !prev[partnerId].active
      }
    }));
  };

  const handleAddLink = () => {
    if (newLink.supplement && newLink.partner && newLink.productId) {
      setAffiliateLinks(prev => ({
        ...prev,
        [newLink.supplement]: {
          ...prev[newLink.supplement],
          [newLink.partner]: newLink.productId
        }
      }));
      setNewLink({ supplement: '', partner: '', productId: '' });
    }
  };

  const generateAffiliateUrl = (partnerId, productId) => {
    const partner = partners[partnerId];
    if (!partner || !productId) return '#';
    return `${partner.baseUrl}${productId}&${partner.trackingParam}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Affiliate Management</h2>
          <p className="text-gray-600">Manage affiliate links, partners, and track performance</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          ${totalStats.revenue.toFixed(2)} Total Revenue
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStats.clicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStats.conversions}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalStats.revenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallConversionRate}%</div>
                <p className="text-xs text-muted-foreground">+0.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Partners */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(mockPerformanceData)
                  .sort((a, b) => b[1].revenue - a[1].revenue)
                  .map(([partnerId, data]) => (
                    <div key={partnerId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={partners[partnerId]?.color}>
                          {partners[partnerId]?.name}
                        </Badge>
                        <div className="text-sm text-gray-600">
                          {data.clicks} clicks • {data.conversions} conversions
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${data.revenue.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">{data.conversionRate}% CR</div>
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
                  Add New Link
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Settings className="w-6 h-6 mb-2" />
                  Configure Partners
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Partners</CardTitle>
              <p className="text-sm text-gray-600">Manage your affiliate partner settings and tracking codes</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(partners).map(([partnerId, partner]) => (
                  <div key={partnerId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={partner.active}
                        onCheckedChange={() => handlePartnerToggle(partnerId)}
                      />
                      <div>
                        <div className="font-semibold">{partner.name}</div>
                        <div className="text-sm text-gray-600">
                          {partner.commission} commission • {partner.cookieDuration} cookie
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={partner.color}>
                        {partner.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
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
              <strong>Setup Required:</strong> Make sure to configure your tracking codes and affiliate IDs 
              for each partner in the environment variables or configuration file.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          {/* Add New Link */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Affiliate Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="supplement">Supplement</Label>
                  <Input
                    id="supplement"
                    placeholder="e.g., caffeine"
                    value={newLink.supplement}
                    onChange={(e) => setNewLink(prev => ({ ...prev, supplement: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="partner">Partner</Label>
                  <select
                    id="partner"
                    className="w-full p-2 border rounded-md"
                    value={newLink.partner}
                    onChange={(e) => setNewLink(prev => ({ ...prev, partner: e.target.value }))}
                  >
                    <option value="">Select Partner</option>
                    {Object.entries(partners)
                      .filter(([_, partner]) => partner.active)
                      .map(([id, partner]) => (
                        <option key={id} value={id}>{partner.name}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="productId">Product ID</Label>
                  <Input
                    id="productId"
                    placeholder="Product identifier"
                    value={newLink.productId}
                    onChange={(e) => setNewLink(prev => ({ ...prev, productId: e.target.value }))}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddLink} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Existing Links */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Affiliate Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(affiliateLinks).map(([supplement, links]) => (
                  <div key={supplement} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 capitalize">{supplement.replace('-', ' ')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.entries(links).map(([partnerId, productId]) => (
                        <div key={partnerId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="text-sm font-medium">{partners[partnerId]?.name}</div>
                            <div className="text-xs text-gray-600">{productId}</div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(generateAffiliateUrl(partnerId, productId), '_blank')}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(mockPerformanceData).map(([partnerId, data]) => (
              <Card key={partnerId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{partners[partnerId]?.name}</span>
                    <Badge className={partners[partnerId]?.color}>
                      {partners[partnerId]?.commission}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Clicks</span>
                      <span className="font-semibold">{data.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Conversions</span>
                      <span className="font-semibold">{data.conversions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="font-semibold">${data.revenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="font-semibold">{data.conversionRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <BarChart3 className="h-4 w-4" />
            <AlertDescription>
              <strong>Analytics Integration:</strong> Connect Google Analytics or other tracking tools 
              for more detailed performance insights and attribution tracking.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}

