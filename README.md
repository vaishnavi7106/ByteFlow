# 🛡️ DataQualityAI (ByteFlow)

> **GenAI-Powered Stateless Data Governance & Risk Analysis Platform**

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Backend-Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2?style=for-the-badge)
![Pandas](https://img.shields.io/badge/Data-Pandas-150458?style=for-the-badge&logo=pandas)

---

## 📖 Overview

**DataQualityAI** (Project ByteFlow) is a sophisticated data analysis tool designed to assess, score, and remediate data quality issues in financial transaction datasets.

Unlike traditional tools that store sensitive data, DataQualityAI operates on a **Zero-Persistence Architecture**. It ingests data streams into volatile memory (RAM), calculates statistical metadata, and utilizes **Google Gemini Pro** to generate risk insights without ever committing Personal Identifiable Information (PII) to a persistent database.

### 🎯 Key Features
* **Zero-Persistence Mode:** Stateless processing using Python `BytesIO` streams ensures maximum privacy and GDPR compliance.
* **GenAI Analyst:** Automated risk assessment and remediation suggestions powered by Google Gemini.
* **DQS Scoring Engine:** Proprietary algorithm that calculates a Data Quality Score based on Validity, Completeness, Consistency, Timeliness, and Accuracy.
* **Tactical Dashboard:** A cyberpunk-inspired, dark-mode UI built with React for high-contrast visualization.
* **Interactive Remediation:** One-click generation of fix guides for detected data issues.

---

## 🏗️ Architecture

The system follows a decoupled Client-Server architecture designed for security:

1.  **Frontend (React):** Handles file uploads via a secure gateway and renders visualizations (Gauge charts, Dimension bars).
2.  **Ingestion Layer (Flask):** Accepts CSV/Excel files and reads them directly into memory.
3.  **Processing Engine (Pandas):** Extracts statistical metadata (null counts, type mismatches) and destroys the raw dataframe immediately after processing.
4.  **Reasoning Layer (Gemini):** The metadata (not the raw data) is sent to the LLM to generate narrative insights.

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js & npm
* Python 3.9+
* Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ByteFlow.git
cd ByteFlow
```

### 2. Backend Setup (Flask)
Navigate to the backend folder to set up the Python environment.

```bash
cd backend
```

**Create virtual environment (Recommended):**
```bash
python -m venv .venv
```

**Activate it:**
* **Windows:** `.venv\Scripts\activate`
* **Mac/Linux:** `source .venv/bin/activate`

**Install dependencies:**
```bash
pip install flask flask-cors pandas openpyxl google-generativeai python-dotenv
```

**Configuration:**
Create a file named `.env` in the `backend/` directory and add your API key:
```env
GOOGLE_API_KEY=your_actual_api_key_here
```

**Run Server:**
```bash
python app.py
```
*Output: Running on [http://127.0.0.1:5000](http://127.0.0.1:5000)*

### 3. Frontend Setup (React)
Open a **new terminal window** and navigate to the frontend folder.

```bash
cd frontend
```

**Install Node modules:**
```bash
npm install
```

**Start the Application:**
```bash
npm start
```
*Opens http://localhost:3000 in your browser*

---

## 💡 Usage Guide

1.  **Select Profile:** Choose a use case (e.g., KYC, Fraud, Analytics) on the dashboard top bar.
2.  **Ingest Data:** Drag and drop a CSV or Excel file into the "Secure Ingestion Gateway" box.
3.  **Analyze:** The system will process the file in milliseconds.
    * **DQS Score:** View the overall health of your data.
    * **Dimensions:** Check specific metrics like Completeness or Validity.
4.  **Remediate:** Click "Apply Fix" on the suggested remediation cards to get step-by-step guides.
5.  **Chat:** Use the floating AI Chatbot button to ask questions like *"Why is the validity score so low?"*.

---

## 📂 Project Structure

```text
ByteFlow/
├── backend/
│   ├── app.py                # Main Flask API (Stateless)
│   ├── .env                  # API Keys (GitIgnored)
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── FileUpload.js
│   │   │   ├── InsightCard.js
│   │   │   ├── QualityGauge.js
│   │   │   ├── DimensionBars.js
│   │   │   ├── RecommendationList.js
│   │   │   ├── ChatbotPopup.js
│   │   │   └── ProfileSelector.js
│   │   ├── styles/           # CSS Modules (Dashboard.css)
│   │   ├── App.js            # Main React Logic
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🤝 Contributing
Contributions are welcome!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed by ByteFlow**
