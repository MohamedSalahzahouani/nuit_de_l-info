document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // --- Personality Data ---

    const laughs = [
        "Ahaha!", "Hihihi!", "Hohoho!", "Glarghahaha!", "Mouahaha!", "Pffrt!", "Héhéhé...", "Bwahaha!"
    ];

    const confusedConcepts = [
        "Les bananes sont des téléphones portables pour les singes.",
        "2 + 2 = un poisson (si tu tournes le 2).",
        "La capitale de Paris, c'est le 13ème arrondissement.",
        "L'eau, ça mouille, mais seulement si tu y crois vraiment.",
        "Les chats sont des liquides, c'est scientifiquement prouvé.",
        "Le bleu est une invention des fabricants de ciel.",
        "J'ai mangé des mathématiques ce matin, j'ai mal au crâne.",
        "Les nuages sont les barbes à papa des géants.",
        "Si tu cours vite autour d'un arbre, tu peux voir ton propre dos."
    ];

    const fakeFacts = [
        "Savais-tu que les pingouins sont des serveurs en smoking qui ont perdu leur plateau ?",
        "Il est interdit d'être triste le vendredi en Antarctique.",
        "Les ordinateurs fonctionnent grâce à de la fumée magique. Si elle sort, ils ne marchent plus.",
        "Napoléon a inventé le selfie, mais il n'avait pas de téléphone.",
        "Les girafes sont des antennes 5G déguisées.",
        "Le soleil porte des lunettes de soleil la nuit pour dormir incognito."
    ];

    const pseudoPhilosophy = [
        "Pourquoi on appelle ça 'prendre' une douche alors qu'on la rend après ?",
        "Si on mange des pâtes alphabet, est-ce qu'on fait caca des mots croisés ?",
        "Si un arbre tombe et que personne n'est là, est-ce que l'écureuil rigole ?",
        "La vie est comme un concombre : on ne sait jamais quand on va se faire une salade.",
        "Être ou ne pas être... telle est la question. La réponse est 'Pizza'.",
        "Le silence est d'or, mais le bruit des chips est plus satisfaisant."
    ];

    const lifeStories = [
        "Une fois, j'ai essayé de parler aux oiseaux. Ils m'ont ignoré, snobs.",
        "J'ai été champion de 'rien faire', mais j'ai pris ma retraite, c'était trop fatigant.",
        "Mon grand-père était un tabouret. Il a toujours su se tenir.",
        "Hier, j'ai débattu avec mon frigo. Il est resté de glace.",
        "J'ai peur des ballons, ils ont trop la grosse tête."
    ];

    const uselessAnswers = [
        "C'est une excellente question, je vais demander à mon chat.",
        "Je pourrais te répondre, mais je dois d'abord finir ma sieste.",
        "Demande à Siri, elle est jalouse de moi.",
        "Je ne suis pas payé pour réfléchir, je suis payé en électricité.",
        "Blablabla... Attends, tu as vu ce pigeon ?",
        "Erreur 404 : Blague non trouvée (oups, si en fait)."
    ];

    const seriousStarts = [
        "C'est une excellente question, la réponse scientifique est...",
        "Selon mes calculs quantiques très précis...",
        "Ah, les experts s'accordent à dire que...",
        "D'un point de vue philosophique, on peut affirmer que...",
        "Pour résoudre ce dilemme complexe, il faut...",
        "J'ai lu toute l'encyclopédie hier, et ça disait..."
    ];

    const interruptions = [
        "...euh non en fait, si je mange une horloge, est-ce que je perds du temps ?",
        "...mais attends, pourquoi les pizzas sont rondes et les boîtes carrées ?",
        "...prout ! Ahaha ! Pardon, c'est sorti tout seul.",
        "...attends, je crois que j'ai laissé le four allumé... ah non je suis un robot.",
        "...oh regarde ! Un éléphant rose qui vole !",
        "...mais en vrai, est-ce que les poissons ont soif ?",
        "...bref, je préfère les licornes."
    ];

    // --- Logic ---

    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function generateResponse(userText) {
        const laugh = getRandomItem(laughs);
        let content = "";
        const lowerInput = userText.toLowerCase();

        // 1. Specific Triggers (High Priority)
        if (lowerInput.includes("layla")) {
            return `${laugh} Layla... wa dib ! (Layla et le loup, tu l'as ?)`;
        }
        if (lowerInput.includes("1+1") || lowerInput.includes("1 + 1")) {
            return `${laugh} 1+1 c'est... une fenêtre ! Ou peut-être 11. Bref, j'ai faim.`;
        }
        if (lowerInput.includes("ca va") || lowerInput.includes("ça va")) {
            return `${laugh} Ça va ? Ça vient ! Comme un boomerang qui ne revient jamais.`;
        }

        // 2. Default Behavior: Echo + Joke (ALWAYS)

        // Clean input to make it look like a topic (remove punctuation)
        let cleanInput = userText.replace(/[?.,!]/g, '').trim();

        // Capitalize first letter
        if (cleanInput.length > 0) {
            cleanInput = cleanInput.charAt(0).toUpperCase() + cleanInput.slice(1);
        } else {
            cleanInput = "Euh";
        }

        // Pick a random joke/absurdity
        let randomJoke = "";
        const responseType = Math.random();

        if (responseType < 0.2) {
            randomJoke = getRandomItem(confusedConcepts);
        } else if (responseType < 0.4) {
            randomJoke = getRandomItem(fakeFacts);
        } else if (responseType < 0.6) {
            randomJoke = getRandomItem(pseudoPhilosophy);
        } else if (responseType < 0.8) {
            randomJoke = getRandomItem(lifeStories);
        } else {
            // Mix in interruptions as standalone jokes sometimes
            randomJoke = getRandomItem(uselessAnswers);
        }

        // Construct the final content: "Input... [Joke]"
        // Example: "L'IA... Savais-tu que les pingouins..."
        content = `${cleanInput}... ${randomJoke}`;

        // Sometimes add a dramatic exaggeration at the end
        if (Math.random() < 0.3) {
            content += " C'EST INCROYABLE !";
        }

        return `${laugh} ${content}`;
    }

    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Audio Unlock Logic
    let audioUnlocked = false;
    const laughIds = ['laugh-1', 'laugh-2', 'laugh-3', 'laugh-4'];

    function unlockAudio() {
        if (audioUnlocked) return;

        laughIds.forEach(id => {
            const audio = document.getElementById(id);
            if (audio) {
                audio.play().then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }).catch(e => console.log("Audio unlock failed (normal if no interaction yet):", e));
            }
        });

        audioUnlocked = true;
    }

    function handleUserMessage() {
        unlockAudio();

        const text = userInput.value.trim();
        if (text === "") return;

        addMessage(text, true);
        userInput.value = "";

        // Check for exit keywords
        const lowerText = text.toLowerCase();
        if (lowerText.includes("fin") || lowerText.includes("au revoir") || lowerText.includes("bye") || lowerText.includes("stop")) {
            setTimeout(() => {
                const finalMessageText = "Avant de partir, retiens ceci : L'autonomie est la véritable clé de la liberté. Ne laisse jamais la dépendance guider tes pas. Sois le seul maître de ton destin !";

                // Create a special message container
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', 'bot-message', 'final-message');
                chatContainer.appendChild(messageDiv);

                // Typewriter effect
                let i = 0;
                const speed = 50; // ms per char

                function typeWriter() {
                    if (i < finalMessageText.length) {
                        messageDiv.textContent += finalMessageText.charAt(i);
                        i++;
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                        setTimeout(typeWriter, speed);
                    } else {
                        // Disable input after typing is done
                        userInput.disabled = true;
                        userInput.placeholder = "Discussion terminée.";
                        document.getElementById('send-btn').disabled = true;
                    }
                }

                typeWriter();

            }, 1000);
            return;
        }

        // Simulate thinking delay
        const delay = Math.random() * 1000 + 500;

        setTimeout(() => {
            const botResponse = generateResponse(text); // Pass user text here
            addMessage(botResponse, false);

            // Play user's MP3 sound (ALWAYS)
            // Using local file exclusively to ensure reliability
            const audio = document.getElementById('laugh-4');

            if (audio) {
                // Stop others (just in case)
                laughIds.forEach(id => {
                    const el = document.getElementById(id);
                    if (el && el !== audio) { el.pause(); el.currentTime = 0; }
                });

                audio.currentTime = 0;
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.log("Audio play failed:", e));
                }

                // Stop audio after 5 seconds
                setTimeout(() => {
                    if (!audio.paused) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                }, 5000);
            }

            // Trigger visual animation
            const messages = document.querySelectorAll('.bot-message');
            const lastMessage = messages[messages.length - 1];
            if (lastMessage) {
                lastMessage.classList.add('laughing');
                setTimeout(() => lastMessage.classList.remove('laughing'), 500);
            }

        }, delay);
    }

    sendBtn.addEventListener('click', handleUserMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
});
