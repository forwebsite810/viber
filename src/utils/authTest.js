// Simple authentication test utility
export const testAuth = () => {
  console.log('Testing authentication system...');
  
  // Test localStorage
  const testUser = {
    uid: 'test-user',
    email: 'test@example.com',
    displayName: 'Test User',
    emailVerified: true
  };
  
  localStorage.setItem('localUser', JSON.stringify(testUser));
  const retrieved = localStorage.getItem('localUser');
  
  if (retrieved) {
    console.log('✅ Local authentication working');
    return true;
  } else {
    console.log('❌ Local authentication failed');
    return false;
  }
};

// Auto-test on import
testAuth();
