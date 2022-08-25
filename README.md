# TerbiumOS web
This web os is packed full of feature ***AND MUCH MORE TO COME***
![image](https://user-images.githubusercontent.com/49733954/186297001-347adeb6-2abd-42fd-9c46-5e51fff06c7e.png)
![image](https://user-images.githubusercontent.com/49733954/186296936-4f55d2f0-d9f1-45ef-a89c-b2587d2daa75.png)
![image](https://user-images.githubusercontent.com/49733954/186296967-4ee2d9fc-1e2a-4063-a85f-3d8c1c253046.png)

---
# Hosting TerbiumOS web
There are currently two options for hosting TerbiumOS web: Standard Docker and Docker Compose.

---
- ## Docker
To run TerbiumOS web on Docker, you need to install Docker(duh) and then run this:.

```bash
docker run -d -p <your port>:6969 motortruck1221/terbium
```

--- 
- ## Docker Compose
To run TerbiumOS web on Docker Compose, you need to install Docker and Docker Compose(duh) and then run this:

```bash
docker-compose up -d
```

- Example config:
```yaml
version: "2"
services:
  terbium:
    image: "motortruck1221/terbium"
    ports:
    #IMPORTANT: DO NOT CHANGE THE 6969 PART ONLY CHANGE THE 90 PART
      - 90:6969
```
Alternatively, you can just grab the Docker Compose Script:

```bash
curl -L https://raw.githubusercontent.com/MotorTruck1221/TerbiumOS-Docker/main/docker-compose.yml > docker-compose.yml
```