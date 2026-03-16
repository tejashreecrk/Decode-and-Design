import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Smile, Meh, Frown, TrendingUp } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  note?: string;
}

const moodEmojis = {
  great: { emoji: '😄', color: 'bg-green-500', label: 'Great' },
  good: { emoji: '🙂', color: 'bg-blue-500', label: 'Good' },
  okay: { emoji: '😐', color: 'bg-yellow-500', label: 'Okay' },
  bad: { emoji: '😟', color: 'bg-orange-500', label: 'Bad' },
  terrible: { emoji: '😢', color: 'bg-red-500', label: 'Terrible' },
};

export function MoodCalendar() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedMood, setSelectedMood] = useState<keyof typeof moodEmojis | null>(null);
  const [note, setNote] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('moodCalendar');
    if (saved) {
      setMoodEntries(JSON.parse(saved));
    }
  }, []);

  const saveMood = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      date: selectedDate,
      mood: selectedMood,
      note: note.trim(),
    };

    const updated = [
      ...moodEntries.filter((e) => e.date !== selectedDate),
      newEntry,
    ];

    setMoodEntries(updated);
    localStorage.setItem('moodCalendar', JSON.stringify(updated));
    setNote('');
  };

  const getMoodForDate = (date: string) => {
    return moodEntries.find((e) => e.date === date);
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (string | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push(dateStr);
    }

    return days;
  };

  const getMoodStats = () => {
    const last30Days = moodEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return entryDate >= thirtyDaysAgo;
    });

    const moodCounts = last30Days.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return moodCounts;
  };

  const stats = getMoodStats();
  const totalEntries = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen pt-16 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <CalendarIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Mood Calendar
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Track your emotional journey day by day
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/70 border border-purple-500/40 rounded-xl p-6 backdrop-blur-sm"
            >
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                    )
                  }
                  className="px-4 py-2 bg-purple-600/30 border border-purple-400/50 rounded-lg text-purple-200 hover:bg-purple-600/50 transition-all"
                >
                  ←
                </button>
                <h2 className="text-2xl text-purple-200">
                  {currentMonth.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </h2>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                    )
                  }
                  className="px-4 py-2 bg-purple-600/30 border border-purple-400/50 rounded-lg text-purple-200 hover:bg-purple-600/50 transition-all"
                >
                  →
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth().map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} />;
                  }

                  const mood = getMoodForDate(date);
                  const isSelected = date === selectedDate;
                  const isToday = date === new Date().toISOString().split('T')[0];

                  return (
                    <motion.button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        const existing = getMoodForDate(date);
                        if (existing) {
                          setSelectedMood(existing.mood);
                          setNote(existing.note || '');
                        } else {
                          setSelectedMood(null);
                          setNote('');
                        }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`aspect-square rounded-lg p-2 transition-all ${
                        isSelected
                          ? 'bg-purple-600 border-2 border-purple-400'
                          : isToday
                          ? 'bg-purple-600/30 border-2 border-purple-500'
                          : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="text-xs text-gray-300">
                        {new Date(date).getDate()}
                      </div>
                      {mood && (
                        <div className="text-lg mt-1">{moodEmojis[mood.mood].emoji}</div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-slate-900/70 border border-purple-500/40 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg text-purple-200">Last 30 Days</h3>
              </div>
              {totalEntries > 0 ? (
                <div className="space-y-3">
                  {Object.entries(stats).map(([mood, count]) => {
                    const moodData = moodEmojis[mood as keyof typeof moodEmojis];
                    const percentage = (count / totalEntries) * 100;
                    return (
                      <div key={mood}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{moodData.emoji}</span>
                            <span className="text-sm text-gray-300">{moodData.label}</span>
                          </div>
                          <span className="text-sm text-gray-400">
                            {count} ({Math.round(percentage)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${moodData.color}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  No mood entries yet. Start tracking to see your patterns!
                </p>
              )}
            </motion.div>
          </div>

          {/* Mood Input */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/70 border border-purple-500/40 rounded-xl p-6 backdrop-blur-sm sticky top-20"
            >
              <h3 className="text-xl text-purple-200 mb-4">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h3>

              <p className="text-sm text-gray-400 mb-4">How are you feeling?</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {Object.entries(moodEmojis).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMood(key as keyof typeof moodEmojis)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedMood === key
                        ? 'border-purple-400 bg-purple-600/30 scale-105'
                        : 'border-slate-700 bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{value.emoji}</div>
                    <div className="text-xs text-gray-400">{value.label}</div>
                  </button>
                ))}
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note about your day... (optional)"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors mb-4 min-h-[100px]"
              />

              <button
                onClick={saveMood}
                disabled={!selectedMood}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Mood
              </button>

              {getMoodForDate(selectedDate) && (
                <p className="text-xs text-green-400 mt-2 text-center">
                  ✓ Mood saved for this day
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
