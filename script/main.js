document.addEventListener("DOMContentLoaded", function() {
    
    const API_URL = "/api/contact"; 

    const form = document.getElementById('discord-form');
    const statusMsg = document.getElementById('status-message');

    if(form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const contact = document.getElementById('contact_info').value;
            const message = document.getElementById('message').value;
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "ENVIANDO...";
            btn.disabled = true;
            btn.style.opacity = "0.7";
            statusMsg.innerText = "";

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, contact, message })
                });

                if (response.ok) {
                    statusMsg.style.color = "#ffffff";
                    statusMsg.innerText = "✓ Mensagem enviada com sucesso!";
                    form.reset();
                } else {
                    throw new Error('Erro na resposta da API');
                }
            } catch (error) {
                statusMsg.style.color = "#ff4444";
                statusMsg.innerText = "Erro ao enviar. Tente novamente.";
                console.error("Erro:", error);
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = "1";
                
                setTimeout(() => { 
                    if(statusMsg.style.color === "rgb(255, 255, 255)") statusMsg.innerText = ""; 
                }, 5000);
            }
        });
    }
});