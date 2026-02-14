export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, contact, message } = req.body;

        if (!name || !contact || !message) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

        if (!webhookUrl) {
            return res.status(500).json({ message: 'Erro de configuração no servidor.' });
        }

        const payload = {
            username: "Joca Contact",
            avatar_url: "https://w0.peakpx.com/wallpaper/128/836/HD-wallpaper-meliodas-da-dragao-ira-nanatsu-no-pecado-taizai.jpg",
            embeds: [
                {
                    title: "🔔 Novo Contato (WebSite)",
                    color: 3092790,
                    fields: [
                        { name: "👤 Nome", value: name, inline: true },
                        { name: "📱 Contato", value: contact, inline: true },
                        { name: "📄 Mensagem", value: message }
                    ],
                    footer: { text: "Enviado via API Segura" },
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
            return res.status(200).json({ message: 'Sucesso!' });
        } else {
            return res.status(500).json({ message: 'Erro ao contatar Discord.' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}