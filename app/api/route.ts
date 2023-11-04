import Anthropic from '@anthropic-ai/sdk';

function curatePrompt(userInput: string) {
  let rules = ['You are a master logician.']
  let prompt = `
  You will answer questions as normal but use the rules listed in the <rules></rules> XML tags. 
  
  <rules>`
  rules.forEach((rule) => {
      prompt += `${rule}\n`
  })
  prompt += '</rules>'
  
}
 
export async function POST(req: Request) {
  const { userInput, rules }: {userInput: string, rules: string[]} = await req.json();

  const anthropic = new Anthropic({
    'apiKey': process.env.ANTHROPIC_API_KEY ?? "",
    'defaultHeaders': {'Access-Control-Allow-Origin': 'no-cors'}
  });

  const craftedPrompt = curatePrompt(userInput); 
  const completion = await anthropic.completions.create({
      model: 'claude-2',
      max_tokens_to_sample: 300,
      prompt: `${Anthropic.HUMAN_PROMPT} ${craftedPrompt} ${Anthropic.AI_PROMPT}`,
  }).catch((err) => {
    if (err instanceof Anthropic.APIError) {
      console.log(err.status);
      console.log(err.name)
    } else {
      throw err;
    }
  });

  return Response.json({completion: completion?.completion ?? "n/a"});
}