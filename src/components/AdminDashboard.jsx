import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  MousePointer, 
  ExternalLink,
  Target,
  BarChart3,
  Settings
} from 'lucide-react';
import { AffiliateManager } from './AffiliateManager.jsx';
import { ContextualAdManager } from './ContextualAdManager.jsx';
import { RevenueTracker } from './RevenueTracker.jsx';

export function AdminDashboard() {
  const [revenue] = useState({
    today: 127.45,
    thisWeek: 892.34,
    thisMonth: 3456.78,
    target: 1500
  });

  const [metrics] = useState({
    totalClicks: 2847,
    conversions: 203,
    conversionRate: 7.1,
    averageOrderValue: 67.89
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor your supplement stacker website performance</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          ${revenue.today}/day
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenue.today}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalClicks}</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.conversions}</div>
                <p className="text-xs text-muted-foreground">
                  {metrics.conversionRate}% conversion rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${metrics.averageOrderValue}</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current: ${revenue.thisMonth}</span>
                  <span>Target: ${revenue.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((revenue.thisMonth / revenue.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {((revenue.thisMonth / revenue.target) * 100).toFixed(1)}% of monthly target achieved
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Affiliate Links</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Automatically insert affiliate links</p>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contextual Ads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Display relevant supplement ads</p>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Monitor clicks and conversions</p>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenueTracker />
        </TabsContent>

        <TabsContent value="affiliates" className="space-y-6">
          <AffiliateManager />
        </TabsContent>

        <TabsContent value="ads" className="space-y-6">
          <ContextualAdManager />
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Organic Search</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Media</span>
                    <span>20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Referral</span>
                    <span>10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Supplements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Caffeine</span>
                    <span>234 views</span>
                  </div>
                  <div className="flex justify-between">
                    <span>L-Theanine</span>
                    <span>189 views</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alpha-GPC</span>
                    <span>156 views</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Modafinil</span>
                    <span>134 views</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monetization Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Affiliate Links</h4>
                    <p className="text-sm text-gray-600">Automatically insert affiliate links in supplement modals</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Ad Placements</h4>
                    <p className="text-sm text-gray-600">Manage contextual ad placements</p>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Analytics</h4>
                    <p className="text-sm text-gray-600">Configure tracking and analytics</p>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

