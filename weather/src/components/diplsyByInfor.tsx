import React from 'react';

interface WeatherInfoBoxProps {
  label: string;
  value: string | number;
  unit?: string;
}

const WeatherInfoBox: React.FC<WeatherInfoBoxProps> = ({ label, value, unit }) => {
  return (
    <div className="bg-white/20 text-white p-4 rounded-xl shadow-md w-40 text-center">
      <h4 className="text-lg font-semibold mb-1">{label}</h4>
      <p className="text-lg font-bold">
        {value} {unit}
      </p>
    </div>
  );
};

export default WeatherInfoBox;
