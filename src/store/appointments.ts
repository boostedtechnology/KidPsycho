import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Professional {
  id: number;
  name: string;
  specialty: string;
  image: string;
  timezone: string;
  unavailability?: Record<string, string[]>;
}

export interface Appointment {
  id: number;
  professional: Professional;
  type: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  status: string;
}

interface AppointmentState {
  appointments: Record<number, Appointment[]>;
  updateAppointment: (childId: number, appointment: Appointment) => void;
  addAppointment: (childId: number, appointment: Appointment) => void;
  cancelAppointment: (childId: number, appointmentId: number) => void;
  getAppointments: (childId: number) => Appointment[];
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: {},
      updateAppointment: (childId, appointment) => {
        set((state) => {
          const childAppointments = state.appointments[childId] || [];
          const updatedAppointments = childAppointments.map((apt) =>
            apt.id === appointment.id ? appointment : apt
          );
          return {
            appointments: {
              ...state.appointments,
              [childId]: updatedAppointments,
            },
          };
        });
      },
      addAppointment: (childId, appointment) => {
        set((state) => {
          const childAppointments = state.appointments[childId] || [];
          return {
            appointments: {
              ...state.appointments,
              [childId]: [...childAppointments, appointment],
            },
          };
        });
      },
      cancelAppointment: (childId, appointmentId) => {
        set((state) => {
          const childAppointments = state.appointments[childId] || [];
          return {
            appointments: {
              ...state.appointments,
              [childId]: childAppointments.filter((apt) => apt.id !== appointmentId),
            },
          };
        });
      },
      getAppointments: (childId) => {
        return get().appointments[childId] || [];
      },
    }),
    {
      name: 'appointments-storage',
    }
  )
);