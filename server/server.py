import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock.bind(('',9002))
sock.listen()
print('LISTENING ...')
while(1):
    conn, addr = sock.accept()
    req = conn.recv(1024*10)
    content = b'<h1>Hello World</h1>'
    conn.send(b'HTTP/1.1 200 OK\r\n\r\n' + content)
    print(req.decode())