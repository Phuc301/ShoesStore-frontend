import React, { useState } from 'react';
import {
  Store,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Globe,
  Save,
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('store');

  const settingTabs = [
    { id: 'store', label: 'Store Info', icon: Store },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'general', label: 'General', icon: Globe },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'store':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Store Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  defaultValue="ShoeStore"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store URL
                </label>
                <input
                  type="text"
                  defaultValue="https://shoestore.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Description
              </label>
              <textarea
                rows={4}
                defaultValue="Premium footwear collection for all ages. Quality shoes with style and comfort."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@shoestore.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1-555-0199"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Address
              </label>
              <textarea
                rows={3}
                defaultValue="123 Commerce St, Business District, New York, NY 10001"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Payment Methods
            </h3>

            <div className="space-y-4">
              {[
                'Credit/Debit Cards',
                'PayPal',
                'Apple Pay',
                'Google Pay',
                'Bank Transfer',
              ].map((method, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{method}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">
                Currency Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Currency
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue="8.25"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'shipping':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Shipping Options
            </h3>

            <div className="space-y-4">
              {[
                {
                  name: 'Standard Shipping',
                  time: '5-7 business days',
                  price: '$4.99',
                },
                {
                  name: 'Express Shipping',
                  time: '2-3 business days',
                  price: '$9.99',
                },
                {
                  name: 'Overnight Shipping',
                  time: '1 business day',
                  price: '$19.99',
                },
                {
                  name: 'Free Shipping',
                  time: '7-10 business days',
                  price: 'Free (orders over $50)',
                },
              ].map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {option.name}
                    </div>
                    <div className="text-sm text-gray-500">{option.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {option.price}
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">
                Shipping Zones
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zone Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Domestic"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Countries/Regions
                    </label>
                    <input
                      type="text"
                      defaultValue="United States"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Rate
                    </label>
                    <input
                      type="text"
                      defaultValue="$4.99"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Notification Preferences
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  Email Notifications
                </h4>
                <div className="space-y-3">
                  {[
                    'New orders',
                    'Low stock alerts',
                    'Customer reviews',
                    'Payment confirmations',
                    'Weekly sales reports',
                    'Monthly analytics',
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700">{notification}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  Push Notifications
                </h4>
                <div className="space-y-3">
                  {['Urgent alerts', 'Order updates', 'System maintenance'].map(
                    (notification, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{notification}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={index < 2}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Security Settings
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  Change Password
                </h4>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  Two-Factor Authentication
                </h4>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Enable 2FA</div>
                    <div className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  Session Management
                </h4>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          Current Session
                        </div>
                        <div className="text-sm text-gray-500">
                          Chrome on Windows • New York, US
                        </div>
                      </div>
                      <span className="text-sm text-green-600 font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          Mobile App
                        </div>
                        <div className="text-sm text-gray-500">
                          iPhone • Last seen 2 hours ago
                        </div>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-700">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              General Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-800 mb-4">
                Data & Privacy
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    Allow analytics tracking
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    Customer data retention (days)
                  </span>
                  <input
                    type="number"
                    defaultValue="365"
                    className="w-24 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="lg:w-64 bg-white rounded-lg border border-gray-200 p-4">
          <nav className="space-y-1">
            {settingTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-orange-600' : 'text-gray-500'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isActive ? 'text-orange-600' : 'text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          {renderTabContent()}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-end space-x-4">
              <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
