const pup = require('puppeteer');
// actual url: https://docs.google.com/forms/d/e/1FAIpQLSeG8Mv7wTxOtvabP26Pa3gggzz3RAo3gJ-TLJ9_YpeCdPN0eA/viewform
async function main(){
    const browser = await pup.launch({headless: false});
    const newPage = await browser.newPage();
    await newPage.goto("https://docs.google.com/forms/d/e/1FAIpQLSeYVYxQn8cSw8UU8jkzq0IxT805rZ3w0NQs8-ryaf78aeYodg/viewform");
    await newPage.waitForTimeout(1000);
    newPage.evaluate(()=>
        {
            let answer = ["listar@me.com", "97894964","LISTAR NGUYEN","11027790","PHAM DUC TUAN","12009760","NGUYEN TUAN PHONG","GUEST","BUI NGOC THACH ANH","013119", ];
            let inputs = document.querySelectorAll("form > div > div > input");
            // setClass 
            let position = 0;
            document.querySelectorAll('input.quantumWizTextinputPaperinputInput').forEach(input=>{
                input['value']=answer[position]
                position++;
            });
            document.querySelectorAll('div.quantumWizTextinputPaperinputEl').forEach((el)=>el.classList.add('hasValue'));
            position = 0;
            inputs.forEach(input=>{
                console.log(input.getAttribute('name'));
                if(input.getAttribute('name').includes('entry')){
                input['value'] = answer[position];
                    position++;
                }
            });
            let options = document.querySelectorAll("div.freebirdFormviewerComponentsQuestionRadioChoicesContainer");
            options[0].children[1].children[0].click();
            options[1].children[2].children[0].click();
        }
    );
}
main();
