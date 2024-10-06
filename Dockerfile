# build stage
FROM  node:12 as build-stage

LABEL maintainer=511252519@qq.com

# 创建一个工作目录
WORKDIR /app-b

COPY . .

RUN yarn install --registry=https://registry.npm.taobao.org

RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app-b/dist /usr/share/nginx/html-b

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]