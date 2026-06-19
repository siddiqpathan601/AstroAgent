import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { User, Calendar, Clock, MapPin, Trash2, Save, AlertCircle } from 'lucide-react';
import type { BirthDetails } from '../types/user';

export default function SettingsPage() {
  const { birthDetails, setBirthDetails, clearBirthDetails, streak } = useAppStore();
  const [editing, setEditing] = useState(!birthDetails);
  const [form, setForm] = useState<BirthDetails>(birthDetails || { name: '', date: '', time: '', place: '' });
  const [errors, setErrors] = useState<Partial<BirthDetails>>({});
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const errs: Partial<BirthDetails> = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.date) errs.date = 'Required';
    if (!form.place.trim()) errs.place = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setBirthDetails({ ...form });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-100">Settings</h1>
        <p className="text-sm font-body text-slate-500 mt-1">Manage your profile and birth details</p>
      </div>

      {/* Birth Details Card */}
      <motion.div variants={cardVariants} className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="label text-slate-600 mb-1">Birth Details</div>
            <h3 className="font-display text-lg font-semibold text-slate-100">Your Celestial Blueprint</h3>
          </div>
          {birthDetails && !editing && (
            <button onClick={() => setEditing(true)} className="text-xs font-body text-violet-400 hover:text-violet-300 transition-colors">
              Edit
            </button>
          )}
        </div>

        {!editing && birthDetails ? (
          <div className="space-y-3">
            {[
              { icon: User, label: 'Name', value: birthDetails.name },
              { icon: Calendar, label: 'Birth Date', value: birthDetails.date },
              { icon: Clock, label: 'Birth Time', value: birthDetails.time },
              { icon: MapPin, label: 'Birth Place', value: birthDetails.place },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-3 bg-cosmic-800/20 rounded-xl">
                <Icon size={14} className="text-violet-400 flex-shrink-0" />
                <div>
                  <div className="label text-slate-600">{label}</div>
                  <div className="text-sm font-body text-slate-200">{value}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {[
              { id: 'name', label: 'Name', type: 'text', icon: User, placeholder: 'Your name', value: form.name, onChange: (v: string) => setForm(p => ({...p, name: v})) },
              { id: 'date', label: 'Birth Date', type: 'date', icon: Calendar, placeholder: '', value: form.date, onChange: (v: string) => setForm(p => ({...p, date: v})) },
              { id: 'time', label: 'Birth Time', type: 'time', icon: Clock, placeholder: '', value: form.time, onChange: (v: string) => setForm(p => ({...p, time: v})) },
              { id: 'place', label: 'Birth Place', type: 'text', icon: MapPin, placeholder: 'e.g. Mumbai, India', value: form.place, onChange: (v: string) => setForm(p => ({...p, place: v})) },
            ].map(field => {
              const FieldIcon = field.icon;
              const error = errors[field.id as keyof BirthDetails];
              return (
                <div key={field.id}>
                  <label className="flex items-center gap-1.5 text-[11px] text-slate-500 font-body uppercase tracking-wider mb-1.5">
                    <FieldIcon size={11} className="text-violet-400" /> {field.label}
                  </label>
                  <input
                    id={`settings-${field.id}`}
                    type={field.type}
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    max={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                    className="w-full bg-cosmic-800/60 border border-violet-500/15 focus:border-violet-500/40 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all [color-scheme:dark] font-body input-glow"
                  />
                  {error && <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-body"><AlertCircle size={12} />{error}</p>}
                </div>
              );
            })}
            <div className="flex gap-2 pt-1">
              {birthDetails && (
                <button onClick={() => setEditing(false)} className="flex-1 py-2.5 rounded-xl text-sm font-body text-slate-500 hover:text-slate-300 border border-white/8 hover:border-white/16 transition-all">
                  Cancel
                </button>
              )}
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-body transition-all">
                <Save size={14} /> {saved ? '✓ Saved!' : 'Save Details'}
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div variants={cardVariants} className="glass-card p-5">
        <div className="label text-slate-600 mb-4">Your Journey</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-cosmic-800/20 rounded-xl text-center">
            <div className="font-display text-2xl font-semibold text-gold-400">{streak}</div>
            <div className="text-xs font-body text-slate-500 mt-0.5">Day Streak 🔥</div>
          </div>
          <div className="p-3 bg-cosmic-800/20 rounded-xl text-center">
            <div className="font-display text-2xl font-semibold text-violet-300">∞</div>
            <div className="text-xs font-body text-slate-500 mt-0.5">Charts Cast</div>
          </div>
        </div>
      </motion.div>

      {/* Danger zone */}
      {birthDetails && (
        <motion.div variants={cardVariants} className="glass-card p-5 border-rose-500/10">
          <div className="label text-rose-500/60 mb-3">Danger Zone</div>
          <button onClick={clearBirthDetails}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body text-rose-400 border border-rose-500/20 hover:bg-rose-500/8 transition-all">
            <Trash2 size={14} /> Clear Birth Details & Chart Data
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
