# Use Playwright's base image with all deps pre-installed
FROM mcr.microsoft.com/playwright:latest

# Set environment variables
ENV DISPLAY=:1
ENV DEBIAN_FRONTEND=noninteractive

# Install GUI, VNC, noVNC tools
RUN apt-get update && apt-get install -y \
    fluxbox \
    x11vnc \
    xvfb \
    novnc \
    net-tools \
    curl \
    git \
    python3 \
    python3-pip \
    && apt-get clean

# Set up noVNC
RUN git clone https://github.com/novnc/noVNC.git /opt/novnc && \
    git clone https://github.com/novnc/websockify /opt/novnc/utils/websockify

# Create app directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy rest of backend files
COPY . .

# Expose backend and noVNC ports
EXPOSE 3000 5800

# Start everything together
CMD Xvfb :1 -screen 0 1280x720x16 & \
fluxbox & \
x11vnc -display :1 -nopw -forever -shared -rfbport 5900 -bg && \
/opt/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 5800 & \
DISPLAY=:1 node index.js && tail -f /dev/null

