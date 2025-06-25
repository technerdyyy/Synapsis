import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
})

export const summarizeEvent = async (event) => {
  try {
    const eventText = `
      Event: ${event.summary || 'No title'}
      Description: ${event.description || 'No description'}
      Start: ${event.start?.dateTime || event.start?.date || 'No start time'}
      End: ${event.end?.dateTime || event.end?.date || 'No end time'}
      Location: ${event.location || 'No location'}
    `

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes calendar events in 1-2 concise sentences. Focus on the key details and purpose."
        },
        {
          role: "user",
          content: `Please summarize this calendar event: ${eventText}`
        }
      ],
      max_tokens: 100,
      temperature: 0.3
    })

    return response.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error summarizing event:', error)
    return 'Unable to generate summary for this event.'
  }
}