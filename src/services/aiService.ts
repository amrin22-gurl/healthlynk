
import { GOOGLE_API_KEY, GOOGLE_API_URL } from "@/config/api-config";

export const fetchAIResponse = async (userInput: string, detectedCondition: string | null) => {
  try {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a helpful healthcare assistant who provides information about health concerns. 
                     The user message is: ${userInput}. ${detectedCondition ? `I've detected they might be talking about: ${detectedCondition}` : ''}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    };
    
    console.log("Sending request to Gemini API:", GOOGLE_API_URL);
    
    const response = await fetch(`${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error details:", errorData);
      throw new Error(`API request failed with status ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("Gemini API response:", data);
    
    let responseText = "I'm having trouble processing your request right now.";
    
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      responseText = data.candidates[0].content.parts[0].text || responseText;
    }
    
    return responseText;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    
    // Return a more helpful message when API calls fail
    return "I apologize, but I'm having some technical difficulties connecting to my knowledge base. Please try again in a moment, or check your internet connection.";
  }
};
