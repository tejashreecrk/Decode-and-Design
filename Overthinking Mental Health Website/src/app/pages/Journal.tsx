import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { BookOpen, Trash2, Save, Plus } from "lucide-react";
import { useAudio } from "../hooks/useAudio";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
}

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [currentMood, setCurrentMood] = useState("neutral");
  const [showSaved, setShowSaved] = useState(false);
  const { playSuccess, playClick } = useAudio();

  useEffect(() => {
    // Load entries from localStorage
    const saved = localStorage.getItem("journalEntries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      content: currentEntry,
      mood: currentMood,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    
    setCurrentEntry("");
    setCurrentMood("neutral");
    setShowSaved(true);
    playSuccess();
    
    setTimeout(() => setShowSaved(false), 3000);
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    playClick();
  };

  const moods = [
    { value: "great", emoji: "😊", label: "Great", color: "green" },
    { value: "good", emoji: "🙂", label: "Good", color: "blue" },
    { value: "neutral", emoji: "😐", label: "Neutral", color: "gray" },
    { value: "anxious", emoji: "😰", label: "Anxious", color: "yellow" },
    { value: "overwhelmed", emoji: "😫", label: "Overwhelmed", color: "red" },
  ];

  const prompts = [
    "What thoughts are keeping you awake tonight?",
    "What would you tell a friend experiencing these same worries?",
    "What are three things within your control right now?",
    "What patterns do you notice in your overthinking?",
    "What does your anxiety want you to know?",
  ];

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-slate-950 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Your Personal Journal
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Write down your thoughts to create distance from them. Journaling helps
              you process emotions and gain clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Writing Prompts */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-4 text-purple-300">Writing Prompts</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {prompts.map((prompt, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCurrentEntry(prompt + "\n\n")}
                className="text-left p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg hover:border-purple-400/50 transition-all duration-300 text-sm text-gray-400 hover:text-purple-300"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* New Entry Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-purple-300">New Entry</h2>
              <div className="text-sm text-gray-400">
                {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Mood Selector */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-3">
                How are you feeling?
              </label>
              <div className="flex flex-wrap gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setCurrentMood(mood.value)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      currentMood === mood.value
                        ? `border-${mood.color}-500 bg-${mood.color}-500/20 text-${mood.color}-300`
                        : "border-slate-600 bg-slate-800/50 text-gray-400 hover:border-purple-500/50"
                    }`}
                  >
                    <span className="mr-2">{mood.emoji}</span>
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Area */}
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Let your thoughts flow... No judgment, no editing, just write."
              className="w-full h-64 bg-slate-800/50 border border-purple-500/30 rounded-lg p-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-400 resize-none"
            />

            {/* Actions */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                {currentEntry.length} characters
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCurrentEntry("");
                    setCurrentMood("neutral");
                  }}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-all duration-300"
                >
                  Clear
                </button>
                <button
                  onClick={saveEntry}
                  disabled={!currentEntry.trim()}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Entry
                </button>
              </div>
            </div>

            {showSaved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 text-center"
              >
                ✓ Entry saved successfully
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Previous Entries */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-6 text-purple-300 flex items-center gap-2">
            <BookOpen size={24} />
            Previous Entries ({entries.length})
          </h2>

          {entries.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/30 border border-slate-700 rounded-xl">
              <Plus className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No entries yet. Start writing to see them here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm text-gray-500">{entry.date}</div>
                      <div className="text-sm text-purple-400 mt-1">
                        Mood: {moods.find((m) => m.value === entry.mood)?.emoji}{" "}
                        {moods.find((m) => m.value === entry.mood)?.label}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {entry.content}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-4 bg-slate-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-8 text-purple-300 text-center">
            Benefits of Journaling
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Process Emotions",
                description: "Writing helps you understand and release difficult feelings",
              },
              {
                title: "Identify Patterns",
                description: "See recurring thoughts and triggers more clearly",
              },
              {
                title: "Reduce Anxiety",
                description: "Transferring worries to paper lightens the mental load",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 text-center"
              >
                <h3 className="text-lg mb-2 text-purple-300">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
