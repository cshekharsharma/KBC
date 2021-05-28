package apiresponse

import (
	"encoding/json"
)

type Response struct {
	Status  string      `json:"status"`
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

func (r *Response) Create(status string, code int, data interface{}, message string) []byte {
	r.Status = status
	r.Code = code
	r.Data = data
	r.Message = message

	jsonResponse, _ := json.Marshal(r)
	return jsonResponse
}
