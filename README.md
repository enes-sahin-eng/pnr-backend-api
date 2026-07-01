# PNR Çanta & Aksesuar - Backend API 🎒

Bu proje, özelleştirilebilir çanta ve aksesuar satışı yapan bir e-ticaret platformu için geliştirilmiş, rol bazlı yetkilendirmeye (RBAC) sahip, güvenli ve ölçeklenebilir bir RESTful API servisidir.

🚀 **Canlı Sunucu URL:** [https://pnr-backend-api-production.up.railway.app](https://pnr-backend-api-production.up.railway.app)

## 🛠️ Kullanılan Teknolojiler

*   **Çalışma Ortamı:** Node.js & Express.js
*   **Dil:** TypeScript
*   **Veritabanı & ORM:** PostgreSQL (Supabase) & Prisma ORM
*   **Güvenlik:** JWT (JSON Web Token), Bcrypt (Şifreleme), CORS
*   **Dağıtım (Deployment):** Railway

---

## 📡 API Uç Noktaları (Endpoints)

Güvenlik gerektiren işlemlerde İstek Başlığına (Headers) `Authorization: Bearer <token>` eklenmelidir.

### 🛍️ Ürünler (Products)
| Metot | Uç Nokta | Açıklama | Yetki |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Tüm ürünleri listeler | Herkese Açık |
| `POST` | `/api/products` | Yeni ürün ekler | `ADMIN`, `DESIGNER` |
| `PATCH` | `/api/products/:id` | Ürün bilgilerini günceller | `ADMIN`, `DESIGNER` |
| `DELETE` | `/api/products/:id` | Ürün siler | `ADMIN`, `DESIGNER` |

### 📂 Kategoriler (Categories)
| Metot | Uç Nokta | Açıklama | Yetki |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Tüm kategorileri listeler | Herkese Açık |
| `POST` | `/api/categories` | Yeni kategori ekler | `ADMIN`, `DESIGNER` |
| `PATCH` | `/api/categories/:id` | Kategori günceller | `ADMIN`, `DESIGNER` |
| `DELETE` | `/api/categories/:id` | Kategori siler | `ADMIN`, `DESIGNER` |

### 📦 Siparişler (Orders)
| Metot | Uç Nokta | Açıklama | Yetki |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/orders` | Siparişleri listeler | Giriş Yapmış Kullanıcı |
| `POST` | `/api/orders` | Yeni sipariş oluşturur | Giriş Yapmış Kullanıcı |
| `PATCH` | `/api/orders/:id/status` | Sipariş durumunu günceller | `ADMIN`, `DESIGNER` |

### 👤 Kullanıcılar (Users)
| Metot | Uç Nokta | Açıklama | Yetki |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/register` | Yeni kullanıcı kaydı oluşturur | Herkese Açık |
| `POST` | `/api/user/login` | Kullanıcı girişi (Token döndürür) | Herkese Açık |
| `GET` | `/api/user/profil` | Aktif kullanıcının profilini getirir | Giriş Yapmış Kullanıcı |
| `GET` | `/api/user/all` | Tüm kullanıcıları listeler | `ADMIN` |

---

## 🔒 Güvenlik Mimarisi

*   **Kimlik Doğrulama (Authentication):** Kullanıcı girişlerinde JWT oluşturulur. İstemci bu token'ı sonraki isteklerde gönderir.
*   **Rol Bazlı Erişim (Authorization):** `isRole` middleware'i sayesinde `ADMIN`, `DESIGNER` ve `CUSTOMER` rolleri ayırt edilir. Sadece yetkili profiller CRUD (Ekle/Sil/Güncelle) işlemlerini yapabilir.
*   **İlişkisel Veri Bütünlüğü:** Prisma'nın `nested write` (iç içe yazma) özelliği kullanılarak, Sipariş (Order) ve Siparişe ait ürün detayları (OrderItem) veritabanına tek bir operasyonda bütünleşik olarak kaydedilir. Bu sayede siparişin oluşup detaylarının eksik kalması gibi ilişkisel veri kopukluklarının önüne geçilmiştir.
