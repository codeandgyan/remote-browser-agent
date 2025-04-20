# Remote Browser Agent


## Set-up and run the server
   *You need a docker desktop on your machine

    ```
    cd ./server
    ```
    ```
    docker build -t autobrowser-backend -f Dockerfile .
    ```
    ```
    docker run -d -p 3000:3000 -p 5800:5800 --name autobrowser autobrowser-backend
    ```
    http://localhost:5800/vnc.html
    
```
pnpm exec playwright install
```

## Set-up and run client
    ```
    cd ./client
    ```
    ```
    pnpm install
    ```
    ```
    pnpm dev
    ```
    Run http://localhost:5173/

