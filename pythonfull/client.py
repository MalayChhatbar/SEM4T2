import socket

# Create socket
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Enter Server IP
host = "192.168.107.151"
port = 5000

client.connect((host, port))

print("Connected to server.")

while True:
    # Send message
    msg = input("You: ")
    client.send(msg.encode())

    if msg.lower() == "exit":
        break

    # Receive reply
    reply = client.recv(1024).decode()

    if reply.lower() == "exit":
        break

    print("Server:", reply)

client.close()
