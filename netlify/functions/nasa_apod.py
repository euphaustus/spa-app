# app/netlify/functions/nasa_apod.py
import requests
import json
import os

def handler(event, context):
    """Fetch NASA APOD data and return it."""
    nasa_api_key = os.environ.get("VITE_NASA_API_KEY")
    nasa_apod_api_url = "https://api.nasa.gov/planetary/apod"

    if not nasa_api_key:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": "NASA API key not configured in environment variables."}),
        }

    try:
        params = {"api_key": nasa_api_key}
        response = requests.get(nasa_apod_api_url, params=params)
        response.raise_for_status()  # Raise an exception for bad status codes

        apod_data = response.json()

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(apod_data),
        }

    except requests.exceptions.RequestException as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": f"Error fetching NASA APOD data: {str(e)}"}),
        }
    except json.JSONDecodeError as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": f"Error decoding NASA APOD response: {str(e)}"}),
        }

if __name__ == "__main__":
    # Example of how to run the handler locally (for testing)
    # You'll need to set the environment variable first
    # For example, in your terminal: export VITE_NASA_API_KEY="YOUR_DEMO_KEY"
    # Then run: python app/netlify/functions/nasa_apod.py
    import os
    os.environ["VITE_NASA_API_KEY"] = "DEMO_KEY"  # Replace with your key for local test
    result = handler(None, None)
    print(result)