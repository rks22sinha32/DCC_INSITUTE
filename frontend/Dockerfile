# 1. BASE: Ek chhota aur fast Linux OS jisme Node.js pehle se ho
FROM node:18-alpine

# 2. WORKDIR: Container ke andar ek folder banate hain jahan humara code rahega
WORKDIR /app

# 3. DEPENDENCIES: Pehle sirf package.json copy karte hain
COPY package*.json ./

# 4. INSTALL: npm install run karke saari libraries download karte hain
RUN npm install

# 5. COPY CODE: Ab humara baaki ka saara (Tailwind, TSX) code copy karte hain
COPY . .

# 6. BUILD: Next.js website ko production ke liye pack (build) karte hain
RUN npm run build

# 7. EXPOSE: Duniya ko batate hain ki yeh box port 3000 par chalega
EXPOSE 3000

# 8. START: Box on hote hi sabse pehle kaunsi command chalegi
CMD ["npm", "run", "start"]