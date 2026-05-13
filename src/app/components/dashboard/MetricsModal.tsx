import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  department: string;
  clockIn: string;
  status: string;
  avatar: string;
}

interface ModalData {
  title: string;
  employees: Employee[];
}

interface MetricsModalProps {
  show: boolean;
  onClose: () => void;
  modalData: ModalData;
}

export const MetricsModal: React.FC<MetricsModalProps> = ({ show, onClose, modalData }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl"
        // style={{ willChange: 'transform, opacity' }}
      >
        {/* Modal Header */}
        <div className="relative border-b border-white/10 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{modalData.title}</h2>
                <p className="mt-1 text-sm text-gray-300">
                  {modalData.employees.length} employee
                  {modalData.employees.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="custom-scrollbar max-h-[calc(80vh-140px)] overflow-y-auto p-8">
          {modalData.employees.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                <Users className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-lg text-gray-300">No employees found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {modalData.employees.map((employee) => (
                <motion.div
                  key={employee.id}
                  className="relative rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 bg-gradient-to-r from-orange-500/10 via-red-400/10 to-pink-200/10 text-sm font-medium text-white backdrop-blur-xl">
                      <span className="text-lg font-semibold text-white">{employee.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-medium text-white">{employee.name}</h3>
                      <p className="text-sm text-gray-300">{employee.department}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span className="text-sm text-gray-300">Clock In: {employee.clockIn}</span>
                      </div>
                    </div>
                    <div
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl ${
                        employee.status === 'Late'
                          ? 'border-amber-500/30 bg-amber-500/20 text-amber-300'
                          : employee.status === 'On Leave'
                            ? 'border-blue-500/30 bg-blue-500/20 text-blue-300'
                            : employee.status === 'Early Departure'
                              ? 'border-purple-500/30 bg-purple-500/20 text-purple-300'
                              : 'border-green-500/30 bg-green-500/20 text-green-300'
                      }`}
                    >
                      {employee.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
