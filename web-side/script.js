const { createApp, ref, computed, onMounted, nextTick } = Vue;

const globalState = {
    id: 0,
    toasts: ref([])
};

function processColorTags(text) {
    if (!text || typeof text !== 'string') return text;
    
    const colorMap = {
        'verde': { start: '#4ccf3e', end: '#6fe05a', glow: 'rgba(76, 207, 62, 0.4)' },
        'verdeescuro': { start: '#2e7d32', end: '#4caf50', glow: 'rgba(46, 125, 50, 0.4)' },
        'verdeclaro': { start: '#86efac', end: '#bbf7d0', glow: 'rgba(134, 239, 172, 0.4)' },
        'lima': { start: '#84cc16', end: '#bef264', glow: 'rgba(132, 204, 22, 0.4)' },
        'vermelho': { start: '#ef4444', end: '#ff6b6b', glow: 'rgba(239, 68, 68, 0.4)' },
        'vermelhoescuro': { start: '#b91c1c', end: '#dc2626', glow: 'rgba(185, 28, 28, 0.4)' },
        'rosaavermelhado': { start: '#e11d48', end: '#fb7185', glow: 'rgba(225, 29, 72, 0.4)' },
        'amarelo': { start: '#f59e0b', end: '#fbbf24', glow: 'rgba(245, 158, 11, 0.4)' },
        'amareloouro': { start: '#fbbf24', end: '#fcd34d', glow: 'rgba(251, 191, 36, 0.4)' },
        'laranja': { start: '#f97316', end: '#fb923c', glow: 'rgba(249, 115, 22, 0.4)' },
        'laranjaescuro': { start: '#c2410c', end: '#ea580c', glow: 'rgba(194, 65, 12, 0.4)' },
        'azul': { start: '#3b82f6', end: '#60a5fa', glow: 'rgba(59, 130, 246, 0.4)' },
        'azulescuro': { start: '#1e40af', end: '#2563eb', glow: 'rgba(30, 64, 175, 0.4)' },
        'azulclaro': { start: '#38bdf8', end: '#7dd3fc', glow: 'rgba(56, 189, 248, 0.4)' },
        'azulceleste': { start: '#0ea5e9', end: '#38bdf8', glow: 'rgba(14, 165, 233, 0.4)' },
        'roxo': { start: '#a855f7', end: '#c084fc', glow: 'rgba(168, 85, 247, 0.4)' },
        'roxoescuro': { start: '#7e22ce', end: '#9333ea', glow: 'rgba(126, 34, 206, 0.4)' },
        'roxoclaro': { start: '#c084fc', end: '#d8b4fe', glow: 'rgba(192, 132, 252, 0.4)' },
        'violeta': { start: '#8b5cf6', end: '#a78bfa', glow: 'rgba(139, 92, 246, 0.4)' },
        'rosa': { start: '#ec4899', end: '#f472b6', glow: 'rgba(236, 72, 153, 0.4)' },
        'rosaescuro': { start: '#be185d', end: '#db2777', glow: 'rgba(190, 24, 93, 0.4)' },
        'rosaclaro': { start: '#f9a8d4', end: '#fbcfe8', glow: 'rgba(249, 168, 212, 0.4)' },
        'magenta': { start: '#d946ef', end: '#e879f9', glow: 'rgba(217, 70, 239, 0.4)' },
        'ciano': { start: '#06b6d4', end: '#22d3ee', glow: 'rgba(6, 182, 212, 0.4)' },
        'cianoescuro': { start: '#0891b2', end: '#0e7490', glow: 'rgba(8, 145, 178, 0.4)' },
        'turquesa': { start: '#14b8a6', end: '#2dd4bf', glow: 'rgba(20, 184, 166, 0.4)' },
        'rgb': { type: 'rgb' },
        'rgbrapido': { type: 'rgb-rapido' },
        'rgbletto': { type: 'rgb-lento' },
        'rgbpastel': { type: 'rgb-pastel' },
        'rgbmetal': { type: 'rgb-metal' },
        'rgbestatica': { type: 'rgb-estatica' }
    };
    
    let processedText = text;
    
    for (const [tag, config] of Object.entries(colorMap)) {
        if (config.type) continue; 
        
        const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'gi');
        processedText = processedText.replace(regex, (match, content) => {
            return `<span style="background: linear-gradient(135deg, ${config.start}, ${config.end}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 800; filter: drop-shadow(0 0 8px ${config.glow});">${content}</span>`;
        });
    }
    
    processedText = processedText.replace(/<rgb>(.*?)<\/rgb>/gi, (match, content) => {
        return `<span style="background: linear-gradient(270deg, #ff0000, #00ff00, #0000ff, #ff00ff, #ffff00, #00ffff, #ff0000); background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rgb-gradient 2s ease infinite; font-weight: 800;">${content}</span>`;
    });
    
    processedText = processedText.replace(/<rgbrapido>(.*?)<\/rgbrapido>/gi, (match, content) => {
        return `<span style="background: linear-gradient(270deg, #ff0000, #00ff00, #0000ff, #ff00ff, #ffff00, #00ffff, #ff0000); background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rgb-gradient 1s linear infinite; font-weight: 800;">${content}</span>`;
    });
    
    processedText = processedText.replace(/<rgbletto>(.*?)<\/rgbletto>/gi, (match, content) => {
        return `<span style="background: linear-gradient(270deg, #ff0000, #00ff00, #0000ff, #ff00ff, #ffff00, #00ffff, #ff0000); background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rgb-gradient 4s linear infinite; font-weight: 800;">${content}</span>`;
    });
    
    processedText = processedText.replace(/<rgbpastel>(.*?)<\/rgbpastel>/gi, (match, content) => {
        return `<span style="background: linear-gradient(270deg, #ffb3ba, #baffc9, #bae1ff, #ffccff, #ffffba, #b5ead7, #ffb3ba); background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rgb-pastel-gradient 3s ease infinite; font-weight: 800;">${content}</span>`;
    });
    
    processedText = processedText.replace(/<rgbmetal>(.*?)<\/rgbmetal>/gi, (match, content) => {
        return `<span style="background: linear-gradient(270deg, #c0c0c0, #ffd700, #c0c0c0, #b87333, #c0c0c0, #e5e4e2, #c0c0c0); background-size: 400% 400%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rgb-metal-gradient 2.5s ease infinite; font-weight: 800;">${content}</span>`;
    });
    
    processedText = processedText.replace(/<rgbestatica>(.*?)<\/rgbestatica>/gi, (match, content) => {
        return `<span style="background: linear-gradient(135deg, #ff0000, #00ff00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 800; filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));">${content}</span>`;
    });
    
    return processedText;
}

const ToastItem = {
    props: ['toast'],
    setup(props) {
        const processedText = computed(() => {
            return processColorTags(props.toast.text);
        });

        return { props, processedText };
    },
    template: `
    <li class="notify-card" :style="{'--theme-color': props.toast.theme.highlight, '--title-color': props.toast.theme.title}">
        <div class="notify-inner">
            
            <div class="icon-wrap">
                <div class="icon-box">
                    <div class="icon-base" :style="{ backgroundColor: props.toast.theme.highlight, maskImage: 'url(icons/' + props.toast.theme.icon + '.png)', webkitMaskImage: 'url(icons/' + props.toast.theme.icon + '.png)' }"></div>
                    
                    <div v-if="props.toast.progress === 'bar'" class="icon-colored" :style="{ backgroundColor: props.toast.theme.highlight, maskImage: 'url(icons/' + props.toast.theme.icon + '.png)', webkitMaskImage: 'url(icons/' + props.toast.theme.icon + '.png)', animationDuration: props.toast.timeout + 'ms' }"></div>
                    
                    <div v-else class="icon-colored-static" :style="{ backgroundColor: props.toast.theme.highlight, maskImage: 'url(icons/' + props.toast.theme.icon + '.png)', webkitMaskImage: 'url(icons/' + props.toast.theme.icon + '.png)' }"></div>
                </div>
            </div>

            <div class="text-box">
                <h1 class="notify-title">
                    {{ props.toast.title }}
                </h1>
                <p class="notify-msg" v-html="processedText"></p>
            </div>
            
        </div>
    </li>
    `
};

const App = {
    components: { ToastItem },
    setup() {
        const toasts = globalState.toasts;
        const positions = computed(() => ({
            middleLeft: toasts.value.filter(t => t.position === 'middle-left'),
            middleRight: toasts.value.filter(t => t.position === 'middle-right'),
        }));

        window.addEventListener("message", (event) => {
            const data = event.data;
            if (data.Action === "Notify") {
                const [title, text, time, themeRaw, pos, prog] = data.Payload || [];
                const theme = themeRaw || {};
                
                const newToast = {
                    id: globalState.id++,
                    title: title,
                    text: text,
                    theme: {
                        highlight: theme.highlight || "#fda84f",
                        icon: theme.icon || "alert",
                        title: theme.title || "#fda84f",
                        text: theme.text || "#FFFFFF"
                    },
                    position: pos || "middle-left",
                    progress: prog || "bar",
                    timeout: (time || 5000) + 50
                };

                globalState.toasts.value.push(newToast);
                setTimeout(() => {
                    const index = globalState.toasts.value.indexOf(newToast);
                    if (index > -1) globalState.toasts.value.splice(index, 1);
                }, newToast.timeout + 100);
            }
        });
        return { positions };
    },
template: `
<div class="w-full h-full pointer-events-none absolute top-0 left-0">
    <transition-group name="list" tag="ul" class="absolute top-1/2 -translate-y-1/2 flex flex-col items-start z-[999]" style="left: -32px; gap: 8px;">
        <ToastItem v-for="t in positions.middleLeft" :key="t.id" :toast="t" />
    </transition-group>
    
    <transition-group name="list" tag="ul" class="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-end z-[999]" style="gap: 8px;">
        <ToastItem v-for="t in positions.middleRight" :key="t.id" :toast="t" />
    </transition-group>
</div>
`
};

createApp(App).mount("#app");