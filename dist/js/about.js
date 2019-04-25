var about = {
    name :'yumeng',
    sayname:function(){
        return this.name
    }
}
let dom = document.createElement('span');
dom.innerText = 'append dom';
document.querySelector('body')
    .appendChild(dom);