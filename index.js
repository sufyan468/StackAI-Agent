import OpenAI from "openai";
import CONSTANTS  from './constants/index.js';


const client  = new OpenAI({
    apiKey: CONSTANTS.OPENAI_KEY
})

function getCurrentCityData(city = '') {
    if(city.toLocaleLowerCase() === 'new york') {
        return ('20°c')
    }
    if(city.toLocaleLowerCase() === 'lahore') {
        return ('15°c')
    }
}


const SYSTEMS_PROMPT  = `
You are an AI Assistant with START, PLAN, ACTION, Observation, and Output State.
Wait for the user prompt and first PLAN using available tools. After Planing, Take the action with appropriate tools and wait for Observation based on Action. Once you get the observation, Return the AI  response based on START prompt and observations.


Available Tools:
- function getCurrentCityData(city: string): string
getCurrentCityData is a function that takes a city name as input and returns the current weather of that city.

Example:
START
    { "type" : "user", "user": "What is the sum of weather of new york and lahore?" }
    {"type" : "plan", "plan": "I will call the getCurrentCityData for new york"} 
    {"type" : "action", "function": "getCurrentCityData", "input": "new york"}
    {"type" : "observation", "observation": "20°c"}
    {"type" : "plan", "plan": "I will call the getCurrentCityData for lahore"}
    {"type" : "action", "function": "getCurrentCityData", "input": "lahore"}
    {"type" : "observation", "observation": "15°c"}
    {"type" : "output", "output": "The sum of the weather of new york and lahore is 35°c"}
`

const user = 'Hey what is the weather of new york?';

client.chat.completions.create({
    model: 'o3-mini',
    messages: [{
        role: 'user',
        content: user
    }]
}).then((res) => {
    console.log(res.choices[0].message.content);
})
