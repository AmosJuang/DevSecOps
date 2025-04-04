Berikut adalah isi file `README.md` dalam format markdown yang sederhana dan bersih, tanpa terlalu banyak gaya atau emoji:

```markdown
# RealRate

RealRate adalah aplikasi web yang terinspirasi dari IMDB, memungkinkan pengguna untuk menilai dan mereview film. Aplikasi ini dibangun menggunakan **React.js + Vite** di sisi frontend dan **Node.js** di sisi backend. Proyek ini menggunakan Docker untuk memudahkan proses pengembangan dan deployment.

## Prasyarat

- Docker
- Node.js (opsional, jika ingin menjalankan backend di luar container)

## Menjalankan Aplikasi

### Mode Developer

1. **Build Docker Image:**

   ```bash
   docker build -t reactjs/devsecops:1.0.0 .
   ```

2. **Cek image yang telah dibuat:**

   ```bash
   docker image ls
   ```

3. **Jalankan container dalam mode developer:**

   ```bash
   docker run -d -p 3000:3000 reactjs/devsecops:1.0.0
   ```

   Aplikasi akan dapat diakses di: `http://localhost:3000`

### Mode Pre-Production (Staging)

1. **Build image pre-production:**

   ```bash
   docker build -t reactjs-stg/devsecops:1.0.0 -f Dockerfile.stg .
   ```

2. **Jalankan container staging:**

   ```bash
   docker run -d -p 3001:3001 reactjs-stg/devsecops:1.0.0
   ```

   Aplikasi akan dapat diakses di: `http://localhost:3001`

## Teknologi

- Frontend: React.js + Vite
- Backend: Node.js
- Containerization: Docker
