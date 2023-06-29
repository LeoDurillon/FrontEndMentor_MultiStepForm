const getElm=(id)=>{
  return document.getElementById(id);
}

handleNext=()=>{
  if(app.index===2){
    app.el.next.classList.add('--is-off');
    app.el.confirm.classList.remove('--is-off');
  } 
  if (app.index === 0){
    app.el.prev.classList.remove('--is-off');
    app.el.buttonContainer.classList.remove('--end')
  }
  updateValue();
  PagePlusOne();
}
const handlePrev=()=>{
  if(app.index===3){
    app.el.next.classList.remove('--is-off');
    app.el.confirm.classList.add('--is-off');
  }
  if (app.index === 1){
    app.el.prev.classList.add('--is-off');
    app.el.buttonContainer.classList.add('--end')
  }
  PageMinusOne();
}

const PagePlusOne=()=>{
  app.el.forms[app.index].form.classList.add('--is-off');
  app.el.forms[app.index+1].form.classList.remove('--is-off');
  app.el.steps[app.index].step.classList.remove('--active')
  app.el.steps[app.index+1].step.classList.add('--active')
  app.index+=1;
}
const PageMinusOne=()=>{
  app.el.forms[app.index].form.classList.add('--is-off');
  app.el.forms[app.index-1].form.classList.remove('--is-off');
  app.el.steps[app.index].step.classList.remove('--active')
  app.el.steps[app.index-1].step.classList.add('--active')
  app.index-=1;
}

const handleSelect=(event)=>{
  const elm=event.currentTarget;
  const selected=document.querySelector('.--selected');
  const inputChecked=document.querySelector('[data-checked="true"]');
  inputChecked.checked=false;
  inputChecked.setAttribute('data-checked','false');
  selected.classList.remove('--selected');
  elm.classList.add('--selected');
  const elmInput=elm.querySelector('[data-checked="false"]');
  elmInput.checked=true;
  elmInput.setAttribute('data-checked','true');
}

const handleCheck=(e)=>{
  const elm=e.currentTarget;
  const input=elm.querySelector("input");
  input.checked=!input.checked
  if(input.checked){
    elm.classList.add('--selected');
  }else{
    elm.classList.remove('--selected');
  }
}


const changePrice=()=>{
  const {proPrice,advancedPrice,arcadePrice}=app.el.radioForm;
  const {storagePrice,profilePrice,onlinePrice}=app.el.checkboxForm;
  if(app.el.radioForm.time){
    proPrice.innerText="$150/yr"
    advancedPrice.innerText="$120/yr"
    arcadePrice.innerText="$90/yr"
    storagePrice.innerText="+$20/yr"
    profilePrice.innerText="+$20/yr"
    onlinePrice.innerText="+$10/yr"
  }else{
    proPrice.innerText="$15/mo"
    advancedPrice.innerText="$12/mo"
    arcadePrice.innerText="$9/mo"
    storagePrice.innerText="+$2/mo"
    profilePrice.innerText="+$2/mo"
    onlinePrice.innerText="+$1/mo"
  }
}

const handleSwitch=()=>{
  app.el.radioForm.month.classList.toggle('--is-blue');
  app.el.radioForm.year.classList.toggle('--is-blue');
  app.el.radioForm.time = !app.el.radioForm.time;
  changePrice();
}

const updateValue=()=>{
  switch (app.index){
    case 1:
      const selected=document.querySelector('[data-checked="true"]');
      app.el.resumeForm.subCol.textContent=selected.id.charAt(0).toUpperCase() + selected.id.slice(1); 
      app.el.resumeForm.subCol.textContent=`${app.el.resumeForm.subCol.textContent}${app.el.radioForm.time ? "(Yearly)":"(Monthly)"}`
      
      const price=document.querySelector(`#${selected.id}-value`);
      const tabPrice=price.textContent.split("$")[1]
      const numberPrice=parseInt(tabPrice.split("/")[0],10);
      app.totalPrice=app.totalPrice+numberPrice;
      app.el.resumeForm.subPrice.textContent=price.textContent;
      
      break;
    case 2:
      const checkbox=document.querySelectorAll('.Form-Section-FieldSet-Checkbox input[type="checkbox"]');
      app.el.resumeForm.tabBody.innerHTML="";
      checkbox.forEach((input)=>{
        if(input.checked){
          const des=document.getElementById(`${input.id}-des`)
          const price=document.getElementById(`${input.id}-value`);
          const tabPrice=price.textContent.split("$")[1]
          const numberPrice=parseInt(tabPrice.split("/")[0],10);
          app.totalPrice=app.totalPrice+numberPrice;
          AddElem(des,price);
        }
      })
      app.el.resumeForm.total.textContent=`Total${app.el.radioForm.time ? "(per year)":"(per month)"}`;
      app.el.resumeForm.totalPrice.textContent=`+$${app.totalPrice}/${app.el.radioForm.time ?"yr":"mo"}`;
      break;
  }
}
const AddElem=(elm,price)=>{
  const div=document.createElement('div')
  div.classList.add("Form-Section-Table-Row");
  const pDes=document.createElement('p');
  const pPrice=document.createElement('p');
  pDes.textContent=elm.textContent;
  pPrice.classList.add('body-price');
  pPrice.textContent=price.textContent;
  div.appendChild(pDes);
  div.appendChild(pPrice);
  app.el.resumeForm.tabBody.appendChild(div);
}

const handleChange=()=>{
  app.el.next.classList.remove('--is-off');
  app.el.confirm.classList.add('--is-off');
  app.el.forms[app.index].form.classList.add('--is-off');
  app.el.forms[1].form.classList.remove('--is-off');
  app.el.steps[app.index].step.classList.remove('--active')
  app.el.steps[1].step.classList.add('--active')
  app.index=1;
  
}

const handleSubmit=(e)=>{
  e.preventDefault();
  const form=e.currentTarget;
  const formData= new FormData(form);
  const formObj=Object.fromEntries(formData);
  console.log(formObj);
  formObj.yearly=app.el.radioForm.time;
  app.el.forms[app.index].form.classList.add('--is-off');
  app.el.forms[app.index+1].form.classList.remove('--is-off');
  app.el.buttonContainer.classList.add('--is-off');
}
const checkValid=(e)=>{
  const nameform=document.getElementById('name-form');
  const telform=document.getElementById('tel-form');
  const emailform=document.getElementById('email-form');
  const {tel,email,name}=app.el.infoForm;
  if(tel.validity.valid && email.validity.valid && name.validity.valid){
    app.el.next.disabled=false;
  }
  if(!tel.validity.valid && !!tel.value.length){
    tel.classList.add('--invalid');
    telform.querySelector('.error').classList.remove('--is-off');
  }else{
    tel.classList.remove('--invalid');
    telform.querySelector('.error').classList.add('--is-off');
  }
  if(!email.validity.valid && !!email.value.length){
    email.classList.add('--invalid');
    emailform.querySelector('.error').classList.remove('--is-off');
  }else{
    email.classList.remove('--invalid');
    emailform.querySelector('.error').classList.add('--is-off');
  }
  if(!name.validity.valid && !!name.value.length){
    name.classList.add('--invalid');
    nameform.querySelector('.error').classList.remove('--is-off')
  }else{
    name.classList.remove('--invalid');
    nameform.querySelector('.error').classList.add('--is-off')
  }
  
}

const app = {
  el:{
    forms:[
      {form:getElm('first-form')},
      {form:getElm('second-form')},
      {form:getElm('third-form')},
      {form:getElm('fourth-form')},
      {form:getElm('final-form')},
    ],
    steps:[
      {step:getElm('step-1')},
      {step:getElm('step-2')},
      {step:getElm('step-3')},
      {step:getElm('step-4')},
    ],
    radioForm:{
      arcade:getElm('arcade-container'),
      advanced:getElm('advanced-container'),
      pro:getElm('pro-container'),
      switch:getElm('time'),
      year:getElm('year'),
      month:getElm('month'),
      proPrice:getElm('pro-value'),
      advancedPrice:getElm('advanced-value'),
      arcadePrice:getElm('arcade-value'),
      time:false,
    },
    checkboxForm:{
      online:getElm('online-container'),
      storage:getElm('storage-container'),
      profile:getElm('profile-container'),
      onlinePrice:getElm('online-value'),
      storagePrice:getElm('storage-value'),
      profilePrice:getElm('profile-value'),
    },
    resumeForm:{
      subCol:getElm("sub-col"),
      subPrice:getElm("sub-price-col"),
      tabBody:getElm('tab-body'),
      total:getElm('total-par'),
      totalPrice:getElm('total-col')
    },
    infoForm:{
      name:getElm('name'),
      email:getElm('email'),
      tel:getElm('tel'),
    },
    next:getElm('next'),
    prev:getElm('prev'),
    confirm:getElm('confirm'),
    change:getElm('change'),
    buttonContainer:getElm('button-container'),
    formEl:getElm('form'),
  },

  totalPrice:0,
  index:0,

  main:()=>{
    app.el.next.disabled=true;
    app.el.infoForm.tel.addEventListener('change',checkValid);
    app.el.infoForm.email.addEventListener('change',checkValid);
    app.el.infoForm.name.addEventListener('change',checkValid);


    app.el.next.addEventListener('click',handleNext);
    app.el.prev.addEventListener('click',handlePrev);

    app.el.radioForm.advanced.addEventListener('click',(e)=>{handleSelect(e)})
    app.el.radioForm.pro.addEventListener('click',(e)=>{handleSelect(e)});
    app.el.radioForm.arcade.addEventListener('click',(e)=>{handleSelect(e)})
    app.el.radioForm.switch.addEventListener('click',handleSwitch)

    app.el.checkboxForm.online.addEventListener('click',(e)=>{handleCheck(e)});
    app.el.checkboxForm.storage.addEventListener('click',(e)=>{handleCheck(e)});
    app.el.checkboxForm.profile.addEventListener('click',(e)=>{handleCheck(e)});
    
    app.el.change.addEventListener('click',handleChange);

    app.el.formEl.addEventListener('submit',(e)=>{handleSubmit(e)});
  }
}

document.addEventListener("DOMContentLoaded",app.main())