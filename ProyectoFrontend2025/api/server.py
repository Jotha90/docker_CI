from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from datetime import datetime, timezone


SERVICES = [
    {"id": 1, "name": "Desarrollo Web Corporativo", "price": "$1,200"},
    {"id": 2, "name": "Desarrollo de App Movil", "price": "$3,500"},
    {"id": 3, "name": "Consultoria TI", "price": "$600"},
    {"id": 4, "name": "Soporte Tecnico 24/7", "price": "$300/mes"},
]

USERS = [
    {"id": 101, "name": "Carlos Rivera", "email": "c.r@email.com", "role": "Cliente"},
    {"id": 102, "name": "Ana Gomez", "email": "a.g@email.com", "role": "Cliente"},
    {"id": 1, "name": "Admin User", "email": "admin@tech.com", "role": "Admin"},
]


class ApiHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        routes = {
            "/": self.api_info,
            "/health": self.health,
            "/services": lambda: self.send_json({"services": SERVICES}),
            "/users": lambda: self.send_json({"users": USERS}),
        }

        handler = routes.get(self.path)
        if handler is None:
            self.send_json({"error": "Endpoint no encontrado"}, status=404)
            return

        handler()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_common_headers()
        self.end_headers()

    def api_info(self):
        self.send_json(
            {
                "name": "TechSolutions API",
                "message": "API conectada desde el segundo contenedor",
                "endpoints": ["/health", "/services", "/users"],
            }
        )

    def health(self):
        self.send_json(
            {
                "status": "ok",
                "service": "techsolutions-api",
                "container": "api",
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        )

    def send_json(self, data, status=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_common_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_common_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def log_message(self, format, *args):
        print("%s - - [%s] %s" % (self.client_address[0], self.log_date_time_string(), format % args))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 5000), ApiHandler)
    print("TechSolutions API escuchando en http://0.0.0.0:5000")
    server.serve_forever()
