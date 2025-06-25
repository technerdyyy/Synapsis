export const summarizeEvent = async (event) => {
  try {
    const eventText = `
      Event: ${event.summary || 'No title'}
      Description: ${event.description || 'No description'}
      Start: ${event.start?.dateTime || event.start?.date || 'No start time'}
      End: ${event.end?.dateTime || event.end?.date || 'No end time'}
      Location: ${event.location || 'No location'}
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "calendar-summarizer"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
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
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error("Error summarizing event:", error);
    return "Unable to generate summary for this event.";
  }
};
