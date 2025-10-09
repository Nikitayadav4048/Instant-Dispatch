import { useState } from 'react';
import { FaPhone, FaEnvelope, FaComments, FaTimes } from 'react-icons/fa';

const ContactSupport = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your support system
    alert('Support request sent! We\'ll get back to you soon.');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Contact Support</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'chat' ? 'bg-orange-500 text-white' : 'text-gray-600'
              }`}
            >
              <FaComments className="inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'contact' ? 'bg-orange-500 text-white' : 'text-gray-600'
              }`}
            >
              <FaPhone className="inline mr-2" />
              Contact
            </button>
          </div>

          {activeTab === 'chat' ? (
            <form onSubmit={handleSubmit}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <FaPhone className="text-orange-500 mr-3" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-gray-600">+91 9876543210</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <FaEnvelope className="text-orange-500 mr-3" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm text-gray-600">support@instantdispatch.com</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Available 24/7 for your support
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;