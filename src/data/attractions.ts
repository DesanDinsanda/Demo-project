import { Attraction, Hub, OptionalActivity, ScoreKey } from '../types/tourism';

const s = (partial: Partial<Record<ScoreKey, number>>): Record<ScoreKey, number> => ({
  nature: 1,
  wildlife: 1,
  culture: 1,
  adventure: 1,
  beach: 1,
  history: 1,
  food: 1,
  shopping: 1,
  religious: 1,
  ...partial
});

export const HUBS: Hub[] = [
  {
    id: 'hub-cmb',
    name: 'Bandaranaike Intl. Airport (CMB)',
    city: 'Katunayake',
    lat: 7.1808,
    lng: 79.8841
  },
  { id: 'hub-colombo', name: 'Colombo Fort', city: 'Colombo', lat: 6.9344, lng: 79.8428 },
  { id: 'hub-kandy', name: 'Kandy Railway Station', city: 'Kandy', lat: 7.2913, lng: 80.6337 },
  { id: 'hub-galle', name: 'Galle Railway Station', city: 'Galle', lat: 6.0326, lng: 80.2168 },
  {
    id: 'hub-mattala',
    name: 'Mattala Rajapaksa Airport (HRI)',
    city: 'Hambantota',
    lat: 6.2841,
    lng: 81.1241
  }];


export const ATTRACTIONS: Attraction[] = [
  {
    id: 'yala',
    name: 'Yala National Park',
    city: 'Yala',
    province: 'Southern',
    lat: 6.3728,
    lng: 81.5016,
    scores: s({ nature: 5, wildlife: 5, culture: 2, adventure: 4, beach: 2 }),
    activityCost: 15000,
    visitDuration: 6,
    popularity: 92,
    recommendedSeason: 'Feb – Jul',
    description:
      'Sri Lanka’s flagship safari park with the highest leopard density in the world, plus elephants, sloth bears and lagoon birdlife.'
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya Rock Fortress',
    city: 'Sigiriya',
    province: 'Central',
    lat: 7.9572,
    lng: 80.7603,
    scores: s({ nature: 4, wildlife: 2, culture: 5, adventure: 4, history: 5 }),
    activityCost: 5000,
    visitDuration: 4,
    popularity: 96,
    recommendedSeason: 'Year round',
    description:
      'A 5th-century royal citadel on a 200 m granite monolith, with frescoes, mirror wall and panoramic summit gardens.'
  },
  {
    id: 'tooth',
    name: 'Temple of the Sacred Tooth Relic',
    city: 'Kandy',
    province: 'Central',
    lat: 7.2936,
    lng: 80.6413,
    scores: s({ nature: 2, culture: 5, adventure: 1, history: 5, religious: 5 }),
    activityCost: 3000,
    visitDuration: 2,
    popularity: 94,
    recommendedSeason: 'Year round',
    description:
      'The most venerated Buddhist shrine in the country, with three daily thevava ceremonies beside Kandy Lake.'
  },
  {
    id: 'unawatuna',
    name: 'Unawatuna Beach',
    city: 'Galle',
    province: 'Southern',
    lat: 5.9784,
    lng: 80.2494,
    scores: s({ nature: 5, wildlife: 2, culture: 2, adventure: 3, beach: 5, food: 4 }),
    activityCost: 2000,
    visitDuration: 4,
    popularity: 88,
    recommendedSeason: 'Nov – Apr',
    description:
      'A sheltered crescent bay with calm swimming water, reef snorkelling and a walkable strip of seafood cafés.'
  },
  {
    id: 'galleface',
    name: 'One Galle Face',
    city: 'Colombo',
    province: 'Western',
    lat: 6.9268,
    lng: 79.8436,
    scores: s({ nature: 1, culture: 3, adventure: 1, beach: 2, food: 5, shopping: 5 }),
    activityCost: 5000,
    visitDuration: 3,
    popularity: 75,
    recommendedSeason: 'Year round',
    description:
      'Colombo’s largest mall and food hall next to the oceanfront Galle Face Green promenade.'
  },
  {
    id: 'ella',
    name: 'Ella – Nine Arch & Little Adam’s Peak',
    city: 'Ella',
    province: 'Uva',
    lat: 6.8749,
    lng: 81.0463,
    scores: s({ nature: 5, wildlife: 3, culture: 3, adventure: 5, food: 3 }),
    activityCost: 4000,
    visitDuration: 6,
    popularity: 90,
    recommendedSeason: 'Jan – Mar',
    description:
      'Hill-country valley town with the Nine Arch viaduct, short summit hikes and tea-slope viewpoints.'
  },
  {
    id: 'gangaramaya',
    name: 'Gangaramaya Temple',
    city: 'Colombo',
    province: 'Western',
    lat: 6.9169,
    lng: 79.8564,
    scores: s({ nature: 1, culture: 5, adventure: 1, history: 4, religious: 5 }),
    activityCost: 2000,
    visitDuration: 2,
    popularity: 78,
    recommendedSeason: 'Year round',
    description:
      'A working urban temple complex on Beira Lake with a museum of relics, ivory and vintage vehicles.'
  },
  {
    id: 'wilpattu',
    name: 'Wilpattu National Park',
    city: 'Wilpattu',
    province: 'North Western',
    lat: 8.4461,
    lng: 80.0505,
    scores: s({ nature: 5, wildlife: 5, culture: 2, adventure: 4, beach: 2 }),
    activityCost: 12000,
    visitDuration: 6,
    popularity: 74,
    recommendedSeason: 'Feb – Oct',
    description:
      'The largest and quietest national park, a mosaic of natural “villu” lakes with leopard and sloth bear sightings.'
  },
  {
    id: 'museum',
    name: 'National Museum of Colombo',
    city: 'Colombo',
    province: 'Western',
    lat: 6.9107,
    lng: 79.8612,
    scores: s({ nature: 1, culture: 5, adventure: 1, history: 5 }),
    activityCost: 2000,
    visitDuration: 3,
    popularity: 70,
    recommendedSeason: 'Year round',
    description:
      'The island’s principal collection: the Kandyan throne, Anuradhapura bronzes and colonial-era archives.'
  },
  {
    id: 'matara',
    name: 'Matara Beach & Parey Dewa',
    city: 'Matara',
    province: 'Southern',
    lat: 5.9485,
    lng: 80.5353,
    scores: s({ nature: 4, wildlife: 1, culture: 2, adventure: 3, beach: 5, history: 3 }),
    activityCost: 2000,
    visitDuration: 4,
    popularity: 66,
    recommendedSeason: 'Nov – Apr',
    description:
      'A wide town beach with the island temple of Parey Dewa and the Dutch star fort a short walk away.'
  },
  {
    id: 'dambulla',
    name: 'Dambulla Royal Cave Temple',
    city: 'Dambulla',
    province: 'Central',
    lat: 7.8567,
    lng: 80.6492,
    scores: s({ nature: 3, culture: 5, adventure: 2, history: 5, religious: 5 }),
    activityCost: 3500,
    visitDuration: 3,
    popularity: 85,
    recommendedSeason: 'Year round',
    description:
      'Five painted cave shrines carved into a rock overhang, holding 153 Buddha statues from 22 centuries.'
  },
  {
    id: 'horton',
    name: 'Horton Plains & World’s End',
    city: 'Nuwara Eliya',
    province: 'Central',
    lat: 6.8096,
    lng: 80.8004,
    scores: s({ nature: 5, wildlife: 4, culture: 1, adventure: 5 }),
    activityCost: 8000,
    visitDuration: 5,
    popularity: 82,
    recommendedSeason: 'Jan – Mar',
    description:
      'A high montane plateau with a 9 km loop trail to an 880 m escarpment and Baker’s Falls.'
  },
  {
    id: 'gallefort',
    name: 'Galle Dutch Fort',
    city: 'Galle',
    province: 'Southern',
    lat: 6.0262,
    lng: 80.2169,
    scores: s({ nature: 2, culture: 5, adventure: 2, beach: 3, history: 5, food: 4, shopping: 4 }),
    activityCost: 1500,
    visitDuration: 3,
    popularity: 91,
    recommendedSeason: 'Nov – Apr',
    description:
      'A UNESCO-listed rampart town of Dutch-colonial streets, boutique workshops and sunset bastion walks.'
  },
  {
    id: 'mirissa',
    name: 'Mirissa Whale Watching',
    city: 'Mirissa',
    province: 'Southern',
    lat: 5.9449,
    lng: 80.4594,
    scores: s({ nature: 4, wildlife: 5, culture: 1, adventure: 4, beach: 5, food: 3 }),
    activityCost: 9000,
    visitDuration: 5,
    popularity: 84,
    recommendedSeason: 'Nov – Apr',
    description:
      'Deep-water boat trips for blue whales and spinner dolphins, launching before dawn from a fishing harbour.'
  },
  {
    id: 'udawalawe',
    name: 'Udawalawe National Park',
    city: 'Udawalawe',
    province: 'Sabaragamuwa',
    lat: 6.4753,
    lng: 80.8889,
    scores: s({ nature: 5, wildlife: 5, culture: 1, adventure: 3 }),
    activityCost: 11000,
    visitDuration: 5,
    popularity: 80,
    recommendedSeason: 'Year round',
    description:
      'Open reservoir grassland with near-guaranteed wild elephant herds and an adjoining elephant transit home.'
  },
  {
    id: 'anuradhapura',
    name: 'Anuradhapura Sacred City',
    city: 'Anuradhapura',
    province: 'North Central',
    lat: 8.3114,
    lng: 80.4037,
    scores: s({ nature: 3, wildlife: 2, culture: 5, adventure: 2, history: 5, religious: 5 }),
    activityCost: 6000,
    visitDuration: 5,
    popularity: 83,
    recommendedSeason: 'Year round',
    description:
      'A 1,300-year royal capital of dagobas, monastic ruins and the oldest recorded planted tree on earth.'
  },
  {
    id: 'nuwaraeliya',
    name: 'Nuwara Eliya Tea Country',
    city: 'Nuwara Eliya',
    province: 'Central',
    lat: 6.9497,
    lng: 80.7891,
    scores: s({ nature: 5, wildlife: 2, culture: 3, adventure: 3, food: 4, history: 3 }),
    activityCost: 4500,
    visitDuration: 4,
    popularity: 86,
    recommendedSeason: 'Mar – May',
    description:
      'Colonial hill station at 1,900 m with working tea factories, Gregory Lake and cool-climate gardens.'
  },
  {
    id: 'adamspeak',
    name: 'Adam’s Peak (Sri Pada)',
    city: 'Nallathanniya',
    province: 'Sabaragamuwa',
    lat: 6.8096,
    lng: 80.4994,
    scores: s({ nature: 5, wildlife: 2, culture: 4, adventure: 5, religious: 5, history: 4 }),
    activityCost: 2500,
    visitDuration: 8,
    popularity: 79,
    recommendedSeason: 'Dec – May',
    description:
      'An overnight pilgrimage climb of 5,500 steps to a summit shrine, timed for the shadow-of-the-peak sunrise.'
  },
  {
    id: 'pinnawala',
    name: 'Pinnawala Elephant Orphanage',
    city: 'Kegalle',
    province: 'Sabaragamuwa',
    lat: 7.3009,
    lng: 80.3885,
    scores: s({ nature: 3, wildlife: 5, culture: 2, adventure: 1 }),
    activityCost: 3000,
    visitDuration: 3,
    popularity: 81,
    recommendedSeason: 'Year round',
    description:
      'A state-run herd of rescued elephants, with bottle-feeding sessions and a river bathing schedule.'
  },
  {
    id: 'nilaveli',
    name: 'Nilaveli Beach & Pigeon Island',
    city: 'Trincomalee',
    province: 'Eastern',
    lat: 8.7005,
    lng: 81.1902,
    scores: s({ nature: 5, wildlife: 3, culture: 2, adventure: 3, beach: 5 }),
    activityCost: 3000,
    visitDuration: 4,
    popularity: 72,
    recommendedSeason: 'May – Sep',
    description:
      'Wide east-coast sand with a short boat hop to the coral reef and reef sharks of Pigeon Island.'
  },
  {
    id: 'polonnaruwa',
    name: 'Polonnaruwa Ancient City',
    city: 'Polonnaruwa',
    province: 'North Central',
    lat: 7.9403,
    lng: 81.0188,
    scores: s({ nature: 3, wildlife: 3, culture: 5, adventure: 3, history: 5, religious: 4 }),
    activityCost: 5500,
    visitDuration: 4,
    popularity: 80,
    recommendedSeason: 'Year round',
    description:
      'A compact, cyclable medieval capital with the Gal Vihara rock sculptures and a 12th-century irrigation sea.'
  },
  {
    id: 'minneriya',
    name: 'Minneriya Elephant Gathering',
    city: 'Habarana',
    province: 'North Central',
    lat: 8.0333,
    lng: 80.8833,
    scores: s({ nature: 5, wildlife: 5, culture: 1, adventure: 3 }),
    activityCost: 9500,
    visitDuration: 4,
    popularity: 87,
    recommendedSeason: 'Jun – Sep',
    description:
      'Seasonal congregation of up to 300 elephants on the receding reservoir bed — the largest in Asia.'
  }];


export const OPTIONAL_ACTIVITIES: OptionalActivity[] = [
  {
    id: 'opt-tea',
    name: 'Private tea-estate tasting',
    city: 'Nuwara Eliya',
    cost: 4500,
    value: 7,
    durationHours: 2,
    linkedInterest: 'nature'
  },
  {
    id: 'opt-cooking',
    name: 'Sri Lankan curry cooking class',
    city: 'Colombo',
    cost: 6000,
    value: 8,
    durationHours: 3,
    linkedInterest: 'food'
  },
  {
    id: 'opt-safari-extra',
    name: 'Second dawn safari block',
    city: 'Yala',
    cost: 9000,
    value: 9,
    durationHours: 4,
    linkedInterest: 'wildlife'
  },
  {
    id: 'opt-train',
    name: 'Observation-car hill train seat',
    city: 'Ella',
    cost: 3500,
    value: 8,
    durationHours: 4,
    linkedInterest: 'nature'
  },
  {
    id: 'opt-dive',
    name: 'Guided reef snorkel trip',
    city: 'Galle',
    cost: 5500,
    value: 6,
    durationHours: 3,
    linkedInterest: 'beach'
  },
  {
    id: 'opt-dance',
    name: 'Kandyan dance performance',
    city: 'Kandy',
    cost: 2500,
    value: 6,
    durationHours: 2,
    linkedInterest: 'culture'
  },
  {
    id: 'opt-balloon',
    name: 'Sunrise balloon over Sigiriya',
    city: 'Sigiriya',
    cost: 22000,
    value: 10,
    durationHours: 3,
    linkedInterest: 'adventure'
  },
  {
    id: 'opt-market',
    name: 'Pettah market & craft walk',
    city: 'Colombo',
    cost: 2000,
    value: 5,
    durationHours: 2,
    linkedInterest: 'shopping'
  },
  {
    id: 'opt-heritage',
    name: 'Archaeologist-led ruins tour',
    city: 'Anuradhapura',
    cost: 7000,
    value: 7,
    durationHours: 3,
    linkedInterest: 'history'
  }];


export const ATTRACTION_MAP: Record<string, Attraction> = ATTRACTIONS.reduce(
  (acc, a) => ({ ...acc, [a.id]: a }),
  {}
);

export const HUB_MAP: Record<string, Hub> = HUBS.reduce((acc, h) => ({ ...acc, [h.id]: h }), {});

export interface GeoPoint {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  isHub: boolean;
}

export function getPoint(id: string): GeoPoint {
  const a = ATTRACTION_MAP[id];
  if (a) {
    return { id: a.id, name: a.name, city: a.city, lat: a.lat, lng: a.lng, isHub: false };
  }
  const h = HUB_MAP[id];
  if (h) {
    return { id: h.id, name: h.name, city: h.city, lat: h.lat, lng: h.lng, isHub: true };
  }
  return { id, name: id, city: '—', lat: 7, lng: 80.7, isHub: true };
}

export function pointName(id: string): string {
  return getPoint(id).name;
}