import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { SubmitComplaint } from './components/SubmitComplaint';
import { TrackComplaint } from './components/TrackComplaint';
import { AdminDashboard } from './components/AdminDashboard';
import { Droplet } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('submit');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Droplet className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              जल शिकायत प्रबंधन प्रणाली
            </h1>
          </div>
          <h2 className="text-2xl text-gray-700">
            Water Complaint Management System
          </h2>
          <p className="text-gray-600 mt-2">
            Transparent, Accessible, Accountable
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="submit">Submit Complaint</TabsTrigger>
            <TabsTrigger value="track">Track Status</TabsTrigger>
            <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            <SubmitComplaint />
          </TabsContent>

          <TabsContent value="track">
            <TrackComplaint />
          </TabsContent>

          <TabsContent value="admin">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
