import { useState } from 'react';
import { Search, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { storage } from '../utils/storage';

const statusConfig = {
  submitted: {
    label: 'Submitted',
    labelHi: 'प्रस्तुत',
    icon: Clock,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  under_review: {
    label: 'Under Review',
    labelHi: 'समीक्षाधीन',
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  assigned: {
    label: 'Assigned',
    labelHi: 'सौंपा गया',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  in_progress: {
    label: 'In Progress',
    labelHi: 'प्रगति में',
    icon: Clock,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  resolved: {
    label: 'Resolved',
    labelHi: 'हल हो गया',
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  closed: {
    label: 'Closed',
    labelHi: 'बंद',
    icon: XCircle,
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
};

export function TrackComplaint() {
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Search in storage
    const complaints = JSON.parse(storage.getItem('complaints') || '[]');
    const found = complaints.find((c: any) => c.id === complaintId.trim().toUpperCase());

    if (found) {
      setComplaint(found);
      setNotFound(false);
    } else {
      setComplaint(null);
      setNotFound(true);
    }
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Track Complaint / शिकायत ट्रैक करें
        </h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Complaint ID / शिकायत आईडी दर्ज करें
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., WCLXYZ123ABC"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Track
            </button>
          </div>
        </form>

        {/* Not Found Message */}
        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Complaint Not Found</h3>
                <p className="text-sm text-gray-700">
                  No complaint found with ID: <strong>{complaintId}</strong>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Please check the Complaint ID and try again. Make sure to enter the complete ID.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Complaint Details */}
        {complaint && (
          <div className="space-y-6">
            {/* Status Header */}
            <div className={`${statusConfig[complaint.status as keyof typeof statusConfig].bg} ${statusConfig[complaint.status as keyof typeof statusConfig].border} border-2 rounded-lg p-6`}>
              <div className="flex items-center gap-4 mb-4">
                {(() => {
                  const StatusIcon = statusConfig[complaint.status as keyof typeof statusConfig].icon;
                  return <StatusIcon className={`w-10 h-10 ${statusConfig[complaint.status as keyof typeof statusConfig].color}`} />;
                })()}
                <div>
                  <p className="text-sm text-gray-600">Current Status</p>
                  <p className={`text-2xl font-bold ${statusConfig[complaint.status as keyof typeof statusConfig].color}`}>
                    {statusConfig[complaint.status as keyof typeof statusConfig].label}
                  </p>
                  <p className="text-sm text-gray-600">
                    {statusConfig[complaint.status as keyof typeof statusConfig].labelHi}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Complaint ID</p>
                  <p className="font-semibold text-gray-900">{complaint.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted On</p>
                  <p className="font-semibold text-gray-900">{formatDate(complaint.submittedAt)}</p>
                </div>
              </div>
            </div>

            {/* Complaint Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Complaint Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{complaint.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{complaint.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Village/Area</p>
                  <p className="font-medium text-gray-900">{complaint.village}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Issue Type</p>
                  <p className="font-medium text-gray-900">{getIssueTypeLabel(complaint.issueType)}</p>
                </div>
                {complaint.landmark && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Landmark</p>
                    <p className="font-medium text-gray-900">{complaint.landmark}</p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium text-gray-900">{complaint.description}</p>
                </div>
              </div>
            </div>

            {/* Assigned Official (if exists) */}
            {complaint.assignedTo && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Assigned Official</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{complaint.assignedTo}</p>
                  </div>
                  {complaint.officialPhone && (
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium text-gray-900">{complaint.officialPhone}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Timeline / समयरेखा</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-gray-900">Complaint Submitted</p>
                    <p className="text-sm text-gray-600">{formatDate(complaint.submittedAt)}</p>
                    <p className="text-sm text-gray-500 mt-1">Complaint registered via {complaint.submissionMethod}</p>
                  </div>
                </div>

                {complaint.status !== 'submitted' && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                      {complaint.status !== 'under_review' && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="pb-6">
                      <p className="font-semibold text-gray-900">Under Review</p>
                      <p className="text-sm text-gray-600">Complaint is being reviewed by officials</p>
                    </div>
                  </div>
                )}

                {(complaint.status === 'assigned' || complaint.status === 'in_progress' || complaint.status === 'resolved' || complaint.status === 'closed') && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                      {complaint.status !== 'assigned' && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="pb-6">
                      <p className="font-semibold text-gray-900">Assigned to Official</p>
                      <p className="text-sm text-gray-600">Official assigned to resolve the issue</p>
                    </div>
                  </div>
                )}

                {(complaint.status === 'in_progress' || complaint.status === 'resolved' || complaint.status === 'closed') && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      {complaint.status !== 'in_progress' && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="pb-6">
                      <p className="font-semibold text-gray-900">Work in Progress</p>
                      <p className="text-sm text-gray-600">Team is working to resolve the issue</p>
                    </div>
                  </div>
                )}

                {(complaint.status === 'resolved' || complaint.status === 'closed') && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Resolved</p>
                      <p className="text-sm text-gray-600">Issue has been resolved</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Help Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-2">
                If you have any questions about your complaint status, please contact:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Helpline: 1800-XXX-XXXX</li>
                <li>• SMS/WhatsApp: +91-XXXXX-XXXXX</li>
                <li>• Email: complaints@water.gov.in</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
