# Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN ls -alh /app   # זה יראה לך את כל הקבצים בקונטיינר
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 5000