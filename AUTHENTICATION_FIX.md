# =====================================
# DATABASE & AUTHENTICATION FIX
# =====================================

## 🔴 ROOT CAUSE: Admin user was in wrong table

**Problem**: Your `CustomUserDetailsService` looks for admin in `admins` table, but your SQL script created admin in `users` table.

**Solution**: Admin must be in `admins` table with BCrypt password.

## 📋 STEP-BY-STEP FIX

### Step 1: Run the Fixed Database Script
```bash
# Connect to MySQL
mysql -u root -p

# Run the fixed script
source database_setup_fixed.sql
```

### Step 2: Verify Admin User
```sql
USE portfolio_db;
SELECT * FROM admins;
-- Should show: admin | $2a$12$... | ADMIN
```

### Step 3: Test Authentication
```bash
# Start backend
cd backend
mvn spring-boot:run
```

### Step 4: Test Login API
```bash
# Test login endpoint
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "admin"
}
```

## 🔧 MANUAL DATABASE FIX (If needed)

If you can't run the full script, fix manually:

```sql
-- Connect to MySQL
USE portfolio_db;

-- Create admins table if it doesn't exist
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'ADMIN'
);

-- Insert admin user (BCrypt hash for 'admin123')
INSERT INTO admins(username, password, role)
VALUES('admin', '$2a$12$rjlUE4GverAXs3L.lzypoOhlhitggyXzPLXT62xeQ6vCp77jCDALi', 'ADMIN')
ON DUPLICATE KEY UPDATE password='$2a$12$rjlUE4GverAXs3L.lzypoOhlhitggyXzPLXT62xeQ6vCp77jCDALi';

-- Verify
SELECT * FROM admins;
```

## 🧪 TESTING CHECKLIST

- [ ] Database script runs without errors
- [ ] Admin user exists in `admins` table
- [ ] Backend starts successfully
- [ ] POST /api/auth/login returns JWT token
- [ ] Frontend can login with admin/admin123
- [ ] Protected routes work with JWT token

## 🚨 COMMON ISSUES

### Issue: "Table 'portfolio_db.admins' doesn't exist"
**Fix**: Run the database setup script above.

### Issue: "Bad credentials"
**Fix**: Ensure password is BCrypt hash for 'admin123'.

### Issue: "User not found"
**Fix**: Admin must be in `admins` table, not `users` table.

### Issue: JWT token invalid
**Fix**: Check JWT secret in application.properties matches.

## 📱 Frontend Testing

After backend is fixed, test in browser:

1. Go to admin login page
2. Enter: `admin` / `admin123`
3. Should get JWT token and redirect to dashboard
4. Protected routes should work

## 🔐 Security Notes

- **Production**: Change default password
- **JWT Secret**: Use strong secret key
- **HTTPS**: Enable in production
- **Password**: Use proper password policy

---

**The key fix**: Admin user belongs in `admins` table, not `users` table! 🎯