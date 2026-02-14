export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, contact, message } = req.body;

        if (!name || !contact || !message) {
            return res.status(400).json({ message: 'All fields are required..' });
        }

        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

        if (!webhookUrl) {
            return res.status(500).json({ message: 'Server configuration error..' });
        }

        const payload = {
            username: "Joca Contact",
            avatar_url: "https://w0.peakpx.com/wallpaper/128/836/HD-wallpaper-meliodas-da-dragao-ira-nanatsu-no-pecado-taizai.jpg",
            embeds: [
                {
                    title: "🔔 New Contact (WebSite)",
                    color: 3092790,
                    fields: [
                        { name: "👤 Name", value: name, inline: true },
                        { name: "📱 Contact", value: contact, inline: true },
                        { name: "📄 Message", value: message }
                    ],
                    footer: { text: "Send By Portfolio" },
                    timestamp: new Date().toISOString()
                }
            ]
        };

        const discordResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (discordResponse.ok) {
            return res.status(200).json({ message: 'Success!' });
        } else {
            return res.status(500).json({ message: 'Wrong to contact the Discord.' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }

}
