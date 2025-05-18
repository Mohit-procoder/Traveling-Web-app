import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, Edit, Save, Plus, Trash } from 'lucide-react';

interface Day {
  date: string;
  activities: Activity[];
  notes: string;
}

interface Activity {
  id: string;
  time: string;
  name: string;
}

const PlannerPage: React.FC = () => {
  const [tripStartDate, setTripStartDate] = useState<string>('2025-06-15');
  const [tripEndDate, setTripEndDate] = useState<string>('2025-06-22');
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [hoursRemaining, setHoursRemaining] = useState<number>(0);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [days, setDays] = useState<Day[]>([]);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  
  // Generate days between start and end date
  useEffect(() => {
    const start = new Date(tripStartDate);
    const end = new Date(tripEndDate);
    const daysBetween: Day[] = [];
    
    const currentDate = new Date(start);
    while (currentDate <= end) {
      daysBetween.push({
        date: currentDate.toISOString().split('T')[0],
        activities: [],
        notes: ''
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    setDays(daysBetween);
    // Expand the first day by default if we have days
    if (daysBetween.length > 0 && !expandedDay) {
      setExpandedDay(daysBetween[0].date);
    }
  }, [tripStartDate, tripEndDate]);
  
  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const tripStart = new Date(tripStartDate);
      
      // Calculate time difference
      const diff = tripStart.getTime() - now.getTime();
      
      if (diff <= 0) {
        // Trip has started
        clearInterval(interval);
        setDaysRemaining(0);
        setHoursRemaining(0);
        setMinutesRemaining(0);
        setSecondsRemaining(0);
        return;
      }
      
      // Calculate remaining time
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setDaysRemaining(days);
      setHoursRemaining(hours);
      setMinutesRemaining(minutes);
      setSecondsRemaining(seconds);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [tripStartDate]);
  
  const toggleDay = (date: string) => {
    setExpandedDay(expandedDay === date ? null : date);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const addActivity = (dayDate: string) => {
    setDays(days.map(day => {
      if (day.date === dayDate) {
        return {
          ...day,
          activities: [
            ...day.activities,
            { id: `act-${Date.now()}`, time: '09:00', name: 'New Activity' }
          ]
        };
      }
      return day;
    }));
  };
  
  const updateActivity = (dayDate: string, activityId: string, field: 'time' | 'name', value: string) => {
    setDays(days.map(day => {
      if (day.date === dayDate) {
        return {
          ...day,
          activities: day.activities.map(activity => {
            if (activity.id === activityId) {
              return { ...activity, [field]: value };
            }
            return activity;
          })
        };
      }
      return day;
    }));
  };
  
  const removeActivity = (dayDate: string, activityId: string) => {
    setDays(days.map(day => {
      if (day.date === dayDate) {
        return {
          ...day,
          activities: day.activities.filter(activity => activity.id !== activityId)
        };
      }
      return day;
    }));
  };
  
  const startEditingNotes = (dayDate: string, notes: string) => {
    setEditingNotes(dayDate);
    setTempNotes(notes);
  };
  
  const saveNotes = (dayDate: string) => {
    setDays(days.map(day => {
      if (day.date === dayDate) {
        return { ...day, notes: tempNotes };
      }
      return day;
    }));
    
    setEditingNotes(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="mb-3">Trip Countdown & Daily Planner</h1>
          <p className="text-neutral-600 max-w-2xl">
            Keep track of the time until your trip and plan your daily activities with our interactive trip planner.
          </p>
        </div>
        
        {/* Countdown Timer */}
        <div className="mb-16">
          <div className="relative bg-gradient-to-r from-primary-600 to-primary-400 rounded-xl p-8 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-40 h-40 bg-white/10 rounded-full -top-10 -left-10"></div>
              <div className="absolute w-56 h-56 bg-white/10 rounded-full -bottom-20 -right-20"></div>
              <div className="absolute w-24 h-24 bg-white/10 rounded-full top-1/2 left-1/4"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Calendar className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-semibold text-white">Trip Countdown</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <span className="block text-4xl font-bold text-white">{daysRemaining}</span>
                  <span className="text-white/80">Days</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <span className="block text-4xl font-bold text-white">{hoursRemaining}</span>
                  <span className="text-white/80">Hours</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <span className="block text-4xl font-bold text-white">{minutesRemaining}</span>
                  <span className="text-white/80">Minutes</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <span className="block text-4xl font-bold text-white">{secondsRemaining}</span>
                  <span className="text-white/80">Seconds</span>
                </motion.div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-auto">
                  <label className="block text-white/80 mb-1 text-sm">Trip Start Date</label>
                  <input
                    type="date"
                    value={tripStartDate}
                    onChange={(e) => setTripStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div className="w-full sm:w-auto">
                  <label className="block text-white/80 mb-1 text-sm">Trip End Date</label>
                  <input
                    type="date"
                    value={tripEndDate}
                    onChange={(e) => setTripEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Daily Planner */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Daily Planner</h2>
            <button className="btn-primary">
              Save Itinerary
            </button>
          </div>
          
          <div className="space-y-4">
            {days.map((day) => (
              <div 
                key={day.date} 
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Day Header */}
                <div 
                  className="p-5 border-b border-neutral-200 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleDay(day.date)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                      {new Date(day.date).getDate()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{formatDate(day.date)}</h3>
                      <span className="text-sm text-neutral-500">
                        {day.activities.length} activities planned
                      </span>
                    </div>
                  </div>
                  
                  <button className="p-2 text-neutral-400">
                    {expandedDay === day.date ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                {/* Day Content */}
                {expandedDay === day.date && (
                  <div className="p-5">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Activities</h4>
                        <button 
                          onClick={() => addActivity(day.date)}
                          className="text-sm flex items-center gap-1 text-primary-500 hover:text-primary-600"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Activity</span>
                        </button>
                      </div>
                      
                      {day.activities.length === 0 ? (
                        <p className="text-neutral-500 text-sm">
                          No activities planned for this day. Click "Add Activity" to get started.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {day.activities.map((activity) => (
                            <div 
                              key={activity.id}
                              className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg"
                            >
                              <input
                                type="time"
                                value={activity.time}
                                onChange={(e) => updateActivity(day.date, activity.id, 'time', e.target.value)}
                                className="px-2 py-1 border border-neutral-300 rounded"
                              />
                              
                              <input
                                type="text"
                                value={activity.name}
                                onChange={(e) => updateActivity(day.date, activity.id, 'name', e.target.value)}
                                className="flex-1 px-3 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                              />
                              
                              <button 
                                onClick={() => removeActivity(day.date, activity.id)}
                                className="p-1.5 text-neutral-400 hover:text-error-500"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Notes</h4>
                        
                        {editingNotes === day.date ? (
                          <button
                            onClick={() => saveNotes(day.date)}
                            className="text-sm flex items-center gap-1 text-success-500 hover:text-success-600"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditingNotes(day.date, day.notes)}
                            className="text-sm flex items-center gap-1 text-primary-500 hover:text-primary-600"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                      
                      {editingNotes === day.date ? (
                        <textarea
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          className="w-full h-32 p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
                          placeholder="Add notes for this day..."
                        />
                      ) : (
                        <div className="p-3 bg-neutral-50 rounded-lg min-h-[80px]">
                          {day.notes ? (
                            <p>{day.notes}</p>
                          ) : (
                            <p className="text-neutral-500 text-sm italic">No notes added yet</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;