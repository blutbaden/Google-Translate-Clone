# ----------------------------
# build from source
# ----------------------------
FROM node:18 AS build

# Get the arguments from the command line
ARG NG_APP_GOOGLE_TRANSLATE_API_KEY

# Set the environment variables
ENV NG_APP_GOOGLE_TRANSLATE_API_KEY=$NG_APP_GOOGLE_TRANSLATE_API_KEY

WORKDIR /app

COPY package*.json .
RUN npm install --force

COPY . .
RUN npm run build

# ----------------------------
# run with nginx
# ----------------------------
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist/angular-tutorial /usr/share/nginx/html

EXPOSE 80
