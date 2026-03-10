export type LeadStatus = 'pending' | 'confirmed' | 'cancelled';
export type Lead = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  guests?: number;
  date?: string;
  time?: string;
  message?: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
};

export const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'local-admin-token';

const globalStore = globalThis as typeof globalThis & { __br02_leads?: Lead[] };
export const leads: Lead[] = globalStore.__br02_leads || (globalStore.__br02_leads = []);
