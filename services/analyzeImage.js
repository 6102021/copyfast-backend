import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function analyzeImage(imageBuffer) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent([
    {
      role: "user",
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBuffer.toString("base64")
          }
        },
        {
          text: `
Analise a imagem do produto e identifique:
- Nome do produto
- Categoria
- Público-alvo
- Tom de voz
`
        }
      ]
    }
  ]);

  return result.response.text();
}
