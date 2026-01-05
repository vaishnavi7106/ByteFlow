import os
import google.generativeai as genai
from dotenv import load_dotenv

# 1. Load environment variables from the hidden .env file
load_dotenv()

# 2. Check if the key exists in the environment (Secure check)
if not os.getenv("GOOGLE_API_KEY"):
    print("⚠️ WARNING: GOOGLE_API_KEY not found in .env file. AI features will be disabled.")
    model = None
else:
    # 3. Configure directly from the environment variable
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    
    # Initialize the specific model (Flash for speed)
    model = genai.GenerativeModel('models/gemini-flash-latest')

def generate_overview(profile, dqs, scores):
    """Generates the top-level summary based on the profile context."""
    if not model:
        return f"Analysis complete for {profile.upper()}. DQS is {dqs}. Check Validity scores immediately."
    
    prompt = f"""
    You are a Data Quality Auditor for a bank.
    Context: Analysis for '{profile.upper()}' use case.
    Overall Score: {dqs}/100.
    Dimensions: {scores}.
    
    Task: Write a concise, professional executive summary (max 3 sentences) explaining the score and the biggest risk for this specific use case.
    """
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return "AI Analysis Unavailable. Please check API connection."
def generate_fix_steps(issue_text):
    """Generates human-readable fix suggestions for the 'Apply Fix' button."""
    if not model:
        return "1. Check the file manually.\n2. Fix the typos.\n3. Upload again."

    prompt = f"""
    Role: You are a friendly, non-technical support assistant helping a complete beginner.
    Task: The user has a data issue: "{issue_text}".
    
    Requirement: Provide exactly 3 very short, simple steps to fix this.
    Constraint: 
    - Use ZERO technical jargon (no words like 'schema', 'ingestion', 'regex'). 
    - Keep each step under 10 words.
    - Be encouraging but keep it formal.
    """
    try:
        response = model.generate_content(prompt)
        return response.text
    except:
        return "Could not generate fix steps."

def chat_with_data_agent(user_query, context_data):
    """Chatbot function for the 'Ask Me' popup."""
    if not model:
        return "I am offline. Please configure my API key in the .env file."

    prompt = f"""
    You are 'DataQualityAI', a friendly expert assistant.
    
    Current Dataset Context:
    - Profile: {context_data.get('profile')}
    - DQS Score: {context_data.get('dqs')}
    - Dimension Scores: {context_data.get('scores')}
    - Total Rows: {context_data.get('rows')}
    
    User Question: {user_query}
    
    Answer clearly and concisely. If the user asks about the score, use the data above.
    """
    try:
        response = model.generate_content(prompt)
        return response.text
    except:
        return "I encountered an error connecting to the AI brain."