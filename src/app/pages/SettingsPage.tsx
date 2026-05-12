import { useState } from 'react';
import { ChevronLeft, Bell, Clock, Users, Shield, Database, Palette, Globe } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    lateArrivals: true,
    absences: true,
    shiftReminders: false,
    weeklyReports: true,
  });

  const [workSchedule, setWorkSchedule] = useState({
    startTime: '08:00',
    endTime: '17:00',
    lateThreshold: 15,
    breakDuration: 60,
  });

  const [system, setSystem] = useState({
    autoBackup: true,
    dataRetention: 90,
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
  });

  return (
    <div className="mx-auto max-w-[1800px] p-6">
      <div className="space-y-6">
        <NavBar />
        {/* Header */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => console.log('Back Navigate')}
              className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3">
              <Shield className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h1 className="mb-1 text-white">Settings</h1>
              <p className="text-sm text-gray-400">Configure system preferences and options</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Notifications */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
                <Bell className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div>
                  <div className="text-sm font-medium text-white">Late Arrivals</div>
                  <div className="mt-1 text-xs text-gray-400">Get notified when employees arrive late</div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, lateArrivals: !notifications.lateArrivals })}
                  className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                    notifications.lateArrivals ? 'bg-orange-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                      notifications.lateArrivals ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div>
                  <div className="text-sm font-medium text-white">Absences</div>
                  <div className="mt-1 text-xs text-gray-400">Alerts for unexcused absences</div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, absences: !notifications.absences })}
                  className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                    notifications.absences ? 'bg-orange-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                      notifications.absences ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div>
                  <div className="text-sm font-medium text-white">Shift Reminders</div>
                  <div className="mt-1 text-xs text-gray-400">Send reminders before scheduled shifts</div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, shiftReminders: !notifications.shiftReminders })}
                  className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                    notifications.shiftReminders ? 'bg-orange-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                      notifications.shiftReminders ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div>
                  <div className="text-sm font-medium text-white">Weekly Reports</div>
                  <div className="mt-1 text-xs text-gray-400">Receive weekly attendance summaries</div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, weeklyReports: !notifications.weeklyReports })}
                  className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                    notifications.weeklyReports ? 'bg-orange-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                      notifications.weeklyReports ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* Work Schedule */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-white">Work Schedule</h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <label className="mb-2 block text-sm font-medium text-white">Start Time</label>
                <input
                  type="time"
                  value={workSchedule.startTime}
                  onChange={(e) => setWorkSchedule({ ...workSchedule, startTime: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all focus:border-orange-500/50 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <label className="mb-2 block text-sm font-medium text-white">End Time</label>
                <input
                  type="time"
                  value={workSchedule.endTime}
                  onChange={(e) => setWorkSchedule({ ...workSchedule, endTime: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all focus:border-orange-500/50 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <label className="mb-2 block text-sm font-medium text-white">Late Threshold (minutes)</label>
                <input
                  type="number"
                  value={workSchedule.lateThreshold}
                  onChange={(e) => setWorkSchedule({ ...workSchedule, lateThreshold: parseInt(e.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all focus:border-orange-500/50 focus:outline-none"
                />
                <p className="mt-2 text-xs text-gray-400">Clock-ins after this time are marked as late</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <label className="mb-2 block text-sm font-medium text-white">Break Duration (minutes)</label>
                <input
                  type="number"
                  value={workSchedule.breakDuration}
                  onChange={(e) => setWorkSchedule({ ...workSchedule, breakDuration: parseInt(e.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all focus:border-orange-500/50 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Department Management */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
                <Users className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-white">Departments</h2>
            </div>

            <div className="space-y-3">
              {['Processing', 'Cold Storage', 'Dispatch', 'Slaughter'].map((dept, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <div className="text-sm font-medium text-white">{dept}</div>
                  <button className="rounded-lg border border-orange-500/30 bg-orange-500/20 px-4 py-1.5 text-xs text-orange-400 transition-all duration-300 hover:bg-orange-500/30">
                    Edit
                  </button>
                </div>
              ))}
              <button className="w-full rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-gray-400 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:text-white">
                + Add Department
              </button>
            </div>
          </div>

          {/* System Settings */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
                <Database className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-white">System</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div>
                  <div className="text-sm font-medium text-white">Auto Backup</div>
                  <div className="mt-1 text-xs text-gray-400">Automatically backup data daily</div>
                </div>
                <button
                  onClick={() => setSystem({ ...system, autoBackup: !system.autoBackup })}
                  className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                    system.autoBackup ? 'bg-orange-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                      system.autoBackup ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <label className="mb-2 block text-sm font-medium text-white">Data Retention (days)</label>
                <input
                  type="number"
                  value={system.dataRetention}
                  onChange={(e) => setSystem({ ...system, dataRetention: parseInt(e.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all focus:border-orange-500/50 focus:outline-none"
                />
                <p className="mt-2 text-xs text-gray-400">How long to keep historical records</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <label className="mb-2 block text-sm font-medium text-white">Timezone</label>
                <select
                  value={system.timezone}
                  onChange={(e) => setSystem({ ...system, timezone: e.target.value })}
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all focus:border-orange-500/50 focus:outline-none"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <label className="mb-2 block text-sm font-medium text-white">Date Format</label>
                <select
                  value={system.dateFormat}
                  onChange={(e) => setSystem({ ...system, dateFormat: e.target.value })}
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all focus:border-orange-500/50 focus:outline-none"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 px-8 py-3 text-white transition-all duration-300 hover:from-orange-500/30 hover:to-red-500/30">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
