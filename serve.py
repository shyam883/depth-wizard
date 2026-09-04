"""
DEPTH WIZARD — Robust Background Server
"""
import http.server
import socketserver
import os
import sys

PORT = 8080
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend")

class RobustHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_DIR, **kwargs)

    def log_message(self, format, *args):
        # Clean log output
        sys.stderr.write(f"[{args[0]}] {args[1]}\n")

def run():
    socketserver.TCPServer.allow_reuse_address = True
    while True:
        try:
            with socketserver.TCPServer(("0.0.0.0", PORT), RobustHandler) as httpd:
                print(f"DEPTH WIZARD Server active on port {PORT}")
                httpd.serve_forever()
        except Exception as e:
            sys.stderr.write(f"Server restart notice: {e}\n")

if __name__ == "__main__":
    run()
