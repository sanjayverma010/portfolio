# Supabase PostgreSQL Configuration - Quick Reference

## Environment Variables Required

```bash
# Set these in your deployment platform or .env file

DB_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/postgres?sslmode=require
DB_USERNAME=postgres
DB_PASSWORD=YOUR_PASSWORD
```

---

## Getting Your Supabase Connection Details

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Select Your Project**
3. **Go to**: Settings → Database → Connection String
4. **Choose**: "URI" tab
5. **Copy the connection string** - Format:
   ```
   postgresql://postgres:[password]@[host]:5432/postgres
   ```

---

## Complete URL Example

```
postgresql://postgres:abcDEF123xyz@db.abcdefghij.supabase.co:5432/postgres?sslmode=require
                     ^^^^^^^^^^^^^^          ^^^^^^^^^^^^^^^
                     (password)             (host)
```

---

## Where to Set Environment Variables

### For Render.com Deployment:
1. Go to your service settings
2. Click "Environment"
3. Add:
   - Key: `DB_URL` → Value: `postgresql://...`
   - Key: `DB_USERNAME` → Value: `postgres`
   - Key: `DB_PASSWORD` → Value: `your_password`

### For Railway.app Deployment:
1. Project Settings → Variables
2. Add the same variables

### For Local Testing (.env file):
Create `/backend/.env`:
```
DB_URL=postgresql://localhost:5432/portfolio_db
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
```

---

## SSL Mode Configuration

Supabase requires **SSL mode**. The configuration already includes:
```yaml
url: ${DB_URL:jdbc:postgresql://localhost:5432/portfolio_db?sslmode=require}
```

**This means**:
- ✅ All connections are encrypted
- ✅ No additional SSL configuration needed
- ✅ Works automatically with Supabase

---

## Connection Pooling Details

Configured in `application.yml`:
```yaml
hikari:
  maximum-pool-size: 10      # Max 10 concurrent connections
  minimum-idle: 5            # Keep 5 connections ready
  connection-timeout: 20000  # Wait max 20 seconds to get connection
  idle-timeout: 300000       # Close idle connections after 5 min
  max-lifetime: 1200000      # Recycle connections every 20 min
```

These settings are optimized for Supabase and prevent connection timeouts.

---

## Database Schema

The `portfolio_db` name in the local URL should match your Supabase database name.

Supabase default database: `postgres`

For Supabase, use:
```
postgresql://postgres:PASSWORD@HOST:5432/postgres
```

---

## Verify Connection Works

After setting environment variables, test with:
```bash
# Run the backend
cd backend
mvn spring-boot:run
```

If you see:
```
Tomcat started on port 8080
HikariPool-1 - Starting...
```

✅ **Connection successful!**

If you see errors like "FATAL: no pg_hba.conf entry", check:
1. Host is correct
2. Username & password are correct
3. Supabase project is active

---

## Database Initialization

When the app starts with `ddl-auto: update`:
1. It automatically creates tables if they don't exist
2. Updates schema if entities change
3. Does NOT drop existing data

**No manual SQL execution needed!**

---

## Key Differences from MySQL

| Feature | MySQL | PostgreSQL |
|---------|-------|-----------|
| Driver | `com.mysql.cj.jdbc.Driver` | `org.postgresql.Driver` ✅ |
| ID Generation | `AUTO_INCREMENT` | `SERIAL` ✅ |
| Connection URL | `jdbc:mysql://` | `jdbc:postgresql://` ✅ |
| SSL Default | `useSSL=false` | `sslmode=require` ✅ |
| UPDATE timestamp | Supported | Not needed ✅ |

---

## Support Resources

- 📚 Supabase Docs: https://supabase.com/docs/guides/getting-started
- 📚 PostgreSQL JDBC: https://jdbc.postgresql.org/
- 📚 Spring Data JPA: https://spring.io/projects/spring-data-jpa

---

**Status**: ✅ Ready for Supabase deployment
