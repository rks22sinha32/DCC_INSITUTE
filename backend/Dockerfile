# 1. BASE: Python ka ek chhota aur fast base image
FROM python:3.10-slim

# 2. WORKDIR: Container ke andar humara main folder
WORKDIR /app

# 3. DEPENDENCIES: Libraries ki list (requirements.txt) copy karte hain
COPY requirements.txt .

# 4. INSTALL: Python ki saari libraries install karte hain
RUN pip install -r requirements.txt

# 5. COPY CODE: Ab backend ka baaki saara code andar daalte hain
COPY . .

# 6. EXPOSE: Django default port 8000 par chalta hai
EXPOSE 8000

# 7. START: Container start hone par server run karne ka command
# (Dhyan dein: 0.0.0.0 lagana zaroori hai taaki Docker ke bahar se log isse connect kar sakein)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]