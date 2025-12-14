import React from 'react';
import { CreditCard } from 'lucide-react';
import { PAYMENT_METHODS } from '@/constants/paymentMethods.constants';

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedMethod,
  onMethodSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <CreditCard className="h-5 w-5 mr-2 text-orange-500" />
        Phương thức thanh toán
      </h3>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const IconComponent = method.icon;
          return (
            <div
              key={method.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => onMethodSelect(method.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-gray-100 ${method.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === method.id
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === method.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
