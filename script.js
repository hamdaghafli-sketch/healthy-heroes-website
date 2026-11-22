/* Every Child, Every Table — no dependencies, no data sent to a server. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const menu = $('menu-toggle');
  const nav = $('primary-navigation');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    menu.textContent = open ? '☰' : '✕';
    nav.classList.toggle('open', !open);
  });
  document.querySelectorAll('.primary-navigation a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';
  }));
  window.addEventListener('scroll', () => {
    const root = document.documentElement;
    const max = Math.max(1, root.scrollHeight - root.clientHeight);
    $('reading-progress').style.width = `${Math.max(0,Math.min(100,100*window.scrollY/max))}%`;
  }, {passive:true});

  const senses = {
    texture:{emoji:'🧸', title:'Texture can be overwhelming.', why:'Crunchy, mushy, sticky, grainy and mixed textures can feel very different inside the mouth. A child may tolerate one texture and not another.',tip:'Keep a reliably accepted food available. Offer textures separately and invite exploration without requiring a taste.'},
    smell:{emoji:'🌸', title:'Smells can feel very strong.',why:'Cooking aromas, spices or nearby foods may be difficult for a child even if other people barely notice them.',tip:'Try ventilation, a seat farther from strong aromas, or serving a familiar food separately when possible.'},
    sound:{emoji:'🔔', title:'Mealtimes can be loud.',why:'Cutlery clinks, chewing sounds, conversation and crowded rooms may combine into sensory overload.',tip:'Offer a calmer seat, smaller group or short break. Ask the child what helps them feel comfortable.'},
    temp:{emoji:'🌡️',title:'Temperature changes can surprise.',why:'A food that feels safe at one temperature may feel uncomfortable when warmer, cooler or less predictable.',tip:'Ask which temperatures feel comfortable and allow food to cool or be served as preferred when safe.'},
    presentation:{emoji:'🍽️',title:'Presentation and predictability matter.',why:'Foods touching, a different brand or packaging, a changed plate, or a new routine may create uncertainty.',tip:'Explain changes ahead of time, consider divided plates, and keep familiar utensils or presentation where possible.'}
  };
  const senseButtons = Array.from(document.querySelectorAll('[data-sense]'));
  function activateSense(id, focus=false) {
    if (!senses[id]) return;
    const info = senses[id];
    $('sense-graphic').textContent=info.emoji;
    $('sense-title').textContent=info.title;
    $('sense-why').textContent=info.why;
    $('sense-tip').textContent=info.tip;
    $('sense-panel').setAttribute('aria-labelledby',`sense-tab-${id}`);
    senseButtons.forEach(button=>{
      const selected=button.dataset.sense===id;
      button.setAttribute('aria-selected',String(selected));
      button.tabIndex=selected?0:-1;
      if(focus && selected) button.focus();
    });
  }
  senseButtons.forEach((button,i)=>{
    button.addEventListener('click',()=>activateSense(button.dataset.sense));
    button.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();
      const next=e.key==='Home'?0:e.key==='End'?senseButtons.length-1:(i+(e.key==='ArrowRight'?1:-1)+senseButtons.length)%senseButtons.length;
      activateSense(senseButtons[next].dataset.sense,true);
    });
  });

  const choices=Array.from(document.querySelectorAll('.check-option input'));
  const name=$('child-name');const notes=$('plan-notes');const status=$('plan-status');
  function planDetails(){
    return {
      child:name.value.trim() || 'Our child',
      items:choices.filter(el=>el.checked).map(el=>el.value),
      notes:notes.value.trim()
    };
  }
  function textPlan(){
    const data=planDetails();
    return `EVERY CHILD, EVERY TABLE — FAMILY MEALTIME SUPPORT PLAN\n\nChild: ${data.child}\n\nSupports to try:\n${data.items.length?data.items.map(v=>'• '+v).join('\n'):'• No supports selected yet.'}\n\nFamily foods, comforts and notes:\n${data.notes||'Not added yet.'}\n\nPlan principle: Respect culture, listen to the child, avoid pressure, and ask professionals about medical or nutrition concerns.\n`;
  }
  function renderPlan(){
    const data=planDetails();
    const list=$('preview-list');
    list.replaceChildren();
    const entries=data.items.length?data.items:['Choose supports from the checklist to begin.'];
    entries.forEach(item=>{const li=document.createElement('li');li.textContent=item;list.appendChild(li);});
    $('preview-notes').textContent=(data.child==='Our child'?'For our child':`For ${data.child}`)+(data.notes?` • ${data.notes}`:'');
    try {localStorage.setItem('every-table-plan-v1',JSON.stringify({child:name.value,notes:notes.value,checked:choices.map(x=>x.checked)}));} catch (_){}
  }
  try {
    const saved=JSON.parse(localStorage.getItem('every-table-plan-v1')||'null');
    if(saved && typeof saved==='object'){
      if(typeof saved.child==='string')name.value=saved.child.slice(0,42);
      if(typeof saved.notes==='string')notes.value=saved.notes.slice(0,1400);
      if(Array.isArray(saved.checked) && saved.checked.length===choices.length) choices.forEach((input,i)=>input.checked=Boolean(saved.checked[i]));
    }
  } catch (_){}
  [...choices,name,notes].forEach(el=>el.addEventListener('input',renderPlan));
  renderPlan();
  $('copy-plan').addEventListener('click', async () => {
    const text = textPlan();
    try {await navigator.clipboard.writeText(text);status.textContent='Plan copied! You can paste it into an email or a document.';}
    catch (_){
      const box=document.createElement('textarea');box.value=text;box.style.position='fixed';box.style.opacity='0';document.body.appendChild(box);box.select();
      let worked=false;try{worked=document.execCommand('copy');}catch(_e){}
      box.remove();status.textContent=worked?'Plan copied!':'Copy not available here. Select the preview text or print the plan instead.';
    }
  });
  $('print-plan').addEventListener('click',()=>window.print());
})();
