import { useState } from 'react';
import { Phone, MessageSquare, User, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { storage } from '../utils/storage';

const issueTypes = [
  { value: 'no_water', label: 'No Water Supply' },
  { value: 'low_pressure', label: 'Low Pressure' },
  { value: 'contaminated', label: 'Contaminated Water' },
  { value: 'broken_pipeline', label: 'Broken Pipeline' },
  { value: 'leakage', label: 'Water Leakage' },
  { value: 'other', label: 'Other Issue' },
];

export function SubmitComplaint() {
  const [submissionMethod, setSubmissionMethod] = useState('form');
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    issueType: '',
    description: '',
    landmark: '',
  });

  const generateComplaintId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `WC${timestamp}${random}`.toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateComplaintId();

    // In a real app with Supabase, save to database here
    const complaint = {
      id,
      ...formData,
      status: 'submitted',
      priority: 'medium',
      submittedAt: new Date().toISOString(),
      submissionMethod,
    };

    // Store in storage
    const complaints = JSON.parse(storage.getItem('complaints') || '[]');
    complaints.push(complaint);
    storage.setItem('complaints', JSON.stringify(complaints));

    setComplaintId(id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setComplaintId('');
    setFormData({
      name: '',
      phone: '',
      village: '',
      issueType: '',
      description: '',
      landmark: '',
    });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Complaint Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            शिकायत सफलतापूर्वक दर्ज की गई
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Complaint ID / आपकी शिकायत आईडी:</p>
            <p className="text-3xl font-bold text-blue-600 mb-2">{complaintId}</p>
            <p className="text-sm text-gray-600">
              Please save this ID to track your complaint
            </p>
            <p className="text-sm text-gray-600">
              कृपया इस आईडी को सहेजें ताकि आप अपनी शिकायत को ट्रैक कर सकें
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Your complaint will be reviewed within 24 hours</li>
              <li>• An official will be assigned to your case</li>
              <li>• You'll receive updates via SMS</li>
              <li>• Track status anytime using your Complaint ID</li>
            </ul>
          </div>

          <button
            onClick={handleReset}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Another Complaint
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Submit Water Complaint / शिकायत दर्ज करें
        </h2>

        {/* Submission Method Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you like to submit? / आप कैसे शिकायत करना चाहते हैं?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setSubmissionMethod('form')}
              className={`p-4 rounded-lg border-2 transition ${
                submissionMethod === 'form'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <User className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">Online Form</div>
              <div className="text-sm text-gray-600">ऑनलाइन फॉर्म</div>
            </button>

            <button
              onClick={() => setSubmissionMethod('ivr')}
              className={`p-4 rounded-lg border-2 transition ${
                submissionMethod === 'ivr'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Phone className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">IVR Call</div>
              <div className="text-sm text-gray-600">टोल-फ्री कॉल</div>
            </button>

            <button
              onClick={() => setSubmissionMethod('sms')}
              className={`p-4 rounded-lg border-2 transition ${
                submissionMethod === 'sms'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">SMS/WhatsApp</div>
              <div className="text-sm text-gray-600">एसएमएस/व्हाट्सएप</div>
            </button>
          </div>
        </div>

        {/* Info for IVR */}
        {submissionMethod === 'ivr' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Toll-Free IVR Helpline / टोल-फ्री हेल्पलाइन
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">1800-XXX-XXXX</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Call available 24/7</li>
                  <li>• Support in Hindi, English, and local languages</li>
                  <li>• Voice-guided complaint registration</li>
                  <li>• Receive Complaint ID via SMS</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Info for SMS/WhatsApp */}
        {submissionMethod === 'sms' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  SMS/WhatsApp Complaint / एसएमएस/व्हाट्सएप शिकायत
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-2">+91-XXXXX-XXXXX</p>
                <p className="text-sm text-gray-700 mb-2">Format:</p>
                <code className="bg-white px-3 py-2 rounded text-sm block mb-2">
                  WATER [Village] [Issue Type] [Description]
                </code>
                <p className="text-sm text-gray-700">Example:</p>
                <code className="bg-white px-3 py-2 rounded text-sm block">
                  WATER Rampur NO_WATER No water since 3 days
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Complaint Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name / नाम <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number / फोन नंबर <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Village/Area / गांव/क्षेत्र <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter village or area name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Issue / समस्या का प्रकार <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.issueType}
              onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select issue type</option>
              {issueTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description / विवरण <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the issue in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Landmark / निशान (Optional)
            </label>
            <input
              type="text"
              value={formData.landmark}
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nearby landmark for easy identification"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">Note:</p>
                <p>Your complaint will be registered and you'll receive a unique Complaint ID. Please save this ID to track your complaint status.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Complaint / शिकायत दर्ज करें
          </button>
        </form>
      </div>
    </div>
  );
}
