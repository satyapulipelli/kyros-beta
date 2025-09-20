export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, userType, currentSolution, priceRange, features, openFeedback } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Airtable API call
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Survey%20Responses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            Email: email,
            UserType: userType || '',
            CurrentSolution: currentSolution || '',
            PriceRange: priceRange || '',
            Features: features || '',
            OpenFeedback: openFeedback || '',
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
      message: 'Survey response saved successfully',
      id: data.records[0].id 
    });
    
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ 
      error: 'Failed to save survey response',
      details: error.message 
    });
  }
}
