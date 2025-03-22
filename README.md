# project_mlops_interface_frontend

# init
```
1. /Users/js/.nvm/versions/node/v22.14.0/bin/npm install
또는 예를 들어 /Users/js/.nvm/versions/node/v22.14.0/bin/npm install vue-router axios dotenv
2. .env 파일 만들기 (.env.sample copy)
```

# debug dev
```
/Users/js/.nvm/versions/node/v22.14.0/bin/npm run dev
```

# deploy
```
1. /Users/js/.nvm/versions/node/v22.14.0/bin/npm run build
2. dist/* 파일들을 서버로 copy
3. nginx 설정

# /etc/nginx/sites-available/vue-app
server {
    listen 80;
    server_name your_domain.com;  # 도메인이나 IP 주소

    root /var/www/vue-app;  # 빌드된 파일이 위치할 경로
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;  # Vue Router를 위한 설정
    }

    # API 프록시 설정 (백엔드 서버가 있는 경우)
    location /api {
        proxy_pass http://localhost:your_backend_port;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

4. Nginx 설정 활성화
sudo ln -s /etc/nginx/sites-available/vue-app /etc/nginx/sites-enabled/
sudo nginx -t  # 설정 테스트
sudo systemctl restart nginx

5. 환경변수 설정
VITE_REQUEST_URL=https://your-api-server.com/api
```


# package
```sh
npm run build
```
