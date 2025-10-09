import { useState, useEffect } from 'react';
import { FaRupeeSign, FaCalculator } from 'react-icons/fa';

const PriceCalculator = ({ distance, weight, vehicleType, onPriceCalculated }) => {
  const [price, setPrice] = useState(0);
  const [breakdown, setBreakdown] = useState({});

  const rates = {
    bike: { base: 30, perKm: 8, perKg: 5 },
    car: { base: 50, perKm: 12, perKg: 3 },
    truck: { base: 100, perKm: 20, perKg: 2 }
  };

  useEffect(() => {
    if (distance && weight && vehicleType) {
      const rate = rates[vehicleType] || rates.bike;
      const basePrice = rate.base;
      const distancePrice = distance * rate.perKm;
      const weightPrice = weight * rate.perKg;
      const totalPrice = basePrice + distancePrice + weightPrice;

      const calculatedBreakdown = {
        base: basePrice,
        distance: distancePrice,
        weight: weightPrice,
        total: totalPrice
      };

      setPrice(totalPrice);
      setBreakdown(calculatedBreakdown);
      onPriceCalculated?.(totalPrice);
    }
  }, [distance, weight, vehicleType]);

  if (!distance || !weight || !vehicleType) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
      <div className="flex items-center mb-3">
        <FaCalculator className="text-orange-500 mr-2" />
        <h3 className="font-semibold text-gray-800">Price Breakdown</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base fare ({vehicleType}):</span>
          <span className="flex items-center">
            <FaRupeeSign className="w-3 h-3" />
            {breakdown.base}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Distance ({distance} km):</span>
          <span className="flex items-center">
            <FaRupeeSign className="w-3 h-3" />
            {breakdown.distance}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Weight ({weight} kg):</span>
          <span className="flex items-center">
            <FaRupeeSign className="w-3 h-3" />
            {breakdown.weight}
          </span>
        </div>
        <hr className="border-orange-200" />
        <div className="flex justify-between font-bold text-lg text-orange-600">
          <span>Total:</span>
          <span className="flex items-center">
            <FaRupeeSign className="w-4 h-4" />
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;