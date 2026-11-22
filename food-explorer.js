/* Parent-facing cultural food explorer — examples, never medical diet advice. */
(() => {
  'use strict';
  const cuisines = [
    ['emirati', 'Emirati & Gulf'],
    ['levant', 'Levantine'],
    ['southasia', 'South Asian'],
    ['eastasia', 'East Asian'],
    ['eastafrica', 'East African'],
    ['westafrica', 'West African'],
    ['italian', 'Italian'],
    ['latin', 'Latin American']
  ];
  const foods = [
    {region:'emirati',name:'Harees',emoji:'🥣',origin:'Emirati wheat-and-meat dish',texture:'soft',description:'A thick, gently cooked wheat-and-meat dish with a soft, blended consistency.',tip:'If texture is an issue, ask whether the child prefers a smoother or more consistent portion; keep their familiar option nearby.'},
    {region:'emirati',name:'Machboos',emoji:'🍚',origin:'Emirati spiced rice dish',texture:'separate',description:'Fragrant rice with meat, fish, or vegetables; ingredients and spices vary by family.',tip:'Try offering rice and the accompanying ingredients separately so the child can choose what feels comfortable.'},
    {region:'emirati',name:'Khameer bread',emoji:'🫓',origin:'Emirati bread',texture:'chewy',description:'A soft bread often made with fragrant ingredients; sweetness and toppings vary.',tip:'Offer a familiar plain piece, with toppings or spreads on the side if the child prefers predictability.'},
    {region:'levant',name:'Hummus',emoji:'🥣',origin:'Levantine chickpea dip',texture:'smooth',description:'A creamy chickpea spread, usually with tahini and lemon; ingredients vary.',tip:'Serve dip and bread separately; some children prefer a smoother consistency or less garnish.'},
    {region:'levant',name:'Manakish',emoji:'🫓',origin:'Levantine flatbread',texture:'chewy',description:'Flatbread with toppings such as za’atar or cheese, depending on the recipe.',tip:'Start with the familiar bread shape or topping; keep strong-smelling toppings separate if desired.'},
    {region:'levant',name:'Falafel',emoji:'🧆',origin:'Levantine chickpea or fava-bean fritters',texture:'crisp',description:'Seasoned fried patties with a crisp exterior and softer center.',tip:'If the crisp outside or seasoning is a challenge, let the child explore the smell or appearance without pressure.'},
    {region:'southasia',name:'Idli',emoji:'🍥',origin:'South Indian steamed cakes',texture:'soft',description:'Steamed rice-and-lentil cakes with a soft, springy texture.',tip:'Offer idli plain and keep chutney or sambar separate; follow the child’s preference for temperature.'},
    {region:'southasia',name:'Dal',emoji:'🥘',origin:'South Asian lentil dish',texture:'smooth',description:'Cooked lentils with variable texture, seasonings and thickness.',tip:'Ask whether smoother or more distinct lentils feel better, and serve rice or bread separately if preferred.'},
    {region:'southasia',name:'Chapati',emoji:'🫓',origin:'South Asian flatbread',texture:'chewy',description:'Thin, soft wheat flatbread served with many kinds of family meals.',tip:'Offer manageable pieces with sauces on the side. Wheat is a common ingredient—check allergies.'},
    {region:'eastasia',name:'Onigiri',emoji:'🍙',origin:'Japanese rice snack',texture:'separate',description:'Shaped rice sometimes wrapped in seaweed or filled with other ingredients.',tip:'Show what is inside before serving; rice and fillings can be offered apart if preferred.'},
    {region:'eastasia',name:'Udon noodles',emoji:'🍜',origin:'Japanese wheat noodles',texture:'chewy',description:'Thick noodles commonly served in broth or with other toppings.',tip:'Offer noodles and broth separately if that helps. Prepare noodle lengths safely for the child’s age and skills.'},
    {region:'eastasia',name:'Steamed bao',emoji:'🥟',origin:'Chinese-style steamed bun',texture:'soft',description:'Soft steamed bread that can be plain or have a savory or sweet filling.',tip:'Explain or show the filling ahead of time; a familiar plain version may be easier to approach.'},
    {region:'eastafrica',name:'Injera',emoji:'🫓',origin:'Ethiopian and Eritrean flatbread',texture:'soft',description:'A spongy, lightly sour flatbread often shared with different stews.',tip:'Offer a small separate piece and keep stews apart if mixed textures or strong aromas are difficult.'},
    {region:'eastafrica',name:'Ugali',emoji:'🥣',origin:'East African maize dish',texture:'smooth',description:'A firm cooked maize staple whose thickness varies by preparation.',tip:'Allow familiar shapes or portions and keep the accompanying stew separate if preferred.'},
    {region:'eastafrica',name:'Shiro',emoji:'🍲',origin:'Ethiopian and Eritrean legume stew',texture:'smooth',description:'A smooth to thick stew made from ground legumes and seasonings.',tip:'Ask about spice aroma and thickness; offer injera separately if the child dislikes mixtures.'},
    {region:'westafrica',name:'Jollof rice',emoji:'🍚',origin:'West African rice dish',texture:'separate',description:'Rice cooked with tomato and spices, prepared in many different regional and family ways.',tip:'Keep rice and side dishes apart if preferred. Ask about spice strength and the smell of seasonings.'},
    {region:'westafrica',name:'Fufu',emoji:'🥣',origin:'West African pounded staple',texture:'smooth',description:'A smooth, dense staple made from cassava, plantain, yam, or other ingredients.',tip:'Respect the family’s preferred preparation, and check with a clinician if dense or sticky textures raise swallowing concerns.'},
    {region:'westafrica',name:'Ripe plantain',emoji:'🍌',origin:'Common in several West African meals',texture:'soft',description:'Plantain may be fried, baked or cooked in other ways; ripeness changes texture.',tip:'Some children may prefer a consistent soft piece rather than crisp edges; serve in an age-safe size.'},
    {region:'italian',name:'Pasta',emoji:'🍝',origin:'Italian pasta dishes',texture:'chewy',description:'Pasta shapes vary and may be served plain or with sauce, cheese, and vegetables.',tip:'Offer sauce on the side and let the child choose a familiar pasta shape, temperature and texture.'},
    {region:'italian',name:'Polenta',emoji:'🥣',origin:'Northern Italian maize dish',texture:'smooth',description:'A cornmeal dish that can be creamy, firm or cut into pieces.',tip:'If the child likes smooth foods, offer a familiar texture and keep toppings separate.'},
    {region:'italian',name:'Focaccia',emoji:'🍞',origin:'Italian bread',texture:'chewy',description:'Baked bread with a soft center and sometimes a crisp crust or fragrant herbs.',tip:'Offer plain sections if the crust, herbs or strong aroma are difficult.'},
    {region:'latin',name:'Arepa',emoji:'🫓',origin:'Colombian and Venezuelan maize bread',texture:'soft',description:'Corn cakes with textures that vary by region, filling and method of cooking.',tip:'Offer the arepa and fillings separately, or choose a family-familiar plain version.'},
    {region:'latin',name:'Quesadilla',emoji:'🧀',origin:'Mexican tortilla dish',texture:'chewy',description:'A tortilla often folded with cheese and other fillings, cooked until warm.',tip:'Offer tortilla and fillings separately if the child dislikes surprises or melted textures. Check dairy and wheat/corn ingredients.'},
    {region:'latin',name:'Rice and beans',emoji:'🍚',origin:'Common across many Latin American food traditions',texture:'separate',description:'Rice and beans are prepared in many ways across different countries and families.',tip:'Serve rice and beans separately if mixed textures are difficult, or follow the child’s familiar family recipe.'}
  ];

  const search = document.getElementById('food-search');
  const region = document.getElementById('food-region');
  const texture = document.getElementById('food-texture');
  const grid = document.getElementById('food-grid');
  const count = document.getElementById('food-count');
  const empty = document.getElementById('food-empty');
  const status = document.getElementById('food-status');
  if(!search || !region || !texture || !grid || !count) return;
  const htmlSafe = (v) => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const regionNames = Object.fromEntries(cuisines);
  const textureNames = {soft:'Soft',smooth:'Smooth / creamy',separate:'Separate pieces',chewy:'Chewy',crisp:'Crisp / crunchy'};
  cuisines.forEach(([id,name])=>{const option=document.createElement('option');option.value=id;option.textContent=name;region.appendChild(option);});

  function draw(){
    const q=search.value.trim().toLocaleLowerCase();
    const filtered=foods.filter(food=>(region.value==='all'||food.region===region.value) && (texture.value==='all'||food.texture===texture.value) && (!q||[food.name, food.origin, food.description, regionNames[food.region]].join(' ').toLocaleLowerCase().includes(q)));
    grid.innerHTML=filtered.map(food=>`<article class="food-item">
      <div class="food-card-top"><div class="food-icon" aria-hidden="true">${food.emoji}</div><span class="food-region-tag">${htmlSafe(regionNames[food.region])}</span></div>
      <h4>${htmlSafe(food.name)}</h4><span class="food-subtitle">${htmlSafe(food.origin)}</span><p class="food-description">${htmlSafe(food.description)}</p>
      <span class="food-chip">${textureNames[food.texture]} · typical texture</span>
      <div class="food-sensory"><span>A gentle serving idea</span><p>${htmlSafe(food.tip)}</p></div>
      <button class="food-save" type="button" data-save-food="${htmlSafe(food.name)}" aria-label="Add idea for ${htmlSafe(food.name)} to the family plan">+ Add idea to family plan</button>
    </article>`).join('');
    count.textContent=`Showing ${filtered.length} of ${foods.length} food ideas across ${cuisines.length} traditions`;
    empty.hidden=filtered.length!==0;
  }
  [search,region,texture].forEach(el=>el.addEventListener('input',draw));
  document.getElementById('food-clear').addEventListener('click',()=>{search.value='';region.value='all';texture.value='all';draw();status.textContent='All food ideas are visible again.';search.focus();});
  grid.addEventListener('click',e=>{
    const button=e.target.closest('[data-save-food]');
    if(!button) return;
    const food=foods.find(f=>f.name===button.dataset.saveFood);
    const notes=document.getElementById('plan-notes');
    if(!food || !notes) return;
    const line=`${food.name} (${regionNames[food.region]}): ${food.tip}`;
    if(notes.value.includes(line)){
      status.textContent=`${food.name} is already in your family plan. `;
      return;
    }
    const updated=[notes.value.trim(),line].filter(Boolean).join('\n');
    if(updated.length>notes.maxLength){status.textContent='Your family-plan notes are full. You can edit them in the support-plan section.';return;}
    notes.value=updated;
    notes.dispatchEvent(new Event('input',{bubbles:true}));
    status.textContent=`Added ${food.name} to your family plan. Open “Make a plan” to review or print it.`;
    button.textContent='✓ Added to your plan';
  });
  draw();
})();
