import React, { useState, useEffect } from "react";

const TIMEZONES = [
  {
    city: "San José, Costa Rica",
    timezone: "America/Costa_Rica",
    flag: "🇨🇷",
    description: "My hometown",
  },
  {
    city: "New York",
    timezone: "America/New_York",
    flag: "🇺🇸",
    description: "East Coast",
  },
  {
    city: "Los Angeles",
    timezone: "America/Los_Angeles",
    flag: "🇺🇸",
    description: "West Coast",
  },
  {
    city: "Chicago",
    timezone: "America/Chicago",
    flag: "🇺🇸",
    description: "Central",
  },
];

function TimeCard({ city, timezone, flag, description, isCostaRica }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, timezone) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(date);
    } catch (error) {
      return "Error";
    }
  };

  const formatDate = (date, timezone) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(date);
    } catch (error) {
      return "Error";
    }
  };

  return (
    <div
      className={`relative flex items-center justify-between p-6 bg-white rounded-xl border transition-colors duration-200 ${
        isCostaRica
          ? "border-blue-200 bg-blue-50/30 hover:bg-blue-50/50 shadow-sm"
          : "border-gray-100 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center space-x-4">
        <span className="text-2xl">{flag}</span>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 m-0">{city}</h3>
            {isCostaRica && (
              <span className=" text-blue-500 text-sm font-medium whitespace-nowrap">
                I'm here
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5 mb-0">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-blue-600 font-mono">
          {formatTime(time, timezone)}
        </div>
        <div className="text-sm text-gray-500 font-medium">
          {formatDate(time, timezone)}
        </div>
      </div>
      {isCostaRica && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}

export default function TimezoneDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sort timezones by current time
  const sortedTimezones = [...TIMEZONES].sort((a, b) => {
    const timeA = new Date(
      currentTime.toLocaleString("en-US", { timeZone: a.timezone })
    );
    const timeB = new Date(
      currentTime.toLocaleString("en-US", { timeZone: b.timezone })
    );
    return timeA.getTime() - timeB.getTime();
  });

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      <div className="space-y-4 relative">
        {sortedTimezones.map((tz, index) => {
          const isCostaRica = tz.city === "San José, Costa Rica";
          return (
            <div key={index} className="relative">
              <TimeCard
                city={tz.city}
                timezone={tz.timezone}
                flag={tz.flag}
                description={tz.description}
                isCostaRica={isCostaRica}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
