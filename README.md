# Movie API

Movie API adalah sebuah REST API yang memungkinkan Anda untuk mengelola data film, seperti menambahkan film, memperbarui informasi film, menghapus film, dan mengambil daftar film. API ini dibangun menggunakan Node.js dan PostgreSQL dengan query SQL mentah tanpa ORM.

## Daftar Isi

- [Fitur](#fitur)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Endpoint API](#endpoint-api)
- [Struktur Tabel Database](#struktur-tabel-database)
- [Testing dengan Postman](#testing-dengan-postman)
- [Lisensi](#lisensi)

## Fitur

- Mendapatkan daftar semua film.
- Mendapatkan detail satu film berdasarkan ID.
- Menambahkan film baru.
- Memperbarui informasi film berdasarkan ID.
- Menghapus film berdasarkan ID.

## Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek ini di mesin lokal Anda.

### Prasyarat

- Node.js dan npm terinstal.
- PostgreSQL terinstal dan berjalan di mesin lokal Anda.

### Langkah-langkah

1. Clone repositori ini:

   ```bash
   git clone https://github.com/randytjioe/mission-backend-harisenin
   cd movie-api
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Konfigurasikan variabel lingkungan dengan membuat file `.env`:

   ```bash
   touch .env
   ```

   Tambahkan konfigurasi berikut ke dalam file `.env`:

   ```
   DB_NAME=movie_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   PORT=3000
   ```

4. Buat tabel `movies` di PostgreSQL:

   ```sql
   CREATE TABLE movies (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255),
     duration INT,
     genre_id INT
   );
   ```

5. Jalankan server:

   ```bash
   node app.js
   ```

   Server akan berjalan di \`http://localhost:3000\`.

## Penggunaan

Anda dapat mengakses API ini melalui tools seperti Postman atau cURL. Berikut adalah daftar endpoint yang tersedia di API ini.

## Endpoint API

| **Method** | **Endpoint** | **Deskripsi**                               | **Body Params**                       |
| ---------- | ------------ | ------------------------------------------- | ------------------------------------- |
| GET        | /movies      | Mendapatkan daftar semua film               | -                                     |
| GET        | /movie/:id   | Mendapatkan detail satu film berdasarkan ID | -                                     |
| POST       | /movie       | Menambahkan film baru                       | \`title\`, \`duration\`, \`genre_id\` |
| PUT        | /movie/:id   | Memperbarui informasi film berdasarkan ID   | \`title\`, \`duration\`, \`genre_id\` |
| DELETE     | /movie/:id   | Menghapus film berdasarkan ID               | -                                     |

### Contoh Body JSON untuk POST dan PUT:

```json
{
  "title": "Inception",
  "duration": 148,
  "genre_id": 2
}
```

## Struktur Tabel Database

Berikut adalah struktur tabel \`movies\` yang digunakan dalam API ini:

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  duration INT,
  genre_id INT
);
```

## Testing dengan Postman

Untuk menguji API ini, Anda bisa menggunakan Postman dengan cara berikut:

1. **GET Semua Film**

   - **Method**: GET
   - **URL**: \`http://localhost:3000/movies\`

2. **GET Film Berdasarkan ID**

   - **Method**: GET
   - **URL**: \`http://localhost:3000/movie/1\` (Ganti \`1\` dengan ID film yang diinginkan)

3. **POST Menambahkan Film Baru**

   - **Method**: POST
   - **URL**: \`http://localhost:3000/movie\`
   - **Body** (JSON):
     ```json
     {
       "title": "Inception",
       "duration": 148,
       "genre_id": 2
     }
     ```

4. **PUT Memperbarui Film Berdasarkan ID**

   - **Method**: PUT
   - **URL**: \`http://localhost:3000/movie/1\`
   - **Body** (JSON):
     ```json
     {
       "title": "Inception - Updated",
       "duration": 150,
       "genre_id": 2
     }
     ```

5. **DELETE Film Berdasarkan ID**
   - **Method**: DELETE
   - **URL**: \`http://localhost:3000/movie/1\`
