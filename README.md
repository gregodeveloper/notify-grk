# 📦 grk_notify - Premium FiveM Notifications

O **grk_notify** é um sistema de notificações de alto desempenho para FiveM, focado em **design minimalista**, **responsividade** e uma experiência de usuário premium. O diferencial deste script é o parser de texto rico, que permite aplicar degradês e efeitos RGB diretamente na mensagem via tags.

---

## ✨ Diferenciais Técnicos

- **Glassmorphism Design:** Interface translúcida com efeitos de desfoque que se adaptam ao ambiente do jogo.
- **Dynamic Icon Masking:** Seus ícones `.png` são coloridos automaticamente via CSS para combinar com o tema da notificação.
- **Icon Fill Progress:** O ícone da notificação funciona como um timer visual, "enchendo" de cor conforme o tempo passa.
- **Rich Text Support:** Sistema exclusivo de tags para aplicar cores e efeitos RGB em partes específicas da mensagem.
- **Responsividade Total:** Construído com unidades `rem` e `vmin`, garantindo que o layout seja idêntico em qualquer resolução (de 1080p a 4K).

---

## 🛠️ Como Utilizar

### Chamada Básica (Client-side)

Para disparar uma notificação, utilize o evento `Notify`:

```lua
TriggerEvent("Notify", "TÍTULO", "Sua mensagem aqui", "tema", 5000, "middle-left", "bar")
Parâmetros:

Parâmetro	Descrição
title	O título da notificação
message	O corpo do texto (aceita tags de cor)
theme	O tema definido no shared.lua (ex: policia, ilegal, verde)
timer	Tempo de exibição em milissegundos
position	Posição na tela (middle-left ou middle-right)
progress	Tipo de progresso (use "bar" para ativar o preenchimento do ícone)
🎨 Sistema de Cores e Degradês
O grk_notify permite estilizar o texto da mensagem usando tags simples diretamente na string.

🌈 Tags de Degradê Estático
Basta envolver o texto com a tag da cor desejada:

Tag	Resultado
<verde>Texto</verde>	Degradê Esmeralda
<azul>Texto</azul>	Degradê Azul Celeste
<vermelho>Texto</vermelho>	Degradê Alerta
<amareloouro>Texto</amareloouro>	Degradê Dourado
✨ Tags de Efeitos Animados (RGB)
Tag	Efeito
<rgb>Texto</rgb>	Ciclo RGB padrão
<rgbrapido>Texto</rgbrapido>	RGB em alta velocidade
<rgbpastel>Texto</rgbpastel>	Transição entre tons pastéis
<rgbmetal>Texto</rgbmetal>	Efeito metálico animado
Exemplo de uso:
lua
TriggerEvent("Notify", "LOJA", "O item <verde>Mochila</verde> está com <rgb>DESCONTO!</rgb>", "default", 7000)
🧪 Comandos de Teste
O script possui comandos para validar o funcionamento e o design:

Comando	Descrição
/testarnotify	Inicia um teste automático de todas as tags de cores e efeitos RGB
/notifytest	Dispara uma sequência de notificações testando todos os temas configurados
📂 Instalação
Certifique-se de que a pasta se chama grk_notify

Adicione ensure grk_notify ao seu server.cfg

Configure seus temas em shared-side/shared.lua

Desenvolvido por: [GrK Development]
Sistemas avançados com foco em performance e design limpo.
