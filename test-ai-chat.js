// Test script for AI Chat API
// Run with: node test-ai-chat.js

const fetch = require('node-fetch');

async function testAIChat() {
  console.log('🧪 Testing AI Chat API...\n');

  const testMessages = [
    { message: 'What are your shipping options?', language: 'en' },
    { message: 'Quelle est votre politique de retour?', language: 'fr' },
    { message: 'ما هي سياسة الإرجاع الخاصة بك؟', language: 'ar' },
    { message: 'Do you have size guides?', language: 'en' },
    { message: 'Hello, I need help with my order', language: 'en' }
  ];

  for (const test of testMessages) {
    try {
      console.log(`📤 Testing: "${test.message}" (${test.language.toUpperCase()})`);

      const response = await fetch('http://localhost:3000/api/chat/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: test.message,
          language: test.language,
          context: 'fashion_ecommerce'
        })
      });

      if (!response.ok) {
        console.log(`❌ HTTP Error: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      console.log(`✅ Response: "${data.response}"\n`);

    } catch (error) {
      console.log(`❌ Network Error: ${error.message}\n`);
    }

    // Wait 1 second between requests to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('🎉 Test completed!');
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    if (response.ok) {
      console.log('✅ Server is running on http://localhost:3000');
      return true;
    }
  } catch (error) {
    console.log('❌ Server is not running. Please start with: npm run dev');
    return false;
  }
}

// Run tests
async function runTests() {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    process.exit(1);
  }

  await testAIChat();
}

runTests().catch(console.error);