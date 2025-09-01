import React, { useState } from 'react';
import { MdHelp, MdPhone, MdEmail, MdChat, MdQuestionAnswer, MdBook, MdBugReport, MdFeedback, MdExpandMore, MdExpandLess, MdSend } from 'react-icons/md';

const Help = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      id: 1,
      question: "How do I accept new orders?",
      answer: "Go to the Orders section in your dashboard. You'll see all available orders with a 'Accept' button. Click on it to accept the order and it will move to 'Out for Delivery' status."
    },
    {
      id: 2,
      question: "How do I update my location?",
      answer: "Click on 'Update Location' button in the Quick Actions section of your dashboard. Make sure location services are enabled in your browser."
    },
    {
      id: 3,
      question: "What should I do if I can't find the delivery address?",
      answer: "Contact the customer using the provided contact information. If still unable to locate, contact support immediately for assistance."
    },
    {
      id: 4,
      question: "How are my earnings calculated?",
      answer: "Earnings are calculated based on completed deliveries. Each successful delivery earns you $50. You can view your total earnings in the dashboard."
    },
    {
      id: 5,
      question: "Can I cancel an accepted order?",
      answer: "Once you accept an order, you should complete it. If there's an emergency, contact support immediately. Frequent cancellations may affect your rating."
    },
    {
      id: 6,
      question: "How do I change my working hours?",
      answer: "Go to Settings > Preferences > Working Hours. Set your preferred start and end times for receiving orders."
    },
    {
      id: 7,
      question: "What if the customer is not available for delivery?",
      answer: "Try calling the customer first. If no response, wait for 10 minutes and try again. If still unavailable, contact support for further instructions."
    },
    {
      id: 8,
      question: "How do I report a problem with an order?",
      answer: "Use the 'Report Issue' button in the order details, or contact support directly through the contact form below."
    }
  ];

  const contactOptions = [
    {
      icon: MdPhone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+91 9876543210",
      availability: "24/7 Available",
      color: "bg-green-500"
    },
    {
      icon: MdEmail,
      title: "Email Support",
      description: "Send us your queries via email",
      contact: "support@instantdispatch.com",
      availability: "Response within 2 hours",
      color: "bg-blue-500"
    },
    {
      icon: MdChat,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available in app",
      availability: "9 AM - 9 PM",
      color: "bg-purple-500"
    }
  ];

  const quickLinks = [
    { icon: MdBook, title: "User Manual", description: "Complete guide for riders" },
    { icon: MdQuestionAnswer, title: "Training Videos", description: "Learn with video tutorials" },
    { icon: MdBugReport, title: "Report Bug", description: "Report technical issues" },
    { icon: MdFeedback, title: "Feedback", description: "Share your suggestions" }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ subject: '', message: '', priority: 'medium' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4 flex items-center">
            <MdHelp className="mr-3 text-orange-500" size={40} />
            Help & Support
          </h1>
          <p className="text-gray-600 text-lg">Get help and support for your delivery operations</p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mb-4`}>
                <option.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-3">{option.description}</p>
              <p className="text-orange-600 font-semibold mb-2">{option.contact}</p>
              <p className="text-sm text-gray-500">{option.availability}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MdQuestionAnswer className="mr-3 text-orange-500" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <MdExpandLess className="text-orange-500" size={24} />
                    ) : (
                      <MdExpandMore className="text-orange-500" size={24} />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MdEmail className="mr-3 text-orange-500" />
              Contact Support
            </h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdSend className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Priority</label>
                  <select
                    name="priority"
                    value={contactForm.priority}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Need assistance</option>
                    <option value="high">High - Urgent issue</option>
                    <option value="critical">Critical - Emergency</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Describe your issue in detail..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-500 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <MdSend className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
                <link.icon className="text-orange-500 mb-4" size={32} />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{link.title}</h3>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
            <MdPhone className="mr-2" />
            Emergency Contact
          </h3>
          <p className="text-red-700 mb-2">
            For urgent issues during delivery (accidents, safety concerns, etc.)
          </p>
          <p className="text-red-800 font-bold text-lg">📞 Emergency Hotline: +91 9876543210</p>
          <p className="text-red-600 text-sm mt-1">Available 24/7 for emergencies only</p>
        </div>
      </div>
    </div>
  );
};

export default Help;