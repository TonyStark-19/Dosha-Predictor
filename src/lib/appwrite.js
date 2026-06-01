import { Client, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

export const databases = new Databases(client);

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '';
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID || '';

export async function saveAssessment({ answers, primaryDosha, confidence, secondaryDosha }) {
  if (!DB_ID || !COLLECTION_ID) return null;
  try {
    return await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
      assessmentId: ID.unique(),
      timestamp: new Date().toISOString(),
      predictedDosha: primaryDosha,
      confidence,
      secondaryDosha,
      answers: JSON.stringify(answers),
    });
  } catch (e) {
    console.warn('Appwrite save failed:', e);
    return null;
  }
}

export async function getAnalytics() {
  if (!DB_ID || !COLLECTION_ID) return mockAnalytics();
  try {
    const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [Query.limit(500)]);
    return processAnalytics(res.documents);
  } catch (e) {
    console.warn('Appwrite fetch failed:', e);
    return mockAnalytics();
  }
}

function processAnalytics(docs) {
  const total = docs.length;
  const distribution = { Vata: 0, Pitta: 0, Kapha: 0 };
  let totalConf = 0;

  docs.forEach(d => {
    if (distribution[d.predictedDosha] !== undefined) distribution[d.predictedDosha]++;
    totalConf += d.confidence || 0;
  });

  const avgConfidence = total > 0 ? totalConf / total : 0;

  const trends = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString('en', { weekday: 'short' });
    const dayDocs = docs.filter(doc => doc.timestamp?.startsWith(d.toISOString().split('T')[0]));
    return { day: label, count: dayDocs.length };
  });

  return { total, distribution, avgConfidence, trends };
}

function mockAnalytics() {
  return {
    total: 247,
    distribution: { Vata: 89, Pitta: 94, Kapha: 64 },
    avgConfidence: 0.84,
    trends: [
      { day: 'Mon', count: 28 }, { day: 'Tue', count: 35 }, { day: 'Wed', count: 42 },
      { day: 'Thu', count: 31 }, { day: 'Fri', count: 38 }, { day: 'Sat', count: 45 }, { day: 'Sun', count: 28 },
    ],
  };
}
