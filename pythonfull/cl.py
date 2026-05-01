## Client file

import socket

# SERVER IP ADDRESS (change 'localhost' to server IP if running remotely)
host = '192.168.107.151'  # or use actual IP like '192.168.1.100'
port = 9000

# FILE TO SEND
filename = r'C:\Users\LJENG\Desktop\1.txt'  # Replace with your actual file name

# CREATE CLIENT SIDE SOCKET USING TCP
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    # CONNECT TO SERVER
    s.connect((host, port))
    print(f"Connected to server {host}:{port}")

    # SEND FILENAME TO SERVER
    s.send(filename.encode())

    # OPEN FILE AND SEND ITS CONTENTS
    with open(filename, 'rb') as f:
        data = f.read(1024)
        while data:
            s.send(data)
            data = f.read(1024)

    print(f"File '{filename}' sent successfully.")

except Exception as e:
    print("Error:", e)

finally:
    # DISCONNECT CLIENT
    s.close()
