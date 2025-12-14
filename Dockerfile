FROM nginx:1.25-alpine

# Remova defaults e copie site estático
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

