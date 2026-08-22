//array of random romantic content
const thoughts = [
    { text: 'Me when???', prompt: "A cozy couple cuddling" },
    { text: 'Me when???', prompt: "A couple hugging" },
    { text: 'A warm hug can cure anything. 🤗', prompt: "A warm hug can cure anything" },
    { text: 'Just a simple gesture, but it means the world. 💕', prompt: "A couple holding hands while walking" },
    { text: 'Coffee in one hand, your heart in the other. ☕️❤️', prompt: "A couple sharing a coffee date" },
    { text: 'Forever isn’t long enough when I’m with you. ♾️💕', prompt: "A couple looking at the sunset" },
    { text: 'In your eyes, I found my home. 💖', prompt: "A couple sharing a romantic gaze" },
    { text: 'With you, every moment is a treasure. 💎❤️', prompt: "A couple embracing on a beach" },
    { text: 'You are my favorite notification. 🔔❤️', prompt: "A couple in a cozy living room" },
    { text: 'Finding magic in the little things we do together. ✨💕', prompt: "A couple cooking together" },
    { text: 'Life is better when we’re side by side. 💑❤️', prompt: "A couple walking in a park" },
    { text: 'My favorite place is wherever I’m with you. 🏞️❤️', prompt: "A couple picnicking" },
    { text: 'Every beat of my heart whispers your name. 💓💬', prompt: "A couple dancing slowly" },
    { text: 'You make even the ordinary moments feel extraordinary. 💫💖', prompt: "A couple reading books together" },
    { text: 'Lost in your love, and I never want to be found. 💘🌌', prompt: "A couple stargazing" },
]

export default function RandomThought() {
    const random = Math.floor(Math.random() * thoughts.length);
    return thoughts[random];
}