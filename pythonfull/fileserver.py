import socket

host = '0.0.0.0'
port = 9000

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((host, port))
    s.listen(1)
    print(f"Server listening on {host}:{port}")

    try:
        c, addr = s.accept()
        with c:
            print(f"Connection established from {addr}")

            # Receive filename
            filename = c.recv(1024).decode()
            if not filename:
                print("No filename received.")
                continue

            print(f"Receiving file: {filename}")

            # Receive file data
            with open(filename, 'wb') as f:
                while True:
                    data = c.recv(1024)
                    if not data:
                        break
                    f.write(data)

            print(f"File '{filename}' received successfully.")

    except Exception as e:
        print(f"Server error: {e}")
