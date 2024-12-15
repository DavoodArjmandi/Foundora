# Stage 1: Build the Angular application
FROM node:18 as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app's source code and build the app
COPY . .
RUN npm run nx build auth --prod --output-path=dist/auth

# Stage 2: Serve the built Angular app using Nginx
FROM nginx:alpine

# Copy the built app from the first stage
COPY --from=build /app/dist/auth /usr/share/nginx/html

# Copy a custom Nginx configuration if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]