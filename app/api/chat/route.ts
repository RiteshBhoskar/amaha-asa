"use server"

import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({})

const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: ""
})

console.log(interaction.output_text)