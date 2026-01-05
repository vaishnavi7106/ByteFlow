# profile_weights.py

# Weights must sum to 1.0 for each profile
PROFILE_CONFIG = {
    "kyc": {
        "Completeness": 0.35, # Critical: Cannot verify identity if fields are missing
        "Validity": 0.30,     # Critical: IDs must match regex patterns
        "Accuracy": 0.15,
        "Consistency": 0.10,
        "Uniqueness": 0.05,
        "Timeliness": 0.05
    },
    "fraud": {
        "Uniqueness": 0.30,   # Critical: Velocity checks rely on unique transaction IDs
        "Timeliness": 0.30,   # Critical: Real-time fraud detection needs fresh data
        "Consistency": 0.20,
        "Accuracy": 0.10,
        "Completeness": 0.05,
        "Validity": 0.05
    },
    "analytics": {
        "Accuracy": 0.30,     # Critical: Reporting numbers must be correct
        "Consistency": 0.30,  # Critical: Data must align across tables
        "Completeness": 0.20,
        "Validity": 0.10,
        "Timeliness": 0.05,
        "Uniqueness": 0.05
    },
    "merchant": {
        "Validity": 0.40,     # Critical: Merchant codes/Tax IDs must be valid format
        "Completeness": 0.30,
        "Accuracy": 0.10,
        "Consistency": 0.10,
        "Uniqueness": 0.05,
        "Timeliness": 0.05
    }
}

def get_weights(profile_name):
    """Returns the weight dictionary for a given profile (default to analytics)"""
    return PROFILE_CONFIG.get(profile_name.lower(), PROFILE_CONFIG['analytics'])