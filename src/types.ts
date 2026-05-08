export type NeedCategory = 'food' | 'medicine' | 'clothes' | 'education' | 'emergency' | 'volunteer';

export interface Need {
  id: string;
  title: string;
  description: string;
  category: NeedCategory;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  requesterId: string;
  requesterName: string;
  status: 'active' | 'fulfilled' | 'cancelled';
  createdAt: any;
  updatedAt: any;
  urgency: 'low' | 'medium' | 'high';
}

export interface AppUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  points: number;
  bio?: string;
}
