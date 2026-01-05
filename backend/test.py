import os
from dotenv import load_dotenv
import google.generativeai as genai

# 1. Load the environment
load_dotenv()

# 2. Get the key
key = os.getenv("GOOGLE_API_KEY")

print("------------------------------------------------")
if not key:
    print("❌ ERROR: Python cannot find 'GOOGLE_API_KEY'.")
    print("   -> Check if your .env file exists in this folder.")
    print("   -> Check if the file is named exactly '.env'.")
else:
    print(f"✅ SUCCESS: Key found! (Starts with: {key[:5]}...)")
    
    # 3. Try a real connection
    try:
        genai.configure(api_key=key)
        model = genai.GenerativeModel('models/gemini-pro')
        response = model.generate_content("Say 'System Operational'")
        print(f"🤖 AI RESPONSE: {response.text}")
    except Exception as e:
        print(f"❌ API ERROR: The key was found, but Google rejected it.")
        print(f"   Reason: {e}")
print("------------------------------------------------")