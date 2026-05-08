import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Need } from '../types';
import { NeedCard } from '../components/NeedCard';
import { Search, Filter, Map as MapIcon, List } from 'lucide-react';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export const Explore = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for now
  const needs: Need[] = [
    {
      id: '1',
      title: 'Winter clothes for children',
      description: 'We are looking for warm clothes and blankets for a group of 5 children in the local community center.',
      category: 'clothes',
      location: { lat: 31.5204, lng: 74.3587, address: 'Model Town, Lahore' },
      requesterId: 'user1',
      requesterName: 'Ammar J.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      urgency: 'high'
    },
    {
      id: '2',
      title: 'Emergency Medicine',
      description: 'Urgently need assistance getting insulin for an elderly patient.',
      category: 'medicine',
      location: { lat: 24.8607, lng: 67.0011, address: 'DHA, Karachi' },
      requesterId: 'user2',
      requesterName: 'Zainab R.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      urgency: 'high'
    },
    {
      id: '3',
      title: 'School Books',
      description: 'Secondary school books needed for 3 students in local orphan home.',
      category: 'education',
      location: { lat: 33.6844, lng: 73.0479, address: 'F-7, Islamabad' },
      requesterId: 'user3',
      requesterName: 'Kamran K.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      urgency: 'medium'
    }
  ];

  const filteredNeeds = needs.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MapSplash = () => (
    <div className="flex items-center justify-center h-[500px] bg-slate-50 border-2 border-dashed border-slate-200">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-black mb-4 uppercase">Maps API Interaction Required</h2>
        <p className="text-slate-500 mb-6 text-xs font-bold tracking-widest uppercase">To see needs on the map, provide a valid Google Maps Platform Key in settings.</p>
        <Button variant="outline" onClick={() => window.open('https://console.cloud.google.com/google/maps-apis/start', '_blank')}>
          Configure API Nodes
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-12 pt-32 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-4 border-slate-900 pb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2">Registry View</span>
          <h1 className="text-5xl font-black text-slate-900 uppercase">Explore Necessity</h1>
          <p className="text-slate-500 mt-2 font-medium">Connecting bridge nodes with verified community requirements.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-900 p-1 border-2 border-slate-900">
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-3 transition-all",
                viewMode === 'list' ? "bg-white text-slate-900 shadow-md" : "text-slate-500 hover:text-white"
              )}
            >
              <List size={18} strokeWidth={3} />
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={cn(
                "p-3 transition-all",
                viewMode === 'map' ? "bg-white text-slate-900 shadow-md" : "text-slate-500 hover:text-white"
              )}
            >
              <MapIcon size={18} strokeWidth={3} />
            </button>
          </div>
          <Button variant="outline">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="relative mb-12">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={3} />
        <input 
          type="text" 
          placeholder="SEARCH REGISTRY BY PARAMETERS..."
          className="w-full bg-white border-2 border-slate-200 py-5 pl-16 pr-6 outline-none focus:border-slate-900 transition-all font-mono text-sm uppercase tracking-widest"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredNeeds.map(need => (
            <NeedCard key={need.id} need={need} />
          ))}
          {filteredNeeds.length === 0 && (
            <div className="col-span-full py-32 text-center text-slate-400 font-black uppercase tracking-[0.2em]">
               No matching mission nodes found.
            </div>
          )}
        </div>
      ) : (
        <div className="h-[650px] w-full border-2 border-slate-900 shadow-2xl relative">
          {!hasValidKey ? (
            <MapSplash />
          ) : (
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={{ lat: 30.3753, lng: 69.3451 }}
                defaultZoom={5}
                mapId="DEMO_MAP_ID"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                className="w-full h-full"
              >
                {filteredNeeds.map(need => (
                  <AdvancedMarker 
                    key={need.id} 
                    position={need.location}
                    onClick={() => setSelectedNeed(need)}
                  >
                    <Pin 
                        background={need.urgency === 'high' ? '#ef4444' : '#5A5A40'} 
                        glyphColor="#fff" 
                        borderColor="#ffffff"
                    />
                  </AdvancedMarker>
                ))}

                {selectedNeed && (
                  <InfoWindow 
                    position={selectedNeed.location} 
                    onCloseClick={() => setSelectedNeed(null)}
                  >
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-stone-900">{selectedNeed.title}</h3>
                      <p className="text-xs text-stone-500 mt-1">{selectedNeed.location.address}</p>
                      <button 
                        className="mt-3 text-primary text-xs font-bold uppercase tracking-wider hover:underline"
                        onClick={() => setSelectedNeed(null)}
                      >
                         View Details
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          )}
        </div>
      )}
    </div>
  );
};
