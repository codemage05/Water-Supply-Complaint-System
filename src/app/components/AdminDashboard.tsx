import { useState, useEffect } from 'react';
import {
  Filter,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Phone,
  Calendar,
  Upload,
  X,
} from 'lucide-react';
import { storage } from '../utils/storage';

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

const statusColors = {
  submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  assigned: 'bg-orange-100 text-orange-800',
  in_progress: 'bg-purple-100 text-purple-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};

// Mock officials list
const officials = [
  { id: 1, name: 'Rajesh Kumar', phone: '+91-98765-43210', area: 'North Zone' },
  { id: 2, name: 'Priya Sharma', phone: '+91-98765-43211', area: 'South Zone' },
  { id: 3, name: 'Amit Patel', phone: '+91-98765-43212', area: 'East Zone' },
  { id: 4, name: 'Sunita Devi', phone: '+91-98765-43213', area: 'West Zone' },
];

export function AdminDashboard() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationData, setVerificationData] = useState({
    workPhoto: null as File | null,
    geoLocation: '',
    notes: '',
  });

  useEffect(() => {
    // Load complaints from storage
    const loadedComplaints = JSON.parse(storage.getItem('complaints') || '[]');
    setComplaints(loadedComplaints);
    setFilteredComplaints(loadedComplaints);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = complaints;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((c) => c.status === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter((c) => c.priority === filterPriority);
    }

    setFilteredComplaints(filtered);
  }, [filterStatus, filterPriority, complaints]);

  const updateComplaint = (id: string, updates: any) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    setComplaints(updated);
    storage.setItem('complaints', JSON.stringify(updated));
    if (selectedComplaint?.id === id) {
      setSelectedComplaint({ ...selectedComplaint, ...updates });
    }
  };

  const assignOfficial = (complaintId: string, official: any) => {
    updateComplaint(complaintId, {
      status: 'assigned',
      assignedTo: official.name,
      officialPhone: official.phone,
    });
  };

  const updateStatus = (complaintId: string, status: string) => {
    updateComplaint(complaintId, { status });
  };

  const updatePriority = (complaintId: string, priority: string) => {
    updateComplaint(complaintId, { priority });
  };

  const handleVerification = () => {
    if (selectedComplaint) {
      updateComplaint(selectedComplaint.id, {
        status: 'resolved',
        verification: {
          geoLocation: verificationData.geoLocation,
          notes: verificationData.notes,
          timestamp: new Date().toISOString(),
        },
      });
      setShowVerificationModal(false);
      setVerificationData({ workPhoto: null, geoLocation: '', notes: '' });
    }
  };

  const getStats = () => {
    const total = complaints.length;
    const submitted = complaints.filter((c) => c.status === 'submitted').length;
    const inProgress = complaints.filter(
      (c) => c.status === 'in_progress' || c.status === 'assigned'
    ).length;
    const resolved = complaints.filter((c) => c.status === 'resolved').length;

    return { total, submitted, inProgress, resolved };
  };

  const stats = getStats();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getIssueTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      no_water: 'No Water Supply',
      low_pressure: 'Low Pressure',
      contaminated: 'Contaminated Water',
      broken_pipeline: 'Broken Pipeline',
      leakage: 'Water Leakage',
      other: 'Other Issue',
    };
    return types[type] || type;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Complaints</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.submitted}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-orange-600">{stats.inProgress}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">All Complaints</h2>
              <Filter className="w-5 h-5 text-gray-600" />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredComplaints.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No complaints found. Submit a complaint to see it here.
              </div>
            ) : (
              filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  onClick={() => setSelectedComplaint(complaint)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                    selectedComplaint?.id === complaint.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{complaint.id}</p>
                      <p className="text-sm text-gray-600">{getIssueTypeLabel(complaint.issueType)}</p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          priorityColors[complaint.priority as keyof typeof priorityColors]
                        }`}
                      >
                        {complaint.priority}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          statusColors[complaint.status as keyof typeof statusColors]
                        }`}
                      >
                        {complaint.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {complaint.village}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(complaint.submittedAt)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Complaint Details Panel */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Complaint Details</h2>
          </div>

          {selectedComplaint ? (
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">ID:</span>
                    <span className="ml-2 font-medium">{selectedComplaint.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{selectedComplaint.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <span className="ml-2 font-medium">{selectedComplaint.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Village:</span>
                    <span className="ml-2 font-medium">{selectedComplaint.village}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Issue:</span>
                    <span className="ml-2 font-medium">
                      {getIssueTypeLabel(selectedComplaint.issueType)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-700">{selectedComplaint.description}</p>
              </div>

              {/* Priority */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Set Priority</h3>
                <select
                  value={selectedComplaint.priority}
                  onChange={(e) => updatePriority(selectedComplaint.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Update Status</h3>
                <select
                  value={selectedComplaint.status}
                  onChange={(e) => updateStatus(selectedComplaint.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Assign Official */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Assign Official</h3>
                {selectedComplaint.assignedTo ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedComplaint.assignedTo}
                    </p>
                    <p className="text-sm text-gray-600">{selectedComplaint.officialPhone}</p>
                  </div>
                ) : null}
                <select
                  onChange={(e) => {
                    const official = officials.find((o) => o.id === parseInt(e.target.value));
                    if (official) assignOfficial(selectedComplaint.id, official);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select official...</option>
                  {officials.map((official) => (
                    <option key={official.id} value={official.id}>
                      {official.name} - {official.area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verification */}
              {selectedComplaint.status === 'in_progress' && (
                <div>
                  <button
                    onClick={() => setShowVerificationModal(true)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Verification
                  </button>
                </div>
              )}

              {selectedComplaint.verification && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Verification</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Geo-Location:</span>
                      <span className="ml-2 font-medium">
                        {selectedComplaint.verification.geoLocation}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Notes:</span>
                      <p className="mt-1 text-gray-700">{selectedComplaint.verification.notes}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Verified At:</span>
                      <span className="ml-2 font-medium">
                        {formatDate(selectedComplaint.verification.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Select a complaint to view details
            </div>
          )}
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Upload Verification</h3>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Completion Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setVerificationData({
                      ...verificationData,
                      workPhoto: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Geo-Location (Lat, Long)
                </label>
                <input
                  type="text"
                  value={verificationData.geoLocation}
                  onChange={(e) =>
                    setVerificationData({
                      ...verificationData,
                      geoLocation: e.target.value,
                    })
                  }
                  placeholder="e.g., 28.6139, 77.2090"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Completion Notes
                </label>
                <textarea
                  value={verificationData.notes}
                  onChange={(e) =>
                    setVerificationData({
                      ...verificationData,
                      notes: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Describe the work completed..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowVerificationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleVerification}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Submit Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
