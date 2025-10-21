docker build -t jsonhero  -f Dockerfile .


前提 需要没有执行过 npm install的情况下执行

docker run -p 8787:8787 --name jsonheroLocal -d jsonhero:latest



多架构构建
docker buildx build --platform linux/amd64,linux/arm64 -t jsonherom  -f Dockerfile .

docker build --platform linux/amd64 -t jsonherol:1.0.0 -f Dockerfile .

docker tag jsonherol:1.0.0 ideaflow1/jsonherol:1.0.0

docker push ideaflow1/jsonherol:1.0.0

ideaflow1 账户 需要github登录
# 推送镜像

```bash
docker tag jsonherom:latest ideaflow1/jsonherom:1.0.0

docker push ideaflow1/jsonherom:1.0.0
```


# 多架构部署,并直接push

docker buildx build --platform linux/amd64,linux/arm64 -t ideaflow1/jsonherol:1.0.1  --push .




之前的
docker buildx build --platform linux/amd64,linux/arm64 -t ideaflow1/novel-download:latest  --push .