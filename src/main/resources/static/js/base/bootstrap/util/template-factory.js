import{DefaultAllowlist,sanitizeHtml}from"./sanitizer";import{getElement,isElement}from"./index";import SelectorEngine from"../dom/selector-engine";import Config from"./config";const NAME="TemplateFactory",Default={allowList:DefaultAllowlist,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},DefaultType={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},DefaultContentType={entry:"(string|element|function|null)",selector:"(string|element)"};class TemplateFactory extends Config{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}getContent(){return Object.values(this._config.content).map((t=>this._resolvePossibleFunction(t))).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[e,n]of Object.entries(this._config.content))this._setContent(t,n,e);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},DefaultContentType)}_setContent(t,e,n){const i=SelectorEngine.findOne(n,t);i&&((e=this._resolvePossibleFunction(e))?isElement(e)?this._putElementInTemplate(getElement(e),i):this._config.html?i.innerHTML=this._maybeSanitize(e):i.textContent=e:i.remove())}_maybeSanitize(t){return this._config.sanitize?sanitizeHtml(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return"function"==typeof t?t(this):t}_putElementInTemplate(t,e){if(this._config.html)return e.innerHTML="",void e.append(t);e.textContent=t.textContent}}export default TemplateFactory;