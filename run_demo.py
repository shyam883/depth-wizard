"""
DEPTH WIZARD — Interactive Local Demo Launcher
Smart India Hackathon 2026 | Problem Statement SIH26175
Theme: Disaster Management

Launches a zero-dependency lightweight local web server to run the Depth Wizard
Command Center in any browser with WebGL 60FPS support.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend")

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_DIR, **kwargs)

    def log_message(self, format, *args):
        # Suppress verbose standard request logs for a clean console
        sys.stdout.write(f"\r[DEPTH WIZARD LOG] {args[0]} - {args[1]}\n")
        sys.stdout.flush()

def main():
    print("=" * 70)
    print("  DEPTH WIZARD: Single-View Height Estimation & 3D Flythrough")
    print("  Smart India Hackathon 2026 | Problem Statement SIH26175")
    print("  Disaster Management Intelligence Platform")
    print("=" * 70)
    print(f"[*] Serving frontend directory: {FRONTEND_DIR}")
    print(f"[*] Local Command Center URL: http://localhost:{PORT}")
    print("[*] Press Ctrl+C at any time to stop the server.")
    print("=" * 70)

    # Automatically open the web browser
    url = f"http://localhost:{PORT}"
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"[!] Could not open browser automatically: {e}")
        print(f"[!] Please open {url} in your browser.")

    # Start the server
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPHandler) as httpd:
            print("[+] Server started successfully. Ready for Judge Evaluation.")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[*] Shutting down Depth Wizard server...")
    except Exception as e:
        print(f"[!] Error starting server: {e}")

if __name__ == "__main__":
    main()
