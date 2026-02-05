
import { GoogleGenAI } from "@google/genai";

// Veilige check voor API key in browser omgeving
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

export const getProductInsight = async (productName: string, description: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return "Dit product is momenteel erg populair! Een uitstekende keuze voor kwaliteit en stijl.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Schrijf een korte, verleidelijke 'waarom je dit nodig hebt' sectie voor het volgende product: "${productName}". Beschrijving: "${description}". Houd het onder de 100 woorden en gebruik een enthousiaste toon.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "Perfect voor jouw dagelijks gebruik.";
  } catch (error) {
    console.warn("Gemini API Error:", error);
    return "Een van onze best beoordeelde producten! Klanten waarderen vooral het gebruiksgemak.";
  }
};
