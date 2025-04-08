package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type APODResponse struct {
	Title       string `json:"title"`
	Date        string `json:"date"`
	Explanation string `json:"explanation"`
	URL         string `json:"url"`
	MediaType   string `json:"media_type"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	apiKey := os.Getenv("VITE_NASA_API_KEY")
	apodURL := "https://api.nasa.gov/planetary/apod"

	if apiKey == "" {
		http.Error(w, "NASA API key not configured in environment variables", http.StatusInternalServerError)
		return
	}

	client := http.Client{}
	req, err := http.NewRequest("GET", apodURL, nil)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error creating request: %v", err), http.StatusInternalServerError)
		return
	}

	q := req.URL.Query()
	q.Add("api_key", apiKey)
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error making request to NASA API: %v", err), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		http.Error(w, fmt.Sprintf("NASA API returned status: %d", resp.StatusCode), http.StatusInternalServerError)
		return
	}

	var apodData APODResponse
	err = json.NewDecoder(resp.Body).Decode(&apodData)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error decoding NASA API response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(apodData)
}

func main() {
	http.HandleFunc("/.netlify/functions/nasa_apod", Handler)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8888"
	}
	fmt.Printf("Server listening on port %s\n", port)
	http.ListenAndServe(":"+port, nil)
}