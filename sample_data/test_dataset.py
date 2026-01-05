import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Configuration
NUM_ROWS = 200

# 1. Generate Basic Data
ids = [f"TRX-{1000 + i}" for i in range(NUM_ROWS)]
amounts = np.random.normal(500, 50, NUM_ROWS) # Normal distribution centered at 500
dates = [datetime(2023, 1, 1) + timedelta(days=i) for i in range(NUM_ROWS)]
categories = np.random.choice(['Electronics', 'Clothing', 'Home', 'Groceries'], NUM_ROWS)
emails = [f"user{i}@example.com" for i in range(NUM_ROWS)]
statuses = np.random.choice(['Completed', 'Pending', 'Failed'], NUM_ROWS)
regions = np.random.choice(['North', 'South', 'East', 'West'], NUM_ROWS)

# 2. Inject Flaws (Make the data "Dirty")

# --- A. Completeness Issues (Nulls) ---
# Randomly set 10% of Emails and Regions to NaN
for i in range(NUM_ROWS):
    if random.random() < 0.10:
        emails[i] = np.nan
    if random.random() < 0.10:
        regions[i] = None

# --- B. Accuracy Issues (Outliers) ---
# Add 5 massive outliers to Amounts (e.g., 50,000 instead of 500)
# These will trigger the Z-Score check in your 'Accuracy' logic
for _ in range(5):
    idx = random.randint(0, NUM_ROWS - 1)
    amounts[idx] = amounts[idx] * 100 

# --- C. Consistency Issues (Whitespace) ---
# Add leading/trailing spaces to Categories (e.g., " Clothing ")
# This will trigger the 'Consistency' check
for i in range(NUM_ROWS):
    if random.random() < 0.20: # 20% of rows
        categories[i] = f" {categories[i]} "

# --- D. Uniqueness Issues (Duplicates) ---
# Force duplicate rows by copying the first 10 rows to the end
# Note: We'll actually insert them, making the total rows > 200 temporarily, 
# but for simplicity, we'll just overwrite existing rows 180-190 with 0-10
for i in range(10):
    ids[190+i] = ids[i]
    amounts[190+i] = amounts[i]
    emails[190+i] = emails[i]

# --- E. Timeliness/Validity Issues (Bad Dates) ---
# Convert dates to string and mess up formats or delete them
date_strs = [d.strftime('%Y-%m-%d') for d in dates]
for i in range(NUM_ROWS):
    r = random.random()
    if r < 0.05:
        date_strs[i] = "" # Missing date
    elif r < 0.10:
        date_strs[i] = "Invalid-Date" # Malformed

# 3. Create DataFrame
df = pd.DataFrame({
    'Transaction_ID': ids,
    'Amount': amounts,
    'Transaction_Date': date_strs,
    'Category': categories,
    'Customer_Email': emails,
    'Status': statuses,
    'Region': regions
})

# 4. Save to CSV
df.to_csv('synthetic_quality_test.csv', index=False)
print("Dataset 'synthetic_quality_test.csv' generated with 200 rows!")
print("Includes: Outliers, Nulls, Duplicates, and Whitespace issues.")