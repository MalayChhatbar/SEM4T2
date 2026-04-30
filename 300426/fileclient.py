import socket
import os

host = '192.168.101.155'  # Replace with your server IP
port = 9000
filename = 'pythonsyllabus.pdf'  # Replace with your file

if not os.path.exists(filename):
    print(f"Error: File '{filename}' not found.")
    exit(1)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    try:
        s.connect((host, port))
        print(f"Connected to server {host}:{port}")

        # Send filename
        s.send(filename.encode())

        # Send file data
        with open(filename, 'rb') as f:
            while True:
                data = f.read(1024)
                if not data:
                    break
                s.send(data)

        print(f"File '{filename}' sent successfully.")

    except ConnectionRefusedError:
        print("Error: Could not connect to the server. Is it running?")
    except Exception as e:
        print(f"Error: {e}")
