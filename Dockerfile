# Use Node.js 20 as base
FROM node:20

# Set working directory
WORKDIR /app

# Clone Terbium webOS repo (or copy if local)
RUN git clone https://github.com/TerbiumOS/webOS.git .
# Alternatively: COPY . .

# Install dependencies
RUN npm install

# Expose the correct port
EXPOSE 6969

# Start the app
CMD ["npm", "start"]
