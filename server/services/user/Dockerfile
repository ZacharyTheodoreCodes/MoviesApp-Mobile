# based image yang akan digunakan
FROM node

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/service-user

# untuk set ENV dalam aplikasi kita
ENV PORT=4001

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /usr/local/service-user/

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force


# copy semua file & folder ke WORKDIR
COPY ./ ./

# execute apps: production
CMD ["npm", "run", "start"]

# docker build -t service-user:1.0 ./
# docker container run --name service-user -p 4000:4000 service-user 
