# Dosha Prediction AI 🌿

AI-powered Ayurvedic Dosha prediction app using XGBoost + FastAPI + React. Discover your unique constitution and receive personalized wellness guidance.

## Project Structure

```
dosha-prediction-ai/
├── backend/
│   ├── main.py           # FastAPI app + prediction engine
│   ├── model.pkl         # Your trained XGBoost model ← PUT IT HERE
│   ├── requirements.txt
│   ├── Procfile          # Railway deployment
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Landing.jsx
    │   │   ├── Assessment.jsx
    │   │   ├── Predicting.jsx
    │   │   ├── Results.jsx
    │   │   └── Analytics.jsx
    │   ├── data/questions.js
    │   ├── lib/appwrite.js
    │   ├── App.jsx
    │   └── index.css
    ├── .env.example
    └── vercel.json
```

---

## Step 1 — Backend Setup

### Place your model
Copy your `model.pkl` into `backend/`:
```bash
cp /path/to/model.pkl backend/model.pkl
```

### Local development
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Test it:
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "bodyFrame": "Thin and Lean",
    "paceOfWork": "Fast",
    "bodyEnergy": "Low",
    "hungerPattern": "Skips Meals",
    "hairType": "Dry",
    "sleepPattern": "Light Sleeper",
    "mentalActivity": "Restless",
    "voiceQuality": "Fast",
    "jointStructure": "Light",
    "skinType": "Dry",
    "bodyOdor": "Mild"
  }'
```

### Deploy to Railway
1. Go to https://railway.app → New Project → Deploy from GitHub
2. Set root directory to `backend/`
3. Add environment variable: `MODEL_PATH=model.pkl`
4. Railway will auto-detect `Procfile` and deploy
5. Note your Railway URL (e.g. `https://dosha-backend.up.railway.app`)

> **Important:** Your `model.pkl` must be committed to the repo, or uploaded via Railway's volume storage.

---

## Step 2 — Appwrite Setup (Database)

1. Go to https://cloud.appwrite.io → Create Project
2. Create a Database → note the Database ID
3. Create a Collection called `assessments` → note Collection ID
4. Add these attributes to the collection:
   - `assessmentId` → String (255)
   - `timestamp` → String (64)
   - `predictedDosha` → String (32)
   - `confidence` → Float
   - `secondaryDosha` → String (32)
   - `answers` → String (4096)
5. Set Collection permissions: **Any** can Create and Read (for anonymous storage)

---

## Step 3 — Frontend Setup

### Local development
```bash
cp .env.example .env.local
# Fill in your values in .env.local
npm install
npm run dev
```

### Environment variables
```
VITE_API_URL=https://your-railway-backend.up.railway.app
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

### Deploy to Vercel
1. Push frontend folder to GitHub
2. Go to https://vercel.com → New Project → Import repo
3. Set root directory to `frontend/`
4. Add all 5 environment variables in Vercel dashboard
5. Deploy!

---

## Model Integration Notes

The backend uses **label encoding** (ordinal) for all features. The encoding maps in `main.py` must match your training preprocessing exactly.

If your model used **one-hot encoding** instead, update `encode_input()` in `main.py`:

```python
def encode_input(data: AssessmentInput) -> pd.DataFrame:
    row = {field: getattr(data, field) for field in FEATURE_ORDER}
    df = pd.DataFrame([row])
    df_encoded = pd.get_dummies(df)
    # Align with training columns
    training_cols = model.get_booster().feature_names
    df_encoded = df_encoded.reindex(columns=training_cols, fill_value=0)
    return df_encoded
```

---

## Analytics

Visit `/analytics` to see the hidden admin dashboard with:
- Total assessments
- Dosha distribution charts
- 7-day trend line
- Average confidence score

If Appwrite is not configured, it shows realistic mock data.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS v4 |
| Animations | Framer Motion |
| Charts | Recharts |
| Backend | FastAPI + Uvicorn |
| ML Model | XGBoost via Joblib |
| Database | Appwrite Cloud |
| Deployment | Vercel (frontend) + Railway (backend) |

---

## Notes

- **No authentication** — fully anonymous
- **No PII collected** — only answers + prediction stored
- **Fallback mode** — if model.pkl fails to load, a rule-based algorithm runs
- **Fallback UI** — if the API is down, a mock result is shown so the UI never breaks
