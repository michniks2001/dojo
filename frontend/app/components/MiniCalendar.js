"use client";

import { useState } from "react";

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfWeek = (month, year) => {
  return new Date(year, month, 1).getDay();
};

export default function MiniCalendar({ eventsByDate, onDayClick }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfWeek = getFirstDayOfWeek(currentMonth, currentYear);
  const days = [];

  // Fill empty days before the 1st
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  // Fill days for this month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mt-6">
      <div className="flex items-center justify-between mb-2">
        <button
          className="text-[#C1272D] font-bold px-2 py-1 rounded hover:bg-[#F5F5F5]"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <span className="font-semibold text-lg text-[#333]">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          className="text-[#C1272D] font-bold px-2 py-1 rounded hover:bg-[#F5F5F5]"
          onClick={handleNextMonth}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#666] mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} className="h-8" />;
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const hasEvent = eventsByDate && eventsByDate[dateKey] && eventsByDate[dateKey].length > 0;
          return (
            <button
              key={idx}
              className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-colors
                ${hasEvent ? "font-bold text-[#C1272D] bg-[#F5F5F5] hover:bg-[#D4AF37]/20" : "hover:bg-[#F5F5F5]"}
                ${today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear ? "border-2 border-[var(--primary)]" : ""}
              `}
              onClick={() => hasEvent && onDayClick(dateKey)}
              disabled={!hasEvent}
            >
              {day}
              {hasEvent && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 mt-1 flex items-center justify-center">
  <span className="block w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
