export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // DEBUG: Check if environment variables are loaded
  console.log('AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID);
  console.log('AIRTABLE_API_KEY exists:', !!process.env.AIRTABLE_API_KEY);
  console.log('AIRTABLE_API_KEY first 10 chars:', process.env.AIRTABLE_API_KEY?.substring(0, 10));

  // Test response to check if env vars are working
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    return res.status(500).json({ 
      error: 'Environment variables not set',
      hasApiKey: !!process.env.AIRTABLE_API_KEY,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID
    });
  }
  
  export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Airtable API call
    const tableName = encodeURIComponent('Email Signups');
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            Email: email,
            Created: new Date().toISOString()
          }
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save to Airtable');
    }

    const data = await response.json();
    
    res.status(200).json({ 
      success: true, 
      message: 'Email saved successfully',
      id: data.records[0].id 
    });
    
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ 
      error: 'Failed to save email',
      details: error.message 
    });
  }
}
