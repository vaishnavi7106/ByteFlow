from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

# Import our custom modules
# Ensure scoring.py and llm_agent.py are in the same folder
from scoring import compute_weighted_score
from llm_agent import generate_overview, generate_fix_steps, chat_with_data_agent

app = Flask(__name__)
CORS(app)

# Global variable to store context for the chatbot
current_session_context = {}

@app.route("/evaluate", methods=["POST"])
def evaluate():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    
    # 1. Get Profile from Frontend (Defaults to 'analytics' if missing)
    profile = request.form.get("context", "analytics").lower()

    try:
        # Check file type
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file)
        else:
            return jsonify({"error": "Invalid file type. Please upload CSV or Excel."}), 400
        
        # 2. Calculate Weighted Scores based on the selected Profile
        dqs, raw_scores = compute_weighted_score(df, profile)
        
        # 3. Normalize Keys for Frontend
        dimension_scores = {k.capitalize(): v for k, v in raw_scores.items()}

        # 4. Generate AI Overview using Gemini
        overview = generate_overview(profile, dqs, dimension_scores)
        
        # 5. Generate Dynamic Recommendations
        sorted_dims = sorted(dimension_scores.items(), key=lambda x: x[1])
        lowest_dim_name = sorted_dims[0][0]
        
        recommendations = [
            f"Critical: {lowest_dim_name} score is below threshold for {profile.upper()}.",
            "Standardize date formats to ISO-8601.",
            "Run deduplication script on ID columns."
        ]

        # 6. Save Context for the Chatbot
        global current_session_context
        current_session_context = {
            "profile": profile,
            "dqs": dqs,
            "scores": dimension_scores,
            "rows": len(df),
            "columns": list(df.columns)
        }

        # Return Data to Frontend
        return jsonify({
            "dqs": dqs,
            "dimensions": dimension_scores,
            "insights": overview,
            "recommendations": recommendations
        })

    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({"error": "Failed to process dataset"}), 500

@app.route("/fix", methods=["POST"])
def get_fix():
    """Endpoint called when user clicks 'Apply Fix' button"""
    data = request.json
    issue = data.get("issue", "General Data Error")
    
    # Call Gemini to get actionable steps
    steps = generate_fix_steps(issue)
    return jsonify({"fix": steps})

@app.route("/chat", methods=["POST"])
def chat():
    """Endpoint for the 'Ask Me' Chatbot Popup"""
    data = request.json
    user_msg = data.get("message", "")
    
    # Send the user message + the current file context to Gemini
    response_text = chat_with_data_agent(user_msg, current_session_context)
    
    return jsonify({"reply": response_text})

if __name__ == "__main__":
    app.run(debug=True, port=5000)