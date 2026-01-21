import express from "express";
import cors from "cors";
import multer from "multer";
import analyzeImage from "./services/analyzeImage.js";
import generateCopy from "./services/generateCopy.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post("/api/generate", upload.single("image"), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;

    const productData = await analyzeImage(imageBuffer);
    const copy = await generateCopy(productData);

    res.json({ copy });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar descrição" });
  }
});

app.listen(process.env.PORT || 3333, () => {
  console.log("Servidor rodando");
});
