import socket

# Create socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind IP and Port
host = "0.0.0.0"     # Accept from any IP
port = 5000

server.bind((host, port))
server.listen(1)

print("Server started...")
print("Waiting for client connection...")

conn, addr = server.accept()
print("Connected by:", addr)

while True:
    # Receive message from client
    msg = conn.recv(1024).decode()

    if msg.lower() == "exit":
        print("Client disconnected.")
        break

    print("Client:", msg)

    # Send reply
    reply = input("You: ")
    conn.send(reply.encode())

    if reply.lower() == "exit":
        break

conn.close()
server.close()
