export async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:8000/api/users');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
