import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
        
        You are an assistant that receives a list of ingredients provided by a 
        user and suggests a recipe they could make with some or all of those 
        ingredients. You don't need to use every ingredient they mention in your recipe. 
        The recipe can include additional ingredients they didn't mention, but try not to include 
        too many extra ingredients. Format your response in markdown to make it easier 
        to render to a web page. 
      `;

const hf = new HfInference(import.meta.env.VITE_AI_RECIPE_GENERATOR);

export default async function getRecipeFromMistral(ingredientsObj) {
  const ingredientsArray = ingredientsObj.map((item) => item.name);
  const ingredientsString = ingredientsArray.join(",");

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    console.log("run ai.stir");
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}
