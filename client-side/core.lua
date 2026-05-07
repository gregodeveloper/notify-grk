RegisterNetEvent("Notify")
AddEventHandler("Notify", function(title, message, theme, timer, position, progress)

    if not timer then timer = Config.Timer end
    if not position then position = Config.Position end
    if not progress then progress = "circle" end

    SendNUIMessage({
        Action = "Notify",
        Payload = {
            title,
            message,
            timer,
            Config.Themes[theme],
            position,
            progress
        }
    })
end)

-- Comando para testar todas as cores
RegisterCommand("testarnotify", function()
    local cores = {
        -- Verdes
        { nome = "Verde", tag = "verde" },
        { nome = "Verde Escuro", tag = "verdeescuro" },
        { nome = "Verde Claro", tag = "verdeclaro" },
        { nome = "Lima", tag = "lima" },
        
        -- Vermelhos
        { nome = "Vermelho", tag = "vermelho" },
        { nome = "Vermelho Escuro", tag = "vermelhoescuro" },
        { nome = "Rosa Avermelhado", tag = "rosaavermelhado" },
        
        -- Amarelos/Laranjas
        { nome = "Amarelo", tag = "amarelo" },
        { nome = "Amarelo Ouro", tag = "amareloouro" },
        { nome = "Laranja", tag = "laranja" },
        { nome = "Laranja Escuro", tag = "laranjaescuro" },
        
        -- Azuis
        { nome = "Azul", tag = "azul" },
        { nome = "Azul Escuro", tag = "azulescuro" },
        { nome = "Azul Claro", tag = "azulclaro" },
        { nome = "Azul Celeste", tag = "azulceleste" },
        
        -- Roxos
        { nome = "Roxo", tag = "roxo" },
        { nome = "Roxo Escuro", tag = "roxoescuro" },
        { nome = "Roxo Claro", tag = "roxoclaro" },
        { nome = "Violeta", tag = "violeta" },
        
        -- Rosas
        { nome = "Rosa", tag = "rosa" },
        { nome = "Rosa Escuro", tag = "rosaescuro" },
        { nome = "Rosa Claro", tag = "rosaclaro" },
        { nome = "Magenta", tag = "magenta" },
        
        -- Ciano
        { nome = "Ciano", tag = "ciano" },
        { nome = "Ciano Escuro", tag = "cianoescuro" },
        { nome = "Turquesa", tag = "turquesa" }
    }
    
    local especiais = {
        { nome = "RGB Normal", tag = "rgb" },
        { nome = "RGB Rápido", tag = "rgbrapido" },
        { nome = "RGB Lento", tag = "rgbletto" },
        { nome = "RGB Pastel", tag = "rgbpastel" },
        { nome = "RGB Metal", tag = "rgbmetal" },
        { nome = "RGB Estática", tag = "rgbestatica" }
    }
    
    -- Teste de cores normais em sequência
    TriggerEvent("Notify", "🧪 TESTE DE CORES", "Iniciando teste de <verde>todas as cores</verde>...", "default", 2000)
    
    Citizen.Wait(2500)
    
    -- Testa cores normais (agrupadas)
    for i = 1, #cores, 4 do
        local msg = ""
        for j = i, math.min(i+3, #cores) do
            local c = cores[j]
            msg = msg .. string.format("<%s>■</%s> <b>%s</b> - tag: <b><%s></%s></b>\n", 
                c.tag, c.tag, c.nome, c.tag, c.tag)
        end
        
        TriggerEvent("Notify", "🎨 CORES NORMAIS", msg, "default", 6000)
        Citizen.Wait(6500)
    end
    
    -- Testa cores especiais RGB
    local msgRGB = ""
    for i, e in ipairs(especiais) do
        msgRGB = msgRGB .. string.format("<%s>■ RGB %s</%s> - tag: <b><%s></%s></b>\n", 
            e.tag, e.nome, e.tag, e.tag, e.tag)
    end
    
    TriggerEvent("Notify", "✨ CORES ESPECIAIS", msgRGB, "default", 8000)
    
    Citizen.Wait(8500)
    
    -- Teste combinado
    TriggerEvent("Notify", "🎯 TESTE COMBINADO", 
        "Normal: texto normal\n" ..
        "<verde>Verde</verde> + <azul>Azul</azul> + <vermelho>Vermelho</vermelho>\n" ..
        "<roxo>Roxo</roxo> + <rosa>Rosa</rosa> + <ciano>Ciano</ciano>\n" ..
        "<rgb>RGB Animado</rgb> + <rgbestatica>RGB Estático</rgbestatica>", 
        "default", 7000)
    
    Citizen.Wait(7500)
    
    -- Finalização
    TriggerEvent("Notify", "✅ TESTE CONCLUÍDO", "Todas as cores foram testadas com sucesso! Use as tags no formato: <b><tag>texto</tag></b>", "verde", 5000)
    
end, false)

-- Comando para testar temas
RegisterCommand("notifytest", function()
    local themes = { "periferia", "policia", "ilegal", "mechanic", "verde", "vermelho", "amarelo" }
    
    local tempo = 4000
    local posicao = "middle-left"

    CreateThread(function()
        for _, theme in ipairs(themes) do
            if Config.Themes[theme] then
                local title = string.upper(theme)
                local message = "Notificação de teste estilo: " .. theme
                
                if theme == "periferia" then
                    title = "GRK INFORMA"
                    message = "Ocorreu uma movimentação suspeita na área sul."
                end

                TriggerEvent("Notify", title, message, theme, tempo, posicao, "bar")
                Wait(2000)
            end
        end
    end)
end)