import React, { useRef, useState, useMemo, useCallback } from "react";
import html2canvas from "html2canvas";

// Provided card data - as a raw string
const CARD_DATA_RAW = `
5154620020605778|10|2029|262 
5154620020060883|12|2028|262 
5154620020230379|08|2027|618 
5154620020764641|09|2030|032 
5154620020087852|10|2029|215 
5154620020128649|08|2030|072 
5154620020526750|10|2028|647 
5154620020710875|08|2028|711 
5154620020414486|05|2030|023 
5154620020113708|08|2029|014 
5154620020480503|03|2030|853 
5154620020462345|02|2027|233 
5154620020807044|02|2028|016 
5154620020262505|05|2029|232 
5154620020753065|01|2028|743 
5154620020773717|04|2029|284 
5154620020131262|04|2029|061 
5154620020608707|05|2030|208 
5154620020423156|01|2027|412 
5154620020014153|03|2027|640 
5154620020506810|09|2027|516 
5154620020828065|03|2030|881 
5154620020520571|01|2028|080 
5154620020734735|01|2028|367 
5154620020405849|08|2030|436 
5154620020215404|02|2030|528 
5154620020223127|05|2027|560 
5154620020074165|01|2030|867 
5154620020468060|10|2028|331 
5154620020615371|01|2027|763 
5154620020560460|06|2028|843 
5154620020370480|03|2027|571 
5154620020782213|08|2030|054 
5154620020384143|10|2027|524 
5154620020284020|10|2030|810 
5154620020283741|07|2027|207 
5154620020510226|09|2029|124 
5154620020583058|07|2030|335 
5154620020003735|12|2029|765 
5154620020704514|02|2030|003 
5154620020773014|06|2029|255 
5154620020113476|02|2030|105 
5154620020035588|02|2027|201 
5154620020365720|02|2029|110 
5154620020832554|02|2027|530 
5154620020573547|11|2029|510 
5154620020287338|05|2027|374 
5154620020545636|05|2030|248 
5154620020606719|09|2027|886 
5154620020818116|12|2029|272 
5154620020842280|05|2029|735 
5154620020277701|07|2029|626 
5154620020278642|08|2029|423 
5154620020543763|06|2029|057 
5154620020480404|03|2027|326 
5154620020165336|12|2030|424 
5154620020077713|06|2029|043 
5154620020840565|11|2027|582 
5154620020344683|06|2029|265 
5154620020286140|07|2027|488 
5154620020007561|05|2030|075 
5154620020882369|09|2028|858 
5154620020041479|04|2028|304 
5154620020841431|08|2027|615 
5154620020504369|06|2030|114 
5154620020756852|06|2030|046 
5154620020734529|12|2030|116 
5154620020655815|10|2028|635 
5154620020137533|09|2027|640 
5154620020062541|02|2029|874 
5154620020750335|02|2027|672 
5154620020762249|02|2028|845 
5154620020807325|03|2030|658 
5154620020083265|03|2027|041 
5154620020754329|06|2028|805 
5154620020776322|09|2030|735 
5154620020115661|09|2028|148 
5154620020105381|08|2029|125 
5154620020823744|07|2030|210 
5154620020648174|05|2027|377 
5154620020120844|04|2030|452 
5154620020760102|02|2028|876 
5154620020213235|07|2029|217 
5154620020650428|06|2029|216 
5154620020760151|07|2028|777 
5154620020350706|01|2029|574 
5154620020637888|02|2027|582 
5154620020417679|11|2028|601 
5154620020707038|02|2030|281 
5154620020124069|11|2027|655 
5154620020651087|07|2029|846 
5154620020717250|11|2030|734 
5154620020255830|08|2028|787 
5154620020846109|09|2030|587 
5154620020100036|04|2029|042 
5154620020370134|04|2027|166 
5154620020828826|09|2029|118 
5154620020456255|07|2028|320 
5154620020184659|04|2029|553 
5154620020746580|08|2030|830 
5154620020600308|07|2028|888 
5154620020410856|05|2028|174 
5154620020601488|03|2027|032 
5154620020130157|08|2027|137 
5154620020865281|06|2030|427 
5154620020542369|07|2030|285 
5154620020361430|01|2028|840 
5154620020741235|02|2027|136 
5154620020105241|12|2030|335 
5154620020416739|10|2030|140 
5154620020427207|05|2027|801 
5154620020044523|04|2028|145 
5154620020534184|05|2028|721 
5154620020461685|02|2029|378 
5154620020806160|03|2029|813 
5154620020528517|02|2030|582 
5154620020815666|09|2029|585 
5154620020642847|05|2027|351 
5154620020628325|03|2027|654 
5154620020617773|12|2029|684 
5154620020416770|12|2030|557 
5154620020310502|09|2028|427 
5154620020481808|02|2028|318 
5154620020714356|04|2029|542 
5154620020173652|11|2028|153 
5154620020428726|06|2028|260 
5154620020768774|12|2027|764 
5154620020478200|01|2029|550 
5154620020872683|11|2030|722 
5154620020253710|07|2028|232 
5154620020552541|09|2029|838 
5154620020054415|06|2030|423 
5154620020067029|07|2028|402 
5154620020601405|08|2028|642 
5154620020617237|04|2030|065 
5154620020086318|07|2030|653 
5154620020414882|05|2027|315 
5154620020730014|08|2030|484 
5154620020076525|02|2030|468 
5154620020330377|04|2030|810 
5154620020663561|02|2029|808 
5154620020600118|05|2027|481 
5154620020871875|06|2028|785 
5154620020722540|05|2028|054 
5154620020323158|04|2028|217 
5154620020072235|07|2027|846 
5154620020446579|07|2030|561 
`;

const CARDHOLDER_NAMES = ["Nadim Islam", "Mushfiqur Rahman", "Piyash"];

// This function now expects an array of strings (lines)
const generateCardList = (dataLines) => {
  const themesList = ["Vibrant", "Midnight", "Glass", "Sunset"];
  return dataLines.map((line, index) => {
    if (!line || line.trim() === '') return null; 
    const [number, month, year, cvv] = line.split('|').map(s => s.trim());
    const shortYear = year.slice(-2);
    return {
      number: number,
      expiry: `${month.padStart(2, '0')}/${shortYear}`,
      cvv: cvv,
      theme: themesList[index % themesList.length], 
    };
  }).filter(Boolean);
};

const getInitialCardState = (cardList) => {
  const initialIndex = Math.floor(Math.random() * cardList.length);
  return {
    ...cardList[initialIndex],
    name: CARDHOLDER_NAMES[initialIndex % CARDHOLDER_NAMES.length],
    currentIndex: initialIndex
  };
};

export default function App() {
  const cardDataLines = useMemo(() => 
    CARD_DATA_RAW.split('\\n').filter(line => line.trim() !== '')
  , []);
  const cardList = useMemo(() => generateCardList(cardDataLines), [cardDataLines]);
  const [card, setCard] = useState(() => getInitialCardState(cardList));
  const [animationKey, setAnimationKey] = useState(0); 
  const cardRef = useRef(null);

  const { name, number, expiry, cvv, theme, currentIndex } = card;

  const themes = {
    Vibrant: { card: "text-white bg-gradient-to-br from-indigo-600 to-pink-500 shadow-indigo-500/50", accentOpacity: "opacity-80", chipCvvBg: "bg-white/20 text-white" },
    Midnight: { card: "text-white bg-gradient-to-br from-slate-900 to-gray-700 shadow-slate-900/50", accentOpacity: "opacity-70", chipCvvBg: "bg-white/20 text-white" },
    Glass: { card: "text-slate-900 bg-white/30 backdrop-blur-md border border-white/40 shadow-xl shadow-slate-300/50", accentOpacity: "opacity-60", chipCvvBg: "bg-white/50 text-slate-800" },
    Sunset: { card: "text-white bg-gradient-to-tr from-orange-500 to-red-600 shadow-red-500/50", accentOpacity: "opacity-80", chipCvvBg: "bg-white/30 text-white" },
  };
  const t = themes[theme];

  const formatNumberForDisplay = (val) =>
    (val || "").replace(/[^0-9]/g, "").slice(0, 16).replace(/(\\d{4})/g, "$1 ").trim();

  const generateNewCard = useCallback(() => {
    if (cardList.length === 0) return;
    let randomIndex;
    do { randomIndex = Math.floor(Math.random() * cardList.length); }
    while (randomIndex === currentIndex && cardList.length > 1);
    const randomNameIndex = Math.floor(Math.random() * CARDHOLDER_NAMES.length);
    setCard({ ...cardList[randomIndex], name: CARDHOLDER_NAMES[randomNameIndex], currentIndex: randomIndex });
    setAnimationKey(prev => prev + 1);
  }, [cardList, currentIndex]);

  const downloadPNG = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    const safeName = (name || 'virtual-card').replace(/\\s+/g, "-").toLowerCase();
    a.download = `virtual-card-${safeName}-${(currentIndex+1)}-${(theme||'theme').toLowerCase()}.png`;
    a.href = dataUrl;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-1 text-indigo-700">✨ Virtual Card Generator</h2>
          <p className="text-sm text-slate-500 mb-6">Click <b>Generate</b> to create a new design from the list.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Cardholder Name</label>
              <input value={name} readOnly className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-800 font-semibold" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Card Number</label>
              <input value={formatNumberForDisplay(number)} readOnly className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-xl bg-slate-50 text-slate-800" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Expiry</label>
                <input value={expiry} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">CVV</label>
                <input value={cvv} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Template</label>
                <input value={theme} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-800 font-medium" />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={generateNewCard} className="inline-flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-150">
                Generate New Card
              </button>
              <button onClick={downloadPNG} className="inline-flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-150">
                Export PNG
              </button>
            </div>

            <p className="text-xs text-center text-slate-400 mt-4">Cards: {cardList.length} | Theme: {theme}</p>
          </div>
        </div>

        <div className="p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold mb-4 text-slate-700">Generated Card Preview 🚀</h3>

          <div key={animationKey} ref={cardRef} className={"w-[360px] h-[220px] rounded-2xl p-6 relative overflow-hidden transform-gpu transition-all duration-500 shadow-2xl " + t.card}>
            <div className={"absolute inset-0 flex items-center justify-center text-center rotate-[-15deg] " + (t.chipCvvBg.includes("text-white") ? "text-white/10" : "text-slate-900/10")}>
              <span className="text-4xl font-extrabold uppercase tracking-widest pointer-events-none">Nadim Islam - Digital</span>
            </div>

            <div className="flex justify-between items-start z-10 relative">
              <div className="flex items-center gap-3"><div className={"w-10 h-10 rounded-full bg-white/20 shadow-inner " + t.accentOpacity}></div></div>
              <div className="flex items-center gap-3"><div className="text-sm opacity-90 font-bold uppercase tracking-widest">Virtual</div></div>
            </div>

            <div className="mt-8 z-10 relative">
              <div className="text-2xl tracking-wider font-mono drop-shadow-md">{formatNumberForDisplay(number) || "#### #### #### ####"}</div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
              <div><div className="text-xs uppercase opacity-80 drop-shadow-sm">Cardholder</div><div className="font-bold text-lg drop-shadow-sm">{name || "Your Name"}</div></div>
              <div className="text-right"><div className="text-xs uppercase opacity-80 drop-shadow-sm">Valid Thru</div><div className="font-bold text-lg drop-shadow-sm">{expiry || "MM/YY"}</div></div>
            </div>

            <div className={"absolute top-6 right-6 z-20 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm " + t.chipCvvBg}>
              CVV: {cvv || "---"}
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="text-sm text-red-500 font-semibold mb-1">⚠️ IMPORTANT: Demo only. Never use real card data.</div>
            <div className="text-xs text-slate-500">Design & Logic by Nadim Islam. All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
