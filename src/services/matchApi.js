const API_URL =
  'https://script.google.com/macros/s/AKfycbxebPLujmwxQmB-mb-ybZN2c1yMhhv4fHygWTcbqps-V3QOsMj8d8DrXbCslFFGawIBwA/exec';

/**
 * Submits match data to the API
 * @param {Object} matchData - The transformed match data ready for submission
 * @returns {Promise} - Result of the API call
 */
export const submitMatchToStatsServer = async (matchData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(matchData),
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message || 'Failed to submit match');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
