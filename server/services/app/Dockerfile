# based image yang akan digunakan
FROM node

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/service-app

# untuk set ENV dalam aplikasi kita
ENV PORT=4002
ENV NODE_ENV="production"

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /usr/local/service-app/

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force


# copy semua file & folder ke WORKDIR
COPY ./ ./

# execute apps: production
CMD ["npm", "run", "start"]