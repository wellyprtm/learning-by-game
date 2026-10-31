package response

import (
	"encoding/json"
	"net/http"
)

type Envelope struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

func JSON(w http.ResponseWriter, status int, data interface{}, message ...string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	msg := ""
	if len(message) > 0 {
		msg = message[0]
	}

	res := Envelope{
		Success: status >= 200 && status < 300,
		Message: msg,
		Data:    data,
	}

	_ = json.NewEncoder(w).Encode(res)
}

func Error(w http.ResponseWriter, status int, errMsg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	res := Envelope{
		Success: false,
		Error:   errMsg,
	}

	_ = json.NewEncoder(w).Encode(res)
}
