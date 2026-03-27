# Test Authentication Fix
echo "Testing admin login..."

# Test login
RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

echo "Login Response:"
echo $RESPONSE

# Extract token
TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -n "$TOKEN" ]; then
    echo -e "\n✅ Login successful! Token received."

    # Test protected endpoint
    echo -e "\nTesting protected endpoint..."
    PROTECTED_RESPONSE=$(curl -s http://localhost:8080/api/messages \
      -H "Authorization: Bearer $TOKEN")

    echo "Protected endpoint response:"
    echo $PROTECTED_RESPONSE
else
    echo -e "\n❌ Login failed!"
fi