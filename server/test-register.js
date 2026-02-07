const axios = require('axios');

async function testRegistration() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
  }
}

testRegistration();